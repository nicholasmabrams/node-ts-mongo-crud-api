import{
  createComment,
  deleteComment,
  getComment,
  updateComment
} from "./comments";
import { connectMongo } from "./mongo-singleton";
import {
  createPost,
  getPost,
  updatePost,
  deletePost
} from "./posts";
import { setupJsonSchema } from "./validation";

// Setup basic document-based JSON schemas and validators at the DB level. 
connectMongo()
    .then(async (connection) => {
        await setupJsonSchema(connection);
    })
    .catch((error) => {
     new Error(error);
});

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