const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/users", (_, res) => {
  return res.send(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find(i => i.id === id);
  if (typeof foundUser === "undefined") {
    return res.send({ error: "user not found" });
  }
  return res.send(foundUser);
});

app.post("/users", (req, res) => {
  const { id } = req.body;
  if (typeof users.find(i => i.id === id) === "undefined") {
    users.push(req.body);
    return res.sendStatus(200);
  }
  return res.status(400).json({ error: "user exists" });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const foundIdx = users.findIndex(i => i.id === id);
  if (foundIdx !== -1) {
    users[foundIdx] = req.body;
  } else {
    users.push(req.body);
  }
  return res.sendStatus(200);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const foundIdx = users.findIndex(i => i.id === id);

  if (foundIdx !== -1) {
    users.splice(foundIdx, 1);
    return res.sendStatus(200);
  } else {
    return res.status(400).json({ error: "user not found" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log("Express ready on port: " + listener.address().port)
);
