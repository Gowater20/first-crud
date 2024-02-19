"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./data/users");
const app = (0, express_1.default)();
const PORT = 2600;
app.use(express_1.default.json()); //middleware necessario per interpretare il body della richiesta postman
//è utilizzato per definire come gestire una specifica richiesta HTTP a una determinata route
app.get("/", (req, res) => {
    res.status(200).json("server attivo mbare");
});
// mostra tutti gli utenti
app.get("/users/", (req, res) => {
    res.status(200).json(users_1.users);
});
// mostra l'utente desiderato
app.get('/users/:id', (req, res) => {
    const user = users_1.users.find(user => user.id === +req.params.id);
    user ?
        res.status(200).json(user) :
        res.status(400).json(`the id: is ${user}`);
});
// cancella un utente 
app.delete("/users/:id", (req, res) => {
    const index = users_1.users.findIndex(user => user.id === +req.params.id);
    if (index !== -1) {
        users_1.users.splice(index, 1);
        //res.json(users[index]);
        res.status(200).json({ message: `Utente con id: ${index + 1} eliminato con successo` });
    }
    else {
        res.status(404).json("Utene non trovato quindi non è stato possibile eliminarlo");
    }
});
// aggiungi l'ultimo id
/*app.post("/", (req, res) => {
    const user: User = req.body;
    const newId = users.reduce((max, element) => Math.max(max, element.id), 0) +1;
    users.push({...user, id: newId });
    res.json({...user, id: newId})
})*/
//generatore dell'ultimo id
function generateNewUserId() {
    // cercare l'ultimo id
    // restituirlo
    return users_1.users.reduce((max, element) => {
        return Math.max(element.id, max) + 1;
    }, 0).toString();
}
// aggiungo nuovo untente come ultimo id
app.post("/users", (req, res) => {
    const insertedUser = req.body;
    if (insertedUser) {
        users_1.users.push(Object.assign(Object.assign({}, insertedUser), { id: +generateNewUserId() }));
        res.status(201).json(insertedUser);
    }
    else {
        res.status(400);
    }
});
// metto in ascolto express sulla porta
app.listen(PORT, () => {
    console.log(`server ON sulla porta ${PORT}`);
});
