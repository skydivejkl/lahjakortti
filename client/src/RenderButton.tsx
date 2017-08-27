import React from "react";
import qs from "qs";
import glamorous from "glamorous";
import axios, {AxiosResponse} from "axios";
import {Redirect} from "react-router-dom";

const Button = glamorous.button({
    padding: 20,
    margin: 40,
    width: 150,
    alignSelf: "center",
});

const initialState = {
    sending: false,
    error: false,
    data: {ok: false, exists: false},
};

type MaybeObject = null | {
    [key: string]: MaybeObject;
};

function getMaybe<T>(err: any, getter: (err: MaybeObject) => any): T | null {
    const val = getter(err);
    if (val) {
        return val as T;
    }

    return null;
}

class RenderButton extends React.Component<{}, typeof initialState> {
    constructor(props: {}) {
        super(props);
        this.state = initialState;
    }

    handleClick = async () => {
        await this.createPDF();

        if (this.state.data.exists) {
            if (confirm("PDF on jo olemassa, luodaanko uusi?")) {
                await this.createPDF(true);
            } else {
                this.setState({data: {ok: true, exists: true}});
            }
        }
    };

    createPDF = async (force = false) => {
        this.setState({sending: true, error: false});
        let res = null;

        try {
            res = await axios.post(window.location.toString(), {force});
        } catch (err) {
            this.setState({error: true});
            let aErr = getMaybe<AxiosResponse>(err, err => err && err.response);

            if (aErr) {
                console.log("err", aErr.data);
            }
        } finally {
            this.setState({sending: false});
        }

        if (res) {
            console.log("res", res.data);
            this.setState({data: res.data});
        }
    };

    render() {
        let msg = "Tee pdf";

        if (this.state.error) {
            msg = "Virhe :(";
        }

        if (this.state.sending) {
            msg = "Puuhaillaan...";
            if (this.state.data.exists) {
                msg = "Ylikirjoitetaan...";
            }
        }

        if (this.state.data.ok) {
            return <Redirect push to={"/email" + window.location.search} />;
        }

        return (
            <Button onClick={this.handleClick}>
                {msg}
            </Button>
        );
    }
}

export default RenderButton;
