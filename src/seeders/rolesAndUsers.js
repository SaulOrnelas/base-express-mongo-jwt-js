const { faker } = require('@faker-js/faker');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');

const roles = [
  {role: "ADMIN"},
  {role: "SALES"},
  {role: "CLIENT"},
  {role: "OTHER"}
]

const generateAdminsUsers = (() => {
  let admins = [];
  for(let i = 0; i < 2; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLocaleLowerCase().replace(/ /g, '')}@admin.com`;
    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    const password = bcryptjs.hashSync("admin1234", salt);
  
    const generatedUser = {
      name: `${firstname} ${lastname}`,
      email: email,
      password: password,
      role: "ADMIN"
    };

    admins.push(generatedUser);
  }

  return admins
})

const generateSalesUsers = (() => {
  let sales = [];
  for(let i = 0; i < 5; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLocaleLowerCase().replace(/ /g, '')}@sales.com`;
    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    const password = bcryptjs.hashSync("sales1234", salt);
  
    const generatedUser = {
      name: `${firstname} ${lastname}`,
      email: email,
      password: password,
      role: "SALES"
    };

    sales.push(generatedUser);
  }

  return sales;
})

const generateClientsUsers = (() => {
  let clients = [];
  for(let i = 0; i < 20; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLocaleLowerCase().replace(/ /g, '')}@client.com`;
    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    const password = bcryptjs.hashSync("client1234", salt);

    const generatedUser = {
      name: `${firstname} ${lastname}`,
      email: email,
      password: password,
      role: "CLIENT"
    };

    clients.push(generatedUser);
  };
  return clients;
});

const insertUsers = (async () => {
  const adminsUsers = generateAdminsUsers()
  const salesUsers = generateSalesUsers();
  const clientsUsers = generateClientsUsers();
  const allUsers = [...adminsUsers, ...salesUsers, ...clientsUsers];

  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    // Remove old documents
    //await User.deleteMany({}, { session });
    await Role.deleteMany({});
    await User.deleteMany({});
  
    // Insert old documents
    // await User.insertMany(allUsers, { session });
    await Role.insertMany(roles);
    await User.insertMany(allUsers);
    // await session.commitTransaction();
    console.log("Users seeder completed")
    return {seederCompleted: true, message: "Roles and Users saved"};
  } catch (error) {
    return {seederCompleted: false, message: "Error to execute seeder"};
  }
})

module.exports = {
  insertUsers
}