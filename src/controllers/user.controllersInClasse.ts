// non essendoci app ed express è necessario inserire (req: Request, res: Response);
// ci sono solo funzioni pertanto non serve inserire express e app,
import { Request, Response } from "express";
import { users } from "../data/users";

import { v4 as uuidv4 } from "uuid";

export const getUsers = (req: Request, res: Response) => {
	res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
	const id = req.params.id;
	const userfound = users.find((user) => user.id === id);
	if (userfound) {
		res.status(200).json(userfound);
	} else {
		res.status(400).json({ message: "User not found" });
		throw new Error("User not found");
	}
};

export const addUserHandler = (req: Request, res: Response) => {
	const user: User = req.body;
	//users.push({...user, id: Date.now().toString()}) // crea un valore random
	users.push({ ...user, id: uuidv4 });
	const lastId =
		user.reduce((max, element) => Math.max(max, element.id), 0) + 1;
};
