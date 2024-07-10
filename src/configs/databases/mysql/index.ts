import { DataSource } from "typeorm";

import { Invoice } from "../../../models/invoice.model";

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_DATABASE_HOST,
    port: 3306,
    username: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    entities: [Invoice],
    synchronize: true,
    logging: false,
})

export { AppDataSource }