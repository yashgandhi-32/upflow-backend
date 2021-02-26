import express from "express";
import { handleMissing, handleErrors } from "./middleware";


const app = express();

app.use(express.static("public"))


app.use(handleMissing);
app.use(handleErrors);

export default app;
