const { db, Pug, Owner } = require('./models');

const pugs = [
  {
    name: 'Sprinkles',
    DOB: '01/02/2018'
  },
  {
    name: 'Sona',
    DOB: '10/08/2017'
  },
  {
    name: 'Roach',
    DOB: '02/01/2018'
  },
  {
    name: 'Bandit',
    DOB: '08/02/2017',
  },
  {
    name: 'Mr Kitty',
    DOB: '11/22/2017'
  }
];

const seed = async () => {
  await db.sync({ force: true });

  // seed your database here!
  Promise.all(pugs.map(pug =>
    Pug.create(pug)
  ))
  .then(() => db.close());


  console.log('Seeding success!!!!!!!');
  //db.close()
}

seed()
  .catch(err => {
    console.error(err)
    db.close()
  });
