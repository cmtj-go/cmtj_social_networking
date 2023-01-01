require('dotenv').config()
import 'reflect-metadata'
import express from 'express'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_DATABASE_DEV,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*']
})

const main = async () => {
  await AppDataSource.initialize()
  const app = express()
  app.listen(process.env.SEVER_PORT, ()=> console.log(`Connected to host ${process.env.SEVER_PORT}`))
}

main().catch(err => console.error(err))