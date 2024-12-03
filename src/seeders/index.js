const { response } = require('express');
const { insertUsers } = require('./rolesAndUsers');
const { insertDishes } = require('./categoriesAndDishes');

const executeSeeder = (async (req, res = response) => {
  try {
    let userResponse = await insertUsers();
    let dishesResponse = await insertDishes();
    if (userResponse.seederCompleted && dishesResponse.seederCompleted) {
      res.json({
        seederCompleted: true,
        message: "All seeders were completed"
      });
    }
  } catch (error) {
    res.json({
      error
    })
  }
})

module.exports = {
  executeSeeder
}