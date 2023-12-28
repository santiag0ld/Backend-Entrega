const express = require("express");
const { createServer } = require("http");
const serverIo = require("./routes/serverIO.js");
const { connectDB } = require("./config/config.js");
const expressHandlebars = require("express-handlebars");
const { viewsRouter } = require("./routes/views.router.js");
const { cartsRouter } = require("./routes/carts.router.js");
const { productsRouter } = require("./routes/products.router.js");

const port = 8080;
const app = express();
const server = createServer(app);
serverIo(server);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  expressHandlebars({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/products/", productsRouter);

server.listen(port, () => {
  console.log(`Escuchando en puerto ${port}`);
});
