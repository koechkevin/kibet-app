import express, { Express, static as staticServe, Response, Request } from 'express';
import socket, { Server as SocketServer } from 'socket.io';
import { createServer, Server } from 'http';
import path from 'path';
import { config as envConfig } from 'dotenv';
import bodyParser from 'body-parser';

envConfig();

const app: Express = express();

const server: Server = createServer(app);
const io: SocketServer = socket(server);

app.post('/api/call', bodyParser.json(), (req: Request, res: Response) => {
  io.emit('new-call', req.body);
  res.status(200).json(req.body);
});

const DIST: string = path.resolve(__dirname, '../build');
app.use(staticServe(DIST));

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use('*', (req: Request, res: Response) => res.sendFile(path.resolve(DIST, 'index.html')));

server.listen(PORT, () => console.log(PORT));
