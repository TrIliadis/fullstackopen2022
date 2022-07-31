const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    minLength: [8, "Number must be at least 8 numbers long"],
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5}/.test(v) && v.length >= 8;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
