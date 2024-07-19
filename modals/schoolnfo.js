const mongoose = require("mongoose");

const studentInfo = mongoose.Schema(
  {
    application: { type: Number, required: true,unique:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String,},
    phoneNumber: { type: Number, required: true },
    date: { type: Date },
    age: { type: Number },
    gender: { type: String },
    course: { type: String },
    state: { type: String },
    district: { type: String },
  },
  { collection: "students" },{versionKey:false}
);

const studentInfos = mongoose.model("students", studentInfo);

module.exports = studentInfos;
