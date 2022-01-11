import { createComment, deleteComment, getComment, updateComment } from "./comments";
import { createPost, getPost, updatePost, deletePost } from "./posts";
export { createComment };
export { getComment };
export { updateComment };
export { deleteComment };
export { createPost };
export { getPost };
export { updatePost };
export { deletePost };
declare const _default: {
    createComment: typeof createComment;
    deleteComment: typeof deleteComment;
    getComment: typeof getComment;
    updateComment: typeof updateComment;
    createPost: typeof createPost;
    getPost: typeof getPost;
    updatePost: typeof updatePost;
    deletePost: typeof deletePost;
};
export default _default;