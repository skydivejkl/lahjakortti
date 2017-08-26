import * as Koa from "koa";
import * as Router from "koa-router";
import * as serve from "koa-static";
import * as mount from "koa-mount";

import * as fs from "fs";

import * as puppeteer from "puppeteer";

const PORT = 8080;
const INTERNAL_ADDRESS = `http://localhost:${PORT}`;
const PUBLIC = __dirname + "/../public";

var app = new Koa();
var router = new Router();

function makeKey() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const serveIndex = async (ctx: Router.IRouterContext) => {
    const s = fs.createReadStream(PUBLIC + "/index.html");
    ctx.type = "text/html";
    ctx.body = s;
};

router.get("/tandem", serveIndex);
router.get("/email", serveIndex);

router.post("/tandem", async ctx => {
    const options: {id?: string; name?: string} = ctx.query;

    if (!options.id) {
        throw new Error("id missing");
    }

    if (!/^[0-9]+$/.test(options.id)) {
        throw new Error("Invalid id");
    }

    if (!options.name) {
        throw new Error("name missing");
    }

    const secret = makeKey();
    const url = INTERNAL_ADDRESS + ctx.req.url + "&pdf=1";
    const pdfPath = `/pdf/${options.id}-${secret}.pdf`;
    console.log("Opening " + url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle"});
    await page.pdf({
        path: PUBLIC + pdfPath,
        format: "A4",
        printBackground: true,
    });
    browser.close();
    ctx.body = {
        secret,
        id: options.id,
    };
});

app.use(router.routes()).use(router.allowedMethods());
app.use(mount("/assets", serve(PUBLIC)));

app.listen(PORT, () => {
    console.log("Listening", 8080);
});
