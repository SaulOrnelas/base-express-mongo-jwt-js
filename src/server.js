const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      users: '/api/users',
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
    this.app.use(this.paths.auth, require('./routes/auth'))
    this.app.use(this.paths.categories, require('./routes/categories'))
    this.app.use(this.paths.products, require('./routes/products'))
    this.app.use(this.paths.users, require('./routes/users'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running in port: ', this.port)
    })
  }
}

module.exports = Server
