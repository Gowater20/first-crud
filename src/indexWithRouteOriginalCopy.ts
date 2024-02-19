import express from "express";
import { User } from "./models/user.model";
import { users } from "./data/users";

// versione abbreviata
//import { router as UserApi } from "./routes/user.route";

import {router} from './routes/user.route';
const UserApi = router;

const app = express();
app.use(express.json());

const PORT = 2700;

app.get("/", (req, res) => {
    res.json({message: "server is running!"})
});

app.use("/users", UserApi);

app.listen(PORT, () => console.log(`Server in activated on port: ${PORT}. Vai mbare`));


// POST non funziona correttamente;
//fai una PUT 
//ripassa le funzioni e i vari passaggi
//crea la short version