const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.use(express.json());
app.use(express.static('build'))
app.use(cors());
morgan.token("type", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (persons.find((person) => person.name === name)) {
    return res.status(400).json({ error: "name must be unique" });
  } else if (name && number) {
    const newPerson = {
      name,
      number,
      id: getRandomInt(persons.length + 1, persons.length + 1000),
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
  } else {
    return res.status(400).json({ error: "missing name or number values" });
  }
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((x) => x.id === Number(id));
  if (!person) return res.status(400).json({ error: "person not found" });
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const copy = persons.filter((person) => {
    return person.id !== Number(id);
  });
  if (copy.length === persons.length)
    return res.status(400).json({ error: "person not found" });
  persons = copy;
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
