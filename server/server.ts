import * as Koa from "koa";
import * as Router from "koa-router";
import * as serve from "koa-static";
import * as mount from "koa-mount";
import * as body from "koa-bodyparser";
import * as fsp from "mz/fs";
import * as nodemailer from "nodemailer";
import * as puppeteer from "puppeteer";
import * as fs from "fs";

import config from "./config";

const PORT = config.port;
const INTERNAL_ADDRESS = `http://localhost:${PORT}`;
const PUBLIC = __dirname + "/../public";

var app = new Koa();
var router = new Router();

const transport = nodemailer.createTransport(config.nodemailer);

const serveIndex = async (ctx: Router.IRouterContext) => {
    const s = fs.createReadStream(PUBLIC + "/index.html");
    ctx.type = "text/html";
    ctx.body = s;
};

const fileExists = async (path: string) => {
    let stat = null;

    try {
        stat = await fsp.stat(path);
    } catch (err) {
        if (err.code == "ENOENT") {
            return false;
        }
    }

    if (stat) {
        return stat.isFile;
    }

    return false;
};

const getPDFPath = (id: string, full = true) => {
    const pdfPath = `/pdf/${id}.pdf`;

    if (full) {
        return PUBLIC + pdfPath;
    }

    return pdfPath;
};

router.get("/tandem", serveIndex);
router.get("/email", serveIndex);

router.post("/tandem", async ctx => {
    const options: {id?: string; name?: string} = ctx.query;
    const force = Boolean(ctx.request.body.force);

    if (!options.id) {
        throw new Error("id missing");
    }

    if (!/^[0-9]+$/.test(options.id)) {
        throw new Error("Invalid id");
    }

    if (!options.name) {
        throw new Error("name missing");
    }

    const url = INTERNAL_ADDRESS + ctx.req.url + "&pdf=1";
    const pdfFSPath = getPDFPath(options.id, true);

    if (!force && (await fileExists(pdfFSPath))) {
        ctx.body = {
            exists: true,
        };
        return;
    }

    console.log("Opening " + url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle"});
    await page.pdf({
        path: pdfFSPath,
        format: "A4",
        printBackground: true,
    });
    browser.close();

    ctx.body = {
        ok: true,
    };
});

router.post("/email", async ctx => {
    const options: {
        id?: string;
        email?: string;
        message?: string;
        subject?: string;
    } =
        ctx.request.body;

    if (!options.id) {
        throw new Error("id missing");
    }

    if (!options.message) {
        throw new Error("message missing");
    }

    if (!options.subject) {
        throw new Error("subject missing");
    }

    const pdfPath = getPDFPath(options.id, true);

    const email = {
        from: "tandem@skydivejkl.fi",
        to: options.email,
        subject: options.subject,
        text: options.message,
        attachments: [
            {
                filename: `lahjakortti-${options.id}.pdf`,
                path: pdfPath,
                contentType: "application/pdf",
                content: "",
            },
        ],
    };

    await transport.sendMail(email);

    await fsp.writeFile(
        pdfPath.replace(/\.pdf$/, ".json"),
        JSON.stringify(
            {...email, sentTimestamp: new Date().toString()},
            null,
            "    ",
        ),
    );

    ctx.body = "Lähetetty.";
    ctx.body += "\n";
    ctx.body += "\n";
    ctx.body += JSON.stringify(email, null, "    ");
});

app.use(body());
app.use(router.routes()).use(router.allowedMethods());
app.use(mount("/assets", serve(PUBLIC)));

app.listen(PORT, () => {
    console.log("Listening", PORT);
});

(async () => {
    const success = await transport.verify();
    if (success) {
        console.log("Mail connection ok");
    } else {
        throw new Error("Failed to connect smtp server");
    }
})().catch(error => {
    setTimeout(() => {
        throw error;
    }, 1);
});
