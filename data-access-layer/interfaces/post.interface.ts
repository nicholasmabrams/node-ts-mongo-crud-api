/**
 * @interface PostInterface
 * @property author The original posts author.
 * @property content The original posts content.
 * @property title The original posts title.
 */
export interface PostInterface {
    author: string;
    content: string;
    title: string;
}

/**
 * @interface PostInterface
 * @property author The updated posts author.
 * @property content The updated posts content.
 * @property title The updated posts title.
 */
 export interface PostUpdateInterface {
    author?: string;
    content?: string;
    title?: string;
}
