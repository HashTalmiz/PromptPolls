import express, {Request, Response, Express} from 'express';
import bodyParser from 'body-parser';

// Create Express app
const app: Express = express();

// Middleware
app.use(bodyParser.json());

// Define a sample route
app.get('/', (req: Request, res: Response) => {
    res.send("kik");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
