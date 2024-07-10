import 'reflect-metadata';
import 'dotenv/config'

import { AppDataSource } from './configs/databases/mysql'

import { app } from './index';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    AppDataSource.initialize()
    .then(() => {
        console.log('DB is running!')
    })
    .catch((error) => console.log(error))
});
