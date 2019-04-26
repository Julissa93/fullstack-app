/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { db, Pug, Owner } = require("./models");
const app = express();

//logging middleware
app.use(morgan("dev"));
// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
//app.use(express.static(path.join(__dirname, '..', 'public')));

app.get("/", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/pugs/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    let pug = await Pug.findByPk(req.params.id);
    //here's how we can show a 404 error
    if (pug) {
      res.json(pug);
    } else {
      //res.status(404).send('Not Found! :( ')
      next();
    }
  } catch (err) {
    next(err);
  }
});

//shows 500 error
app.get("/error", (req, res, next) => {
  try {
    unreferencedVariable;
  } catch (err) {
    next(err);
  }
});

//eager loading
app.get("/pugs", async (req, res, next) => {
  try {
    const pugs = await Pug.findAll({
      include: [{ model: Owner }]
    });
    res.json(pugs);
  } catch (err) {
    next(err);
  }
});

//You can ALSO have NESTED eager loading for joining more than 2 tables! *Note that this is pseudocode*
/*User.findAll({
      include: [
        {model: Tool, as: 'Instruments', include: [
          {model: Teacher, include: [ etc ]}
        ]}
      ]
    }).then(users => {
      console.log(JSON.stringify(users))
    
      
        [{
          "name": "John Doe",
          "id": 1,
          "createdAt": "2013-03-20T20:31:45.000Z",
          "updatedAt": "2013-03-20T20:31:45.000Z",
          "Instruments": [{ // 1:M and N:M association
            "name": "Toothpick",
            "id": 1,
            "createdAt": null,
            "updatedAt": null,
            "userId": 1,
            "Teacher": { // 1:1 association
              "name": "Jimi Hendrix"
            }
          }]
        }]
      
    })
  */

//this middleware will be used when you call next(error) NOT next()
app.use((err, req, res, next) => {
  //handles 500 errors ONLY if you do next(error)
  res.status(500).send("Oops! Something went wrong! 500 ERROR. ");
});

//if you don't pass the error it will skip the above middleware and use this one
//which you can use for 404. 404 isn't TECHNICALLY an error because all of your code has been written correctly,
//there hasn't been any type of server side error
//404 is an error on the client side - meaning that a user tried to make an INVALID request
//like requesting 'CATS' instead of 'pugs'
app.use((req, res, next) => {
  //handles 404 errors
  res.status(404).send("Not Found! ;( ");
});

db.sync().then(() => console.log("The database is synced"));
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
