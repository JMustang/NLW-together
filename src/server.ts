import express, { request, response } from "express";

const app = express();

app.get("/test", (req, res) => {
  // req = request   => Entradas.
  // res = response  => Saidas.
  return res.send("Testando rotas.");
});

app.post("/test-post", (req, res) => {
  return res.send("Ola teste post");
});

app.listen(3000, () => console.log("Sever is runnig..."));
