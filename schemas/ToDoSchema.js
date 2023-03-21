const { Schema, model } = require("mongoose");

const ToDoSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    required: true,
  },
  curso: {
    type: String,
    required: true,
  },
  bimestre: {
    type: String,
    required: true,
  },
});

module.exports = model("Aluno", ToDoSchema);
