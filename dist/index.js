"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// versione abbreviata
//import { router as UserApi } from "./routes/user.route";
const user_route_1 = require("./routes/user.route");
const UserApi = user_route_1.router;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 2700;
app.get("/", (req, res) => {
    res.json({ message: "server is running!" });
});
app.use("/users", UserApi);
app.listen(PORT, () => console.log(`Server in activated on port: ${PORT}. Vai mbare`));
// POST non funziona correttamente --> sistemato
//fai una PUT 
//ripassa le funzioni e i vari passaggi --> OK
//crea la short version --> OK
