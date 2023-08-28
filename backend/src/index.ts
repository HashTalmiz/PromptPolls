import express, {Request, Response, Express} from 'express';
import bodyParser from 'body-parser';
import apiRouter from "./routes/routes";
import http from 'http';
import { errorResponse } from './utils/errorHandling';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);
const pollsIO = io.of('/poll')

pollsIO.on('connection', (socket: Socket) => {
  const pollId = socket.handshake.query.id as string;
  console.log(`Client connected: ${socket.id} and wants to sub to poll: ${pollId}`);
  socket.join(pollId);
  
  socket.on('disconnect', () => {
      socket.leave(pollId);
      console.log(`Client disconnected: ${socket.id}`);
  });
});

app.set('pollsIO', pollsIO);
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', apiRouter);
app.use(errorResponse);


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
