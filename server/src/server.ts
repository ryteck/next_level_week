import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const uploadDirectory = path.resolve(__dirname, '..', 'uploads');

app.use('/uploads', express.static(uploadDirectory));

app.listen(3001);
