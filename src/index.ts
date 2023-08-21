import express, {Request, Response, Express} from 'express';
import bodyParser from 'body-parser';
import apiRouter from "./routes/routes";

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', apiRouter);

// Define a sample route
// app.get('/', (req: Request, res: Response) => {
//     res.send("kik");
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
