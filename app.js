import express from 'express';
import dotenv from 'dotenv';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {
  errorHandlerMiddleware,
  handleUncaughtError,
} from './middlewares/errorHandlerMiddleware.js';
import { auth, attachUserToViews } from './middlewares/auth.js';

import homeRouter from './src/home/home.routes.js';
import userRoutes from './src/user/routes/user.routes.js';
import studentRoutes from './src/student/routes/student.routes.js';
import interviewRoutes from './src/interview/routes/interview.routes.js';
import externalJobRoutes from './src/externalJob/routes/externalJob.routes.js';

// Handle uncaught exceptions
handleUncaughtError();

// Handle environmental variables
const configPath = path.resolve('config', 'uat.env');
dotenv.config({ path: configPath });

// Initialize the app
const app = express();
app.use(cookieParser());

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Set up session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Serve static files from the "public" directory
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(ejsLayouts); // Middleware

app.use(attachUserToViews);

// configure routes
app.use('/api/placementcell/', homeRouter);
app.use('/api/placementcell/user', userRoutes);
app.use('/api/placementcell/student', auth, studentRoutes);
app.use('/api/placementcell/interview', auth, interviewRoutes);
app.use('/api/placementcell/jobs', auth, externalJobRoutes);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
