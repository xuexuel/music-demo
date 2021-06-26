const koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
const Router = require("koa-router");
const bodyParser = require("koa-bodyParser");
const musicData = require("./data/music.json");
const usersData = require("./data/users.json");
const md5 = require("md5");
const app = new koa();
const router = new Router();
app.use(views(__dirname + '/views'), {
  map: {
    html: "pug"
  }
})
app.use(static(__dirname + "/static"));
app.use(bodyParser());


router.get("/login", async (ctx, next) => {
  let cookieInfo = ctx.cookies.get("isLogin");
  if (cookieInfo) {
    let serverInfo = md5("张三" + "123");;
    // if (serverInfo === cookieInfo) {
    //   ctx.redirect("/list");
    // }
  }
  await ctx.render("login.pug");
})


router.get("/checkUserName", async (ctx, next) => {
  console.log(ctx.query.username);
  let res = usersData.find(v => v.username === ctx.query.username);
  if (res) {
    ctx.body = {
      status: 1,
      info: "用户名正确"
    }
  } else {
    ctx.body = {
      status: 22,
      info: "用户名错误"
    }
  }
})

router.post("/checkUser", async (ctx, next) => {
  let res = ctx.request.body;
  if (res.username == "张三" && res.pwd == "123") {
    if (res.memberMe) {
      let loginStatus = md5("张三" + "123");
      ctx.cookies.set("isLogin", loginStatus, {
        maxAge: 3600 * 1000 * 24 * 7
      })
    }

    ctx.redirect("/list")
  } else {
    ctx.redirect("/error")
  }
})

router.get("/list", async (ctx, next) => {
  await ctx.render("list.pug", {
    musicData
  });
})

router.get("/error", async (ctx, next) => {
  await ctx.render("error.pug");
})

router.get("/detail", async (ctx, next) => {
  await ctx.render("detail.pug");
})

app.use(router.routes());
app.listen(3000);