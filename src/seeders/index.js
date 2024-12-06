import { response } from "express";
import { insertUsers } from "./rolesAndUsers.js";
import { insertDishes } from "./categoriesAndDishes.js";

export const executeSeeder = (async (req, res = response) => {
  try {
    let userResponse = await insertUsers();
    let dishesResponse = await insertDishes();
    if (!userResponse.seederCompleted) {
      res.json({
        seederCompleted: true,
        message: "Users seeders cannot be completed"
      });
    } else if (!dishesResponse.seederCompleted) {
      res.json({
        seederCompleted: true,
        message: "Dishes seeders cannot be completed"
      });
    } else if (userResponse.seederCompleted && dishesResponse.seederCompleted) {
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
