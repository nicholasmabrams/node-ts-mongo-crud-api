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
  const { 
    author,
    content,
    title
  }: {
    author: string,
    content: string,
    title: string
  } = request.body;
  
  createPost(author, content, title).then((success) => {
    if (success) {
      response.sendStatus(StatusCodes.OK);
    } else {
      response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      next(`Post insert failed! Error: ${ReasonPhrases.INTERNAL_SERVER_ERROR}.`);
    }
  });
});

router.get('/get/:uuid', (
  request: Request,
  response: Response,
  next: express.NextFunction) => {
    const {uuid}: {[uuid: string]: string} = request.params; 
    
    getPost(uuid).then((post) => {
      if (post) {
        response.json(post);
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
      content,
      title,
      uuid
    }: {
      author: string,
      content: string,
      title: string,
      uuid: string
    } = request.body;

    updatePost(uuid, { author, content, title }).then((success) => {
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
    const {uuid} = request.body;

    deletePost(uuid).then((success) => {
      if (success) {
        response.sendStatus(StatusCodes.OK);
      } else {
        next(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
});

export default router;
