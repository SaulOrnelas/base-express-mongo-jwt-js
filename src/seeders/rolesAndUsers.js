const { faker } = require('@faker-js/faker');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');

const roles = [
  {role: "ADMIN"},
  {role: "WAITER"},
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

const generateWaitersUsers = (() => {
  let waiters = [];
  for(let i = 0; i < 5; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLocaleLowerCase().replace(/ /g, '')}@waiter.com`;
    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    const password = bcryptjs.hashSync("waiter1234", salt);
  
    const generatedUser = {
      name: `${firstname} ${lastname}`,
      email: email,
      password: password,
      role: "WAITER"
    };

    waiters.push(generatedUser);
  }

  return waiters;
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
  const waitersUsers = generateWaitersUsers();
  const clientsUsers = generateClientsUsers();
  const allUsers = [...adminsUsers, ...waitersUsers, ...clientsUsers];

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