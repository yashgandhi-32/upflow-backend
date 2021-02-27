import express from "express";


const app = express();

app.use(express.static("public"))


app.use(handleMissing);
app.use(handleErrors);

export default app;
