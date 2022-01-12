import { ObjectId } from "mongodb";

import { dbName } from "./common";
import { CommentUpdateInterface } from "./interfaces/comment.interface";
import { connectMongo } from "./mongo-singleton";

/**
 * @function createComment
 * @param postOrCommentId The post or comment ID to add a comment to.
 * @param comment The comment to update a post or (nested) comment with.
 * @param uuid The associated comment or post which this comment is in 
 *             response to.
 * @description Given a post or comment UUID and a comment, update the 
 *              entity in the DB with the comment. Since a comment can
 *              link to either a post or another comment, check both for 
 *              existence prior to associating a comment with the entity.
 */
 export async function createComment(
    author: string,
    comment: string,
    uuid: string) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const postFound = db && await db.collection('posts').count(query);
    const commentFound = db && await db.collection('comments').count(query);
  
    if (commentFound || postFound) {
      db && await db.collection('comments').insertOne({ 
        author,
        comment,
        uuid,
        linkedType: postFound ? 'post' : 'comment'
      });
  
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * @function getComment Gets a single comment by UUID.
   * @param uuid The comment to fetch from the DB and return.
   * @returns The comment if successful, or false if not.
   */
  export async function getComment(uuid: string) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const commentFound = db && await db.collection('comments').count(query);
  
    if (commentFound) {
      return await db.collection('comments').findOne(query);
    } else {
      return false;
    }
  }
  
  /**
   * @function deleteComment Deletes a single comment by UUID.
   * @param uuid The UUID of the comment to delete.
   * @returns If successful, return true if not false.
   */
  export async function deleteComment(uuid: string) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const commentFound = db && await db.collection('comments').count(query);
  
    if (commentFound) {
      return (await db.collection('comments').deleteOne(query)).deletedCount === 1;
    } else {
      return false;
    }
  }
  
  /**
   * @function updateComment
   * @param uuid The UUID of the comment to update. 
   * @param updatedCommentDetails The comment details to apply
   *                              during the update, overwriting
   *                              data from the previous entry.
   * @returns If successful, return true if not false.
   */
  export async function updateComment(
    uuid: string,
    updatedCommentDetails: CommentUpdateInterface) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const commentFound = db && await db.collection('comments').count(query);
  
    if (commentFound) {
      const updateResult = await db.collection('comments').updateOne(query, {
        $set: {
          ...updatedCommentDetails
      }});

      return updateResult.matchedCount === 1;
    } else {
      return false;
    }
  }
  