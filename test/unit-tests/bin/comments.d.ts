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
export declare function createComment(author: string, comment: string, associatedUuid: string): Promise<boolean>;
export declare function getComment(uuid: string): Promise<false | import("mongodb").WithId<import("bson").Document> | null>;
export declare function deleteComment(uuid: string): Promise<boolean>;
export declare function updateComment(uuid: string, updatedCommentDetails: {
    author?: string;
    content?: string;
}): Promise<boolean>;
