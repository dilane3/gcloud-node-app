import express from "express";
import { config } from "dotenv";

// Fetch variables from .env file
config();

const app = express();

const users = [
  {
    id: 1,
    name: "dilane3",
  },
  {
    id: 2,
    name: "nina",
  },
  {
    id: 3,
    name: "donald",
  },
  {
    id: 4,
    name: "corine",
  },
];

app.use(express.json());

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = +req.params.id;

  const user = users.find((usr) => usr.id === id);

  if (user) return res.status(200).json(user);

  return res.status(404).json({ message: "No user found" })
});

app.post("/api/users", (req, res) => {
  const name = req.body.name;

  if (name) {
    const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

    const user = {
      id,
      name,
    };

    users.push(user);

    res.status(201).json(user);
  }

  throw new Error("Provide a name");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on Port ${process.env.PORT}`);
});
