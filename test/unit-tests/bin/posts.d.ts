/**
 * @function createPost Adds a new post the the "post" document to
 *                      the posts collection.
 * @param title The title of the post.
 * @param author The author of the post.
 * @param content The body content of the post.
 */
export declare function createPost(author: string, content: string, title: string): Promise<boolean | undefined>;
export declare function getPost(uuid: string): Promise<false | import("mongodb").WithId<import("bson").Document> | null>;
export declare function updatePost(uuid: string, updatedPostDetails: {
    author?: string;
    content?: string;
    title?: string;
}): Promise<boolean>;
export declare function deletePost(uuid: string): Promise<boolean>;
