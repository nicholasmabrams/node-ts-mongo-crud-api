import { InsertManyResult, MongoClient } from "mongodb";
import { dbName } from "../common";
import { CommentInterface } from "../interfaces/comment.interface";
import { PostInterface } from "../interfaces/post.interface";
import { connectMongo } from "../mongo-singleton";

export async function insertMockData(): Promise<boolean | void> {
    const dbConnection: MongoClient | void = await connectMongo();

    if (dbConnection) {
        const db = dbConnection.db(dbName);
        const seedCommentSource: CommentInterface = {
            author: 'Commenting Person',
            comment: 'Comment content'
        };
        const seedPostSource: PostInterface = {
            author: 'Post Person',
            content: 'Post content',
            title: 'Post title'
        };
        const mockComments: CommentInterface[] = [];
        const mockPosts: PostInterface[] = [];
        
        // Create 25 mock posts and comments.
        for (let iteration = 1; iteration <= 25; iteration++) {
            const newComment: CommentInterface = {...seedCommentSource};
            const newPost: PostInterface = {...seedPostSource};
            newComment.author += ` #${iteration}`;
            newComment.comment += ` #${iteration}`;
            mockComments.push(newComment);

            newPost.author += ` #${iteration}`;
            newPost.content += ` #${iteration}`;
            newPost.title += ` #${iteration}`; 
            mockPosts.push(newPost);
        }

        console.log({mockPosts, mockComments});

        let commentsInsertResult: InsertManyResult<Document> = await db.collection('comments').insertMany(
            mockComments
        );
        let postsInsertResult: InsertManyResult<Document> = await db.collection('posts').insertMany(
            mockPosts
        );

        return postsInsertResult.insertedCount === 25 && commentsInsertResult.insertedCount === 25;
    }
}

insertMockData().then((success) => {
    const consoleMethod = console[success ? 'log' : 'error'];
    const consoleMessage = success
        ? 'Inserted 25 posts and comments successfully!' 
        : 'An error occurred while inserting mock comments and posts.';

    consoleMethod(consoleMessage);
});
