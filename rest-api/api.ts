import express = require('express');
import { Application as ExpressApiBuilder } from 'express-serve-static-core';
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import path = require('path');

// Requirements fulfilled within this endpoint.
import { router as commentsRouter } from './routes/comments';
// Display API documentation.
import { router as indexRouter } from './routes/index';
// Requirements fulfilled within this endpoint.
import { router as postsRouter } from './routes/posts';

export const api: ExpressApiBuilder = express();

// Middleware.
api.use(cookieParser());
api.use(express.json());
api.use(express.static(path.join(__dirname, 'public')));
api.use(express.urlencoded({ extended: false }));
api.use(logger('dev'));

// "Base" route controllers.
api.use('/', indexRouter);
api.use('/comments', commentsRouter);
api.use('/posts', postsRouter);

export default api;
