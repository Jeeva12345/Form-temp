const mongoose = require("mongoose");

const studentInfos = require("./modals/schoolnfo");

const express = require("express");

const app = express();

const port = 5000;

const cors = require("cors");

app.use(express.json());

app.use(cors());

const { ObjectId } = require("mongodb");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

const mongo_url = "mongodb://localhost:27017/new-mongo1";

console.log(studentInfos);

async function main() {
  await mongoose.connect(mongo_url);
}

app.get("/", function (req, res) {
  res.send("ABC SCHOOL STUDENT REGISTRATION");
});

app.post("/home/", async (req, res) => {
  try {
    await main();
    const studentData = await new studentInfos(req.body);
    await studentData.save();
    res.send(studentData);
  } catch (err) {
    console.log(err);
  }
});

app.get("/home/", async (req, res) => {
  try {
    await main();
    const studentData = await studentInfos.find().sort({ _id: 1 });
    res.send(studentData);
  } catch (err) {
    console.log(err);
  }
});

app.post("/update/", async (req, res) => {
  await main();
  const id = new ObjectId(req.body._id);
  console.log(req.body._id);
  delete req.body._id;
  const studentData = await studentInfos.findOneAndUpdate(
    { _id: id},
    { $set: req.body }
  );
  if (studentData.modifiedCount === 0) {
    return res.status(404).send({ message: "Document not found" });
  }
  res.send("student detail updated successfully");
});

app.post("/delete/", async (req, res) => {
  try {
    await main();
    console.log(req.body);
    const studentData = await studentInfos.findOneAndDelete(req.body);
    res.send(studentData);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
