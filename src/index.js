const express = require("express");
const userArr = require("./InitialData");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

let newId = userArr.length + 1;
app.get("/api/student", (req, res) => {
  try {
    res.json({
      status: "Sucess",
      userArr,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.get("/api/student/:id", (req, res) => {
  try {
    const idx = userArr.findIndex((obj) => obj.id == req.params.id);
    if (idx == -1) {
      return res.status(400).json({
        status: "Failure",
        message: "There is no student with the given ID",
      });
    }
    res.json({
      status: "Sucess",
      data: userArr[idx],
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.post("/api/student", (req, res) => {
  try {
    if (!req.body.name || !req.body.currentClass || !req.body.division) {
      return res.status(400).json({
        status: "Failed",
        message: "Incomplete data",
      });
    }

    userArr.push({
      id: newId,
      name: req.body.name,
      currentClass: req.body.currentClass,
      division: req.body.division,
    });
    newId++;

    res.json({
      status: "Sucess",
      id: newId,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.put("/api/student/:id", (req, res) => {
  try {
    const idx = userArr.findIndex((obj) => obj.id == req.params.id);
    if (idx == -1) {
      return res.status(400).json({
        status: "Failure",
        message: "There is no student with the given ID",
      });
    }
    if (req.body.name) userArr[idx].name = req.body.name;
    
    if (req.body.currentClass)
      userArr[idx].currentClass = req.body.currentClass;

    if (req.body.division) userArr[idx].division = req.body.division;

    res.json({
      status: "Sucess",
      data: userArr[idx],
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.delete("/api/student/:id", (req, res) => {
  try {
    const idx = userArr.findIndex((obj) => obj.id == req.params.id);
    if (idx == -1) {
      return res.status(400).json({
        status: "Failure",
        message: "There is no student with the given ID",
      });
    }
    userArr.splice(idx, 1);
    res.json({
      status: "Sucess",
      messgae: "record deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
