import Express from "express";
import { router as userApi } from "./routes/user.route";
import { router as postApi } from "./routes/post.route";

const app = Express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.json({ message: "Server is online" });
});

app.use("/users", userApi); // tutto questo sarà rimandato in user.route
app.use("/posts", postApi);

app.listen(PORT, () => console.log("Il server è attivo"));
