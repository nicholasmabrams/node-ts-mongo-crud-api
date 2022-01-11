import express = require('express');
import { NextFunction } from 'express-serve-static-core';
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import {
  createPost,
  deletePost,
  getPost,
  updatePost
} from 'data-access-layer';

export const router = express.Router();

router.post('/create', (
  request: Request,
  response: Response,
  next: NextFunction) => {
  const { author, content, title } = request.body;
  
  createPost(author, content, title).then((success) => {
    if (success) {
      response
        .status(StatusCodes.OK)
        .send(ReasonPhrases.OK);
    } else {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR);
      next(`Post insert failed! Error: ${ReasonPhrases.INTERNAL_SERVER_ERROR}.`);
    }
  });
});

router.get('/get/:uuid', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {uuid} = request.params; 
    
    getPost(uuid).then((post) => {
      if (post) {
        response.status(StatusCodes.OK).send(post);
      } else {
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    });
});

router.put('/update', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const { author, content, title, uuid } = request.body;

    updatePost(uuid, { author, content, title }).then((success) => {
      if (success) {
        response
          .status(StatusCodes.OK)
          .send(ReasonPhrases.OK);
      } else {
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
});

router.delete('/delete', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {uuid} = request.body;

    deletePost(uuid).then((success) => {
      if (success) {
        response
          .status(StatusCodes.OK)
          .send(ReasonPhrases.OK);
      } else {
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    });
});

export default router;
