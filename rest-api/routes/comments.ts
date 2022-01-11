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
  const { author, content, uuid } = request.body;

  createComment(
    author,
    content,
    uuid
  ).then((success) => {
    if (success) {
      response
        .status(StatusCodes.OK)
        .send(ReasonPhrases.OK);
    } else {
      response.status(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      next(`Comment insert failed! Error: ${ReasonPhrases.INTERNAL_SERVER_ERROR}.`);
    }
  });
});

router.get('/get/:uuid', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {uuid} = request.params; 

    getComment(uuid).then((comment) => {
      if (comment) {
        response
          .status(StatusCodes.OK)
          .send(comment);
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
    const { author, content, uuid } = request.body;

    updateComment(uuid, { author, content }).then((success) => {
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

    deleteComment(uuid).then((success) => {
      if (success) {
        response.status(StatusCodes.OK).send(ReasonPhrases.OK);
      } else {
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    });
});

export default router;
