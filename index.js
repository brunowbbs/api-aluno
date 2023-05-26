const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const PORT = process.env.PORT || 3000;

const ToDoSchema = require("./schemas/ToDoSchema");

const server = express();

server.use(cors());

server.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.lbeluot.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

server.get("/", (req, res) => {
  return res.json({
    message: "Seja bem vindo à API do ALUNO_LIST - Wesley Bruno!!!😉",
  });
});

server.get("/cursos", (req, res) => {
  return res.json({
    cursos: [
      {
        id:1,
        name:"Banco de Dados"
      },
      {
        id:2,
        name:"Desenvolvimento Back-end"
      },
      {
        id:3,
        name:"Desenvolvimento Front-end"
      },
      {
        id:4,
        name:"UX/UI"
      },
      {
        id:5,
        name:"Ciência de Dados"
      },
      {
        id:6,
        name:"Inteligência Artificial"
      },
      {
        id:7,
        name:"Desenvolvimento Mobile"
      },
    ],
  });
});

server.post("/aluno", async (req, res) => {
  const { nome, matricula, curso, bimestre } = req.body;
  
  if (!nome || !matricula || !curso || !bimestre) {
    return res.status(400).json({ message: "Validations Fails" });
  }

  const todo = await ToDoSchema.create(req.body);
  return res.status(201).json(todo);
});

server.get("/aluno", async (req, res) => {
  const todos = await ToDoSchema.find();
  return res.json(todos);
});

server.get("/aluno/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ToDoSchema.findById(id);
  return res.json(todo);
});

server.put("/aluno/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ToDoSchema.findOneAndUpdate({ _id: id }, req.body);
  return res.json(todo);
});

server.delete("/aluno/:id", async (req, res) => {
  const { id } = req.params;
  await ToDoSchema.deleteOne({ _id: id });
  return res.json({ message: "Successfully deleted" });
});

server.listen(PORT, () =>
  console.log("Servidor iniciado em http://localhost:" + PORT)
);
