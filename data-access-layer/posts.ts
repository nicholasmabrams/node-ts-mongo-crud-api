import { InsertOneResult, ObjectId } from "mongodb";

import { dbName } from "./common";
import { PostUpdateInterface } from "./interfaces/post.interface";
import { connectMongo } from "./mongo-singleton";

/**
 * @function createPost Adds a new post the the "post" document to
 *                      the posts collection.
 * @param title The title of the post.
 * @param author The author of the post.
 * @param content The body content of the post.
 */
 export async function createPost(
    author: string,
    content: string,
    title: string
  ) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const timestamp = new Date().toISOString()
    const insertOperationResult: InsertOneResult | void = db && await db.collection('posts').insertOne({
      title,
      author,
      content,
      timestamp
    });
  
    return (
      insertOperationResult?.acknowledged
      && !!insertOperationResult?.insertedId
    );
  }
  
  /**
   * @function getPost Gets a single post by UUID.
   * @param uuid The post to fetch from the DB and return.
   * @returns The post if successful, or false if not.
   */
  export async function getPost(uuid: string) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const postFound = db && await db.collection('posts').count(query);
  
    if (postFound) {
      return await db.collection('posts').findOne(query);
    } else {
      return false;
    }
  }
  
  /**
   * @function updatePost
   * @param uuid The UUID of the post to update. 
   * @param updatedPostDetails The post details to apply
   *                              during the update, overwriting
   *                              data from the previous entry.
   * @returns If successful, return true if not false.
   */
  export async function updatePost(
    uuid: string, 
    updatedPostDetails: PostUpdateInterface) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const postFound = db && await db.collection('posts').count(query);
  
    if (postFound) {
      const updateResult = await db.collection('posts').updateOne(query, {
        $set: {
          ...updatedPostDetails
      }}); 
      
      return updateResult.matchedCount === 1;
    } else {
      return false;
    }
  }
  
   /**
   * @function deletePost Deletes a single post by UUID.
   * @param uuid The UUID of the post to delete.
   * @returns If successful, return true if not false.
   */
  export async function deletePost(uuid: string) {
    const connection = await connectMongo();
    const db = connection && connection.db(dbName);
    const query = {
      _id: new ObjectId(uuid)
    };
    const postFound = db && await db.collection('posts').count(query);
    
    if (postFound) {
      return (await db.collection('posts').deleteOne(query)).deletedCount === 1;
    } else {
      return false;
    }
  }
  