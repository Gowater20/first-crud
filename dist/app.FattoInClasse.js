"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.json({ message: "Server is online" });
});
