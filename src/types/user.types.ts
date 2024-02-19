export interface User {
	id: number;
	name: string;
	age: string;
	email: string;
	password: string;
}

interface Subject {
	id: number;
	name: string;
	score: string;
	isPassed: boolean;
}

// typescript extends non può essere utilizzato
export interface Student extends User {
	userId: number;
	subjects: Subject[];
}
