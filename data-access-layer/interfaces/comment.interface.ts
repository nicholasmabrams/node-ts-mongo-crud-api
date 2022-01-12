/**
 * @interface CommentInterface
 * @property author The original author of the comment.
 * @property comment The original comment content.
 * @property uuid The associated UUID relating to a post or another comment.
 * @property @optional linkedType For debugging purposes only, allow the 
 *                     comment to be tracked back to it's associated entity
 *                     which should always be either a post of another comment.
 */
export interface CommentInterface {
    author: string;
    comment: string;
    uuid: string;
    linkedType?: 'comment' | 'post';
}

/**
 * @interface CommentInterface
 * @property author The updated author of the comment.
 * @property comment The updated comment content.
 */
 export interface CommentUpdateInterface {
    author?: string;
    comment?: string;
}
