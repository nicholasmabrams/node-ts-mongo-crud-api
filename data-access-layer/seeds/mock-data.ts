import { InsertManyResult, MongoClient, ObjectId } from "mongodb";
import { dbName } from "../common";
import { CommentInterface } from "../interfaces/comment.interface";
import { PostInterface } from "../interfaces/post.interface";
import { connectMongo } from "../mongo-singleton";

/**
 * @function @async insertMockData Populate the database with
 *                  arbitrary mock data for testing.
 * @param count The number or comments and posts to populate the
 *              database with. Defaults to 10.
 * @returns True or false depending on if the process ran according
 *          to plan.
 */
export async function insertMockData(count: number = 10): Promise<boolean | void> {
    const dbConnection: MongoClient | void = await connectMongo();

    if (dbConnection) {
        const db = dbConnection.db(dbName);
        const seedCommentSource: CommentInterface = {
            author: 'Commenting Person',
            comment: 'Comment content',
            uuid: ''
        };
        const seedPostSource: PostInterface = {
            author: 'Post Person',
            content: 'Post content',
            title: 'Post title'
        };
        const mockComments: CommentInterface[] = [];
        const mockPosts: PostInterface[] = [];
        
        // Create 25 mock posts and comments.
        for (let iteration = 1; iteration <= count; iteration++) {
            const newComment: CommentInterface = {...seedCommentSource};
            const newPost: PostInterface = {...seedPostSource};
            newComment.author += ` #${iteration}`;
            newComment.comment += ` #${iteration}`;
            newComment.uuid = new ObjectId().toString();
            mockComments.push(newComment);

            newPost.author += ` #${iteration}`;
            newPost.content += ` #${iteration}`;
            newPost.title += ` #${iteration}`; 
            mockPosts.push(newPost);
        }

        const commentsInsertResult: InsertManyResult<Document> = await db.collection('comments').insertMany(
            mockComments
        );
        const postsInsertResult: InsertManyResult<Document> = await db.collection('posts').insertMany(
            mockPosts
        );

        return (
            postsInsertResult.insertedCount === 25 &&
            commentsInsertResult.insertedCount === 25
        );
    }
}

insertMockData(25).then((success) => {
    const consoleMethod = console[success ? 'log' : 'error'];
    const consoleMessage = success
        ? 'Inserted 25 posts and comments successfully!' 
        : 'An error occurred while inserting mock comments and posts.';

    consoleMethod(consoleMessage);
});
