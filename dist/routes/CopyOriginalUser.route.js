"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express"); // importo router dal framework express
exports.router = (0, express_1.Router)(); // function expression di router
const users_1 = require("../data/users"); // importo l'array di utenti
exports.router.get("/", (req, res) => res.json(users_1.users));
// visualizza l'utente con l'id corrispondente
exports.router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id); // rappresenta il valore del parametro id digitato nell'URL
    const user = users_1.users.find(element => element.id === id); // cerca l'id dell'url corrisponde ad uno degli utenti
    res.json(user); // ritorna l'utende matchato
});
// aggiunge in coda un nuovo utente 
exports.router.post("/", (req, res) => {
    const newUser = req.body; // assegna tutto il contenuto di body in newUser
    const newID = users_1.users.reduce((max, element) => Math.max(max, element.id), 0) + 1; // trova l'ultimo elemento più uno
    //perchè spread operator? forse perchè l'array originale non viene modificato?
    users_1.users.push(Object.assign(Object.assign({}, newUser), { id: newID })); // inserisce il nuovo utente nell'ultima posizione dell'array di oggetti
    res.json(...users_1.users); // mostra il nuovo utente inserito
});
// elimina un utente selezionato tramite id
exports.router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id); // assegna id al valore digitato nell'url
    const index = users_1.users.findIndex(element => element.id === id); // trova l'indice dell'array in cui è contenuto l'id (scritto nell'url)
    if (index !== -1) {
        users_1.users.splice(index, 1); // cancella solo un elemento ovvero quello corrispondente all'indice
        res.json({ message: "User deleted correctly" });
    }
    else {
        res.status(404).json({ message: "User not found mbare" });
    }
});
// aggiorna i dati di un utente o inserisce nuove chiavi/valore
exports.router.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id); // id sarà l'utente con quell'id inserito nell'url
    const user = users_1.users.find(element => element.id === id); // cerca l'utente che ha quell'ID
    if (user) {
        // Object.assign() è una funzione che aggiorna (se presenti) o aggiunge degli elementi
        Object.assign(user, req.body); // Applica un aggiornamento parziale agli elementi o aggiunge nuove elementi
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "User not found mbare" });
    }
});
