const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectioryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectioryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "hyunseo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about Me",
    name: "hyunseo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "hyunseo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "hyunseo",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "hyunseo",
    errorMessage: "Page not found!",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
