import * as Koa from "koa";
import * as Router from "koa-router";
import * as serve from "koa-static";
import * as mount from "koa-mount";
import * as body from "koa-bodyparser";
import * as fsp from "mz/fs";

import * as fs from "fs";

import * as puppeteer from "puppeteer";

const PORT = 8080;
const INTERNAL_ADDRESS = `http://localhost:${PORT}`;
const PUBLIC = __dirname + "/../public";

var app = new Koa();
var router = new Router();

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
    const pdfPath = `/pdf/${options.id}.pdf`;
    const pdfFSPath = PUBLIC + pdfPath;

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

app.use(body());
app.use(router.routes()).use(router.allowedMethods());
app.use(mount("/assets", serve(PUBLIC)));

app.listen(PORT, () => {
    console.log("Listening", 8080);
});
