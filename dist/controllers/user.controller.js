"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.deleteUserHandler = exports.updateUserHandler = exports.addUserHandler = exports.getUserById = void 0;
const users_1 = require("../data/users");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const user = users_1.users.find(element => element.id === id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getUserById = getUserById;
const addUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const newID = users_1.users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
        users_1.users.push(Object.assign(Object.assign({}, user), { id: newID }));
        res.status(200).json(Object.assign(Object.assign({}, user), { id: newID }));
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addUserHandler = addUserHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const user = users_1.users.find(element => element.id === id);
        if (user) {
            Object.assign(user, req.body);
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const index = users_1.users.findIndex(element => element.id === id);
        if (index !== -1) {
            users_1.users.splice(index, 1);
            res.status(200).json({ message: "User cancelled on database" });
        }
        else {
            res.status(404).json({ message: "User not found mbare" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteUserHandler = deleteUserHandler;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParams = req.query;
        let filteredUsers = []; // non capisco???
        if (queryParams.name) {
            const searchTerm = queryParams.name.toString().toLocaleLowerCase();
            filteredUsers = users_1.users.filter(element => element.name.first.toLocaleLowerCase().includes(searchTerm) || element.name.last.toLocaleLowerCase().includes(searchTerm));
        }
        if (queryParams.email) {
            const searchTerm = queryParams.email.toString().toLocaleLowerCase();
            filteredUsers = users_1.users.filter(element => element.email.toLocaleLowerCase().includes(searchTerm));
        }
        if (filteredUsers.length === 0)
            filteredUsers = users_1.users;
        res.status(200).json(filteredUsers);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getUsers = getUsers;
