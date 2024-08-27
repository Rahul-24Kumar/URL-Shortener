import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/urlRoutes.js';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URL;

app.use(express.json());

if (!mongoURI) {
    console.error('MongoDB URI is missing. Please check your .env file.');
    process.exit(1);
}

mongoose.connect(mongoURI, { dbName: 'url' })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });


app.use('/api', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
