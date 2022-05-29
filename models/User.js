const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    /* schema validation for email to be a valid one. */
    validate: {
      validator: (e) => {
        if (e.includes("@")) return true;
        return false;
      },
      message: "Provide a valid email id.",
    },
  },

  contactNumber: {
    type: String,
    required: true,
    /* schema validation for contact number to be a valid one. */
    validate: {
      validator: (cn) => cn.length === 10,
      message: "Provide a valid contact number.",
    },
  },

  courseLevel: {
    type: String,
    required: true,
  },

  countryPreference: {
    type: [String],
    required: true,
  },

  dob: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("user", Schema);
