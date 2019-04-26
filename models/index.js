/* eslint-disable spaced-comment */
/* eslint-disable semi */

/* This is where my models are defined: Pug and Owner */
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/pets', {
  logging: false
});

const Pug = db.define('pug', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DOB: {
    type: Sequelize.STRING
  }
});

const Owner = db.define('owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

//1:M
Pug.belongsTo(Owner);
Owner.hasMany(Pug);

module.exports = {
  db,
  Pug,
  Owner
}
