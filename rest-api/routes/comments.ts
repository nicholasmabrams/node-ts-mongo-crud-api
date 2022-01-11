import express = require('express');
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import {
  createComment,
  deleteComment,
  getComment,
  updateComment
} from 'data-access-layer';

export const router = express.Router();

router.post('/create', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
  const {
    author,
    content,
    uuid
  }: {
    author: string,
    content: string,
    uuid: string
  } = request.body;

  createComment(
    author,
    content,
    uuid
  ).then((success) => {
    if (success) {
      response.sendStatus(StatusCodes.OK);
    } else {
      response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      next(`Comment insert failed! Error: ${ReasonPhrases.INTERNAL_SERVER_ERROR}.`);
    }
  });
});

router.get('/get/:uuid', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {uuid}: {[uuid: string]: string} = request.params; 

    getComment(uuid).then((comment) => {
      if (comment) {
        response.json(comment);
      } else {
        next(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
});

router.put('/update', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {
      author,
      comment,
      uuid
    }: {
      author: string,
      comment: string,
      uuid: string
     } = request.body;

    updateComment(uuid, { author, comment }).then((success) => {
      if (success) {
        response.sendStatus(StatusCodes.OK);
      } else {
        next(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
});

router.delete('/delete', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {uuid}: {[uuid: string]: string} = request.body;

    deleteComment(uuid).then((success) => {
      if (success) {
        response.sendStatus(StatusCodes.OK);
      } else {
        next(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
});

export default router;
