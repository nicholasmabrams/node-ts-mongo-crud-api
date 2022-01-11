import express = require('express');
import {NextFunction} from 'express-serve-static-core';
import {Request, Response} from 'express'

export const router = express.Router();

/**
 * @todo render README.md -> HTML and present as API docs.
 */
router.get('/', (
  request: Request,
  response: Response,
  next: NextFunction) => {
  response.render('index', { title: 'CaptureLife Code Assessment' });
});

export default router;
