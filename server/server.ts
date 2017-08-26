import * as Koa from "koa";
import * as Router from "koa-router";
import * as serve from "koa-static";
import * as mount from "koa-mount";

import * as fs from "fs";

var app = new Koa();
var router = new Router();

const serveIndex = async (ctx: Router.IRouterContext) => {
    const s = fs.createReadStream(__dirname + "/../public/index.html");
    ctx.type = "text/html";
    ctx.body = s;
};

router.get("/tandem", serveIndex);
app.use(router.routes()).use(router.allowedMethods());
app.use(mount("/assets", serve(__dirname + "/../public")));

app.listen(8080, () => {
    console.log("listening");
});
