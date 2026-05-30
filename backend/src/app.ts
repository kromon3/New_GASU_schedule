import express from 'express';
import cors from 'cors';
import {PORT} from "./config/index"
import router from "./routs/routs";
import { pool } from '../service/pool';


pool.connect()
    .then(() => {console.log('connected successfully!')})
    .catch(e => console.log('Error: ',e))
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`🚀 Сервер: http://localhost:${PORT}`);
});