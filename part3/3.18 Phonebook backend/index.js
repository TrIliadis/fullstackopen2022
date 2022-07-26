require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
morgan.token("type", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.get("/api/persons", (req, res) => {
  Person.find().then((response) => res.json(response));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (name && number) {
    const newPerson = new Person({
      name,
      number,
    });
    newPerson.save().then((response) => res.json(response));
  } else {
    return res.status(400).json({ error: "missing name or number values" });
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  Person.findByIdAndUpdate(id, { number: number })
    .then((result) => {
      if (result) res.status(204).json(result);
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `<p>Phonebook has info for ${result.length} people</p><p>${Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) res.status(204).end();
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((err) => {
      next(err);
    });
  res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
