import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { connectDB } from "./db/postgresConnection.mjs";

import mainRouter from './routes/mainRouter.mjs'
const app = express();

const startServer = async () => {
  try {
    // connecting to databse
    await connectDB();

    app.use(cors());

    // configuring for json body requests, bus dar capture res middle ware ir logging mid ware...
    app.use(express.json());

    // api routes

    app.use('/api', mainRouter);

    // configure port 
    const port = process.env.PORT;

    // Starting server
    
    app.listen(port, () => {
        console.log(`server is running and listening on ${port}`)
    });
  } catch (error) {
    console.error("Error occured while starting the server", error)
    process.exit(1)
  }
};



// now start

startServer();