"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
exports.router.get("/", user_controller_1.getUsers);
exports.router.get("/:id", user_controller_1.getUserById);
exports.router.post("/", user_controller_1.addUserHandler);
exports.router.delete("/:id", user_controller_1.deleteUserHandler);
exports.router.patch("/:id", user_controller_1.updateUserHandler);
/* normal version
import { Router } from "express"; // importo router dal framework express

export const router = Router(); // function expression di router

import { User } from "../models/user.model"; // importo il tipo User
import { users } from "../data/users"; // importo l'array di utenti

router.get("/", (req, res) => res.json(users));

// visualizza l'utente con l'id corrispondente
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id); // rappresenta il valore del parametro id digitato nell'URL
    const user = users.find(element => element.id === id) // cerca l'id dell'url corrisponde ad uno degli utenti
    res.json(user); // ritorna l'utende matchato
})

// aggiunge in coda un nuovo utente
router.post("/", (req, res) => {
    const newUser: User = req.body; // assegna tutto il contenuto di body in newUser
    const newID = users.reduce((max, element) => Math.max(max, element.id),0) + 1; // trova l'ultimo elemento più uno
    //perchè spread operator? forse perchè l'array originale non viene modificato?
    users.push({...newUser, id: newID}); // inserisce il nuovo utente nell'ultima posizione dell'array di oggetti
    res.json(...users); // mostra il nuovo utente inserito
});

// elimina un utente selezionato tramite id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id); // assegna id al valore digitato nell'url
    const index = users.findIndex(element => element.id === id); // trova l'indice dell'array in cui è contenuto l'id (scritto nell'url)
    if(index !== -1){
        users.splice(index, 1); // cancella solo un elemento ovvero quello corrispondente all'indice
        res.json({message: "User deleted correctly"})
    } else {
        res.status(404).json({message: "User not found mbare"})
    }
});

// aggiorna i dati di un utente o inserisce nuove chiavi/valore
router.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id); // id sarà l'utente con quell'id inserito nell'url
    const user = users.find(element => element.id === id); // cerca l'utente che ha quell'ID
    if(user){
        // Object.assign() è una funzione che aggiorna (se presenti) o aggiunge degli elementi
        Object.assign(user, req.body); // Applica un aggiornamento parziale agli elementi o aggiunge nuove elementi
        res.status(200).json(user);
    } else {
        res.status(404).json({message: "User not found mbare"})
    }
});
*/ 
