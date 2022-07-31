const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.7tf4q.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');
  mongoose
    .connect(url)
    .then(() => {
      Person.find({})
        .then((res) => {
          // eslint-disable-next-line array-callback-return
          res.map((person) => {
            console.log(`${person.name} ${person.number}`);
          });
        })
        .then(() => mongoose.connection.close());
    })
    .catch((err) => console.log(err));
}

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected');

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log('person saved!');
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
