/* eslint-disable spaced-comment */
/* eslint-disable semi */

/* This is where my models are defined: Pug and Owner */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/pets",
  {
    logging: false
  }
);

const Pug = db.define("pug", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.DOUBLE
  }
});

//Class Method Example:
Pug.getPuppies = function() {
  // 'this' refers directly back to the model (the capital "P" Pug)
  return this.findAll({
    // could also be Pug.findAll
    where: {
      age: { [Op.lte]: 2 } // find all pugs where age is less than or equal to 1
    }
  });
};

//Instance Method Example:
Pug.prototype.celebrateBirthday = function() {
  //this refers to the instance!
  return this.increment('age', { by: 7 });
};

const Owner = db.define("owner", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//1:M
Pug.belongsTo(Owner);
Owner.hasMany(Pug);

module.exports = {
  db,
  Pug,
  Owner
};
