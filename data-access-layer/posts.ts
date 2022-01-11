import { InsertOneResult, ObjectId } from "mongodb";

import { dbName } from "./common";
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
    const timestamp = new Date().toLocaleString();
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
  
  export async function updatePost(
    uuid: string, 
    updatedPostDetails: { 
      author?: string,
      content?: string,
      title?: string
    }) {
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
  