//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";
import { __dirname } from "./config.js";
import { testChatRouter } from "./routes/test-chat.router.js";
import { usersRouter } from "./routes/users.router.js";

const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
  console.log(`App runing on ${__dirname} - server http://localhost:${PORT}`);
});
connectSocketServer(httpServer);

/* app.use("/api/products", productsRouter);
app.use("/api/pets", petsRouter);

app.use("/test-plantilla-products", testPlantillaProducts);
 */

app.use("/api/users", usersRouter);

app.use("/test-chat", testChatRouter);

app.get("*", (_, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "no se encuentra esa ruta", payload: {} });
});
