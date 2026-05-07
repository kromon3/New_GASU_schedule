import express from 'express';
import cors from 'cors';
import {PORT} from "./config/index"
import router from "./routs/routs";

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());

app.listen(PORT, () => {
    console.log(`🚀 Сервер: http://localhost:${PORT}`);
});