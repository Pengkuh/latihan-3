const express = require("express");
const cors = require('cors');

const app = express();

/** FUNCTION LOGGER */
const logger = (req, res, next) => {
  const date = new Date().toISOString();
  const { method, url } = req;
  console.log(`${date} ==> ${method}:  ${url}`);
  next();
}

var corsOption = {
  origin: "http://localhost:3000"
};

/** MIDDLEWARE */
app.use(logger);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log("failed brayy" + err.message)
  });

const biodata = require('./app/contollers/bio.controller.js');

// ROUTER
app.get("/", (req, res) => {
  res.send({
    message: "Basic ExpressJs brayyy"
  });
});

/** ROUTE biodata */
app.get('/biodata/findNama/:nama', (req, res) => {
  biodata.findBioNama(req, res);
});
app.get('/biodata/findId/:id_biodata', (req, res) => {
  biodata.findBiokId(req, res);
});


// CRUD
app.get('/biodata', (req, res) => {
  biodata.findAll(req, res);
});
app.get('/biodata/:id_biodata', (req, res) => {
  biodata.findOne(req, res);
});
app.post('/biodata', (req, res) => {
  biodata.create(req, res);
});
app.delete('/biodata/:id_biodata', (req, res) => {
  biodata.delete(req, res);
});
app.put('/biodata/:id_biodata', (req, res) => {
  biodata.put(req, res);
});
app.put('/biodata-update/:id_biodata', (req, res) => {
  biodata.update(req, res);
});

/** SET PORT, LISTEN FOR REQUEST */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
