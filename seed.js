const { db, Pug, Owner } = require("./models");

const pugs = [
  {
    name: "Sprinkles",
    age: 0.5,
    ownerId: 1
  },
  {
    name: "Sona",
    age: 5,
    ownerId: 2
  },
  {
    name: "Roach",
    age: 2,
    ownerId: 1
  },
  {
    name: "Bandit",
    age: 3,
    ownerId: 3
  },
  {
    name: "Mr Kitty",
    age: 7,
    ownerId: 1
  }
];

const owners = [
  {
    name: "Rob Snow"
  },
  {
    name: "Ned Stark"
  },
  {
    name: "Tony Stark"
  },
  {
    name: "Sansa Stark"
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Promise.all(owners.map(owner => Owner.create(owner)));

    await Promise.all(pugs.map(pug => Pug.create(pug)));

    console.log("Seeding success!!!!!!!");
    db.close();
  } catch (err) {
    console.error(err);
    db.close();
  }
};

seed();
