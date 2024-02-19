import { Request, Response } from "express";

import { User } from "../models/user.model";
import { users } from "../data/users";

export const getUserById = async (req: Request, res: Response) => {
    try{
        const id = +req.params.id;
        const user = users.find(element => element.id === id);
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({error: err.message});
    }
}

export const addUserHandler = async(req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const newID = users.reduce((max, user) => Math.max(max, user.id), 0) +1;
        users.push({...user, id: newID});
        res.status(200).json({...user, id: newID});
    } catch (err: any) {
        res.status(500).json({error: err.message});
    }
}

export const updateUserHandler = async(req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const user = users.find(element => element.id === id);
        if (user) {
            Object.assign(user, req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "user not found"});
        }
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}

export const deleteUserHandler = async(req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const index = users.findIndex(element => element.id === id);
        if (index !== -1){
            users.splice(index, 1);
            res.status(200).json({message: "User cancelled on database"});
        } else {
            res.status(404).json({message: "User not found mbare"})
        }
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}

export const getUsers = async(req: Request, res: Response) => {
    try{
        const queryParams = req.query;

        let filteredUsers: User[] = []; // non capisco???

        if (queryParams.name) {
            const searchTerm = queryParams.name.toString().toLocaleLowerCase();
            filteredUsers = users.filter(element => element.name.first.toLocaleLowerCase().includes(searchTerm) || element.name.last.toLocaleLowerCase().includes(searchTerm));
        }

        if (queryParams.email) {
            const searchTerm = queryParams.email.toString().toLocaleLowerCase();
            filteredUsers = users.filter(element => element.email.toLocaleLowerCase().includes(searchTerm));
        }

        if (filteredUsers.length === 0) filteredUsers = users;

        res.status(200).json(filteredUsers);
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}