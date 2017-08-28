"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const mount = require("koa-mount");
const body = require("koa-bodyparser");
const session = require("koa-session");
const fsp = require("mz/fs");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs");
const qs = require("querystring");
const crypt = require("crypto");
const config_1 = require("./config");
const genKey = () => Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2);
const PORT = config_1.default.port;
const INTERNAL_ADDRESS = `http://localhost:${PORT}`;
const PUBLIC = __dirname + "/../../public";
const INTERNAL_AUTH_KEY = genKey();
console.log("INTERNAL_AUTH_KEY &auth=" + INTERNAL_AUTH_KEY);
console.log(fs.realpathSync(PUBLIC));
process.exit();
var app = new Koa();
app.keys = [genKey()];
var router = new Router();
const transport = nodemailer.createTransport(config_1.default.nodemailer);
const serveIndex = async (ctx) => {
    const s = fs.createReadStream(PUBLIC + "/index.html");
    ctx.type = "text/html";
    ctx.body = s;
};
const fileExists = async (path) => {
    let stat = null;
    try {
        stat = await fsp.stat(path);
    }
    catch (err) {
        if (err.code == "ENOENT") {
            return false;
        }
    }
    if (stat) {
        return stat.isFile;
    }
    return false;
};
const getPDFPath = (id, full = true) => {
    const pdfPath = `/pdf/${id}.pdf`;
    if (full) {
        return PUBLIC + pdfPath;
    }
    return pdfPath;
};
router.get("/preview", serveIndex);
router.get("/email", serveIndex);
router.post("/preview", async (ctx) => {
    const options = ctx.query;
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
    const url = INTERNAL_ADDRESS +
        ctx.req.url +
        "&" +
        qs.stringify({ pdf: 1, auth: INTERNAL_AUTH_KEY });
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
    await page.goto(url, { waitUntil: "networkidle" });
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
router.post("/email", async (ctx) => {
    const options = ctx.request.body;
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
        bcc: "tandem@skydivejkl.fi",
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
    await fsp.writeFile(pdfPath.replace(/\.pdf$/, ".json"), JSON.stringify(Object.assign({}, email, { sentTimestamp: new Date().toString() }), null, "    "));
    ctx.body = "Lähetetty.";
    ctx.body += "\n";
    ctx.body += "\n";
    ctx.body += JSON.stringify(email, null, "    ");
});
app.use(session(app));
app.use(body());
app.use((ctx, next) => {
    if (process.env.DISABLE_AUTH) {
        return next();
    }
    const login = (query) => {
        ctx.session.auth = true;
        ctx.redirect(ctx.path + "?" + qs.stringify(query));
    };
    const deny = (msg) => {
        ctx.status = 403;
        ctx.body = "Bad auth: " + msg;
    };
    if (ctx.query.hmac && ctx.query.time) {
        const _a = ctx.query, { hmac, time } = _a, otherQuery = __rest(_a, ["hmac", "time"]);
        const mac = crypt.createHmac("sha256", config_1.default.authKey);
        mac.update(time);
        if (hmac !== mac.digest("hex")) {
            return deny("bad hmac");
        }
        const ageSec = Date.now() / 1000 - parseInt(time, 10);
        if (ageSec > 60 * 10) {
            return deny("too old link");
        }
        return login(otherQuery);
    }
    if (ctx.query.auth) {
        const _b = ctx.query, { auth } = _b, otherQuery = __rest(_b, ["auth"]);
        if (auth === INTERNAL_AUTH_KEY) {
            return login(otherQuery);
        }
        else {
            return deny("bad internal auth key");
        }
    }
    if (ctx.session.auth) {
        return next();
    }
    deny("No auth");
});
app.use(router.routes()).use(router.allowedMethods());
app.use(mount("/assets", serve(PUBLIC)));
app.listen(PORT, () => {
    console.log("Listening", PORT);
});
(async () => {
    const success = await transport.verify();
    if (success) {
        console.log("Mail connection ok");
    }
    else {
        throw new Error("Failed to connect smtp server");
    }
})().catch(error => {
    setTimeout(() => {
        throw error;
    }, 1);
});
//# sourceMappingURL=server.js.map