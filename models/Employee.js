const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true
  },
  department: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true
  },
  salary: {
    type: Number,
  },
  joinedYear: {
    type: Number,
  },
  createdBy: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
