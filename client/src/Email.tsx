import React from "react";
import glamorous from "glamorous";

import {View} from "./core";

const SIZE = 350;

const PDFPreview = glamorous.iframe({
    display: "flex",
    boxSizing: "border-box",
    flex: 1,
});

const Sidebar = glamorous(View)({
    width: SIZE,
    alignItems: "center",
    padding: 5,
});

const Container = glamorous(View)({
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
});

interface IEmail {
    id: string;
    email: string;
    payee: string;
    name: string;
}

const renderMessage = (props: IEmail) =>
    `
Hei!

Kiitos tilauksesta ${props.payee}!

Tässä on liiteenä laskuvarjohyppylahjakortti henkilölle ${props.name}.

Terveisin,
Jyväskylän Laskuvarjokerho Ry

`.trim();

class Email extends React.Component<IEmail, {}> {
    form: HTMLFormElement | null;

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.form) {
            this.form.submit();
            Array.prototype.map.call(
                this.form.elements,
                (el: HTMLInputElement) => {
                    el.value;
                },
            );
        }
    };

    render() {
        const url = `/assets/pdf/${this.props.id}.pdf`;
        return (
            <Container>
                <Sidebar>
                    <br />
                    <br />
                    <a href={url} download>
                        Lataa
                    </a>
                    <br />
                    <br />

                    <form
                        action="/email"
                        method="post"
                        ref={ref => (this.form = ref)}
                        onSubmit={this.handleSubmit}
                    >
                        <input type="hidden" name="id" value={this.props.id} />

                        <label>
                            Vastaanottaja
                            <br />
                            <input
                                required
                                type="email"
                                name="email"
                                defaultValue={this.props.email}
                            />
                        </label>

                        <br />

                        <label>
                            Aihe
                            <br />
                            <input
                                required
                                type="text"
                                name="subject"
                                defaultValue="Laskuvarjohyppylahjakorttisi"
                            />
                        </label>

                        <br />
                        <br />

                        <label>
                            Viesti
                            <textarea
                                style={{width: "100%"}}
                                required
                                name="message"
                                rows={20}
                                defaultValue={renderMessage(this.props)}
                            />
                        </label>
                        <input type="submit" value="Lähetä" />
                    </form>
                </Sidebar>
                <PDFPreview frameBorder={0} src={url} />
            </Container>
        );
    }
}

export default Email;
