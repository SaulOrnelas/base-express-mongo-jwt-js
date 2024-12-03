const { response } = require('express');
const { insertUsers } = require('./rolesAndUsers');
const { insertProducts } = require('./categoriesAndProducts');

const executeSeeder = (async (req, res = response) => {
  try {
    let userResponse = await insertUsers();
    let productsResponse = await insertProducts();
    if (userResponse.seederCompleted && productsResponse.seederCompleted) {
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