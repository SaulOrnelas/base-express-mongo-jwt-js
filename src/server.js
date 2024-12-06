import express from 'express';
import cors from 'cors';

import { dbConnection } from './database/config.js';
import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import dishesRoutes from './routes/dishes.js';
import usersRoutes from './routes/users.js';
import seedersRoutes from './routes/seeder.js';

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      dishes: '/api/dishes',
      users: '/api/users',
      seeders: '/api/seeders'
    }

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Reading and body parsing
    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.categories, categoriesRoutes)
    this.app.use(this.paths.dishes, dishesRoutes)
    this.app.use(this.paths.users, usersRoutes)
    this.app.use(this.paths.seeders, seedersRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running in port: ', this.port)
    })
  }
}

export default Server;
