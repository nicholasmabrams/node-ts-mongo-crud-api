import{
  createComment,
  deleteComment,
  getComment,
  updateComment
} from "./comments";
import {
  createPost,
  getPost,
  updatePost,
  deletePost
} from "./posts";

// Named exports.
export {createComment};
export {getComment};
export {updateComment};
export {deleteComment};
export {createPost};
export {getPost};
export {updatePost};
export {deletePost};

// Unnamed/default exports.
export default {
  createComment,
  deleteComment,
  getComment,
  updateComment,
  createPost,
  getPost,
  updatePost,
  deletePost
}