/**
 * @description
 * Transpiled copy from DAL from TS -> JS via TSC. 
 * TSC is run with the test command but any changes
 * in the source file (in the data-access-layer) will
 * need a re-run of `npm test` or `tsc` before the
 * test has access to the changes made.
 */
const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require('./bin');

/**
 * @todo In the future, dynamically pull UUID's from DB for 
 * test bed to avoid having to manually grab them based on 
 * the current data available at the time of running the tests.
 */ 
const author = 'Nicholas Abrams';
const commentContent = 'Hey here is a new comment!';
const commentUuid = '61dce43e2d11360eed529cff';
const fakeUuid = 'bad uuid!!!!';
const postContent = 'Hello this is a new post!';
const postTitle = 'New post!';
const postUuid = '61dcd52de4eb9535a6d2a09b';
const testAuthorName = 'Ken Thompson';

/** 
 * @warning Rotate these so deletion tests remain valid.
 * Also make sure this are not used in the UUID's above,
 * they should be unique to prevent false test failures 
 * and avoid collisions.
 */
const commentToDeleteUuid = '61dd102222b6f110f0556db0';
const postToDeleteUuid = '61dd0a79271a0ecfbdd5c4ec';

/**
 * @warning Do not ```declare``` Jest methods if 
 * intellisense breaks. Jest is automatically 
 * available in the global scope, which trips up
 * some IDE's static code analysis (cough, VSCode). 
 */

// Testing positive cases for posts. 
test('Will successfully add a post', () => { 
  return createPost(
    author,
    postContent,
    postTitle).then((success) => {
      expect(success).toBe(true);
  });
});

// Testing positive cases for comments.
test('Will successfully add a comment to a comment', ()=> {
  return createComment(
    author,
    commentContent,
    commentUuid,
  ).then((success) => {
    expect(success).toBe(true);
  });
});

test('Will get a comment by UUID', () => {
  return getComment(commentUuid).then((comment) => {
    expect(!!comment).toBe(true);
  });
});

test('Will update a comment by UUID', () => {
  return updateComment(commentUuid, {author: testAuthorName})
    .then((success) => {
      expect(success).toBe(true);
    });
});

test('Will delete a comment by UUID', () => {
  return deleteComment(commentToDeleteUuid)
    .then((success) => {
      expect(success).toBe(true);
    });
});

test('Will successfully add a comment to a post', ()=> {
  return createComment(
    author,
    commentContent,
    postUuid,
  ).then((success) => {
    expect(success).toBe(true);
  });
});

// Testing positive cases for posts.
test('Will get a post by UUID', () => {
  return getPost(postUuid).then((post) => {
    expect(!!post).toBe(true);
  });
});

test('Will update a post by UUID', () => {
  return updatePost(postUuid, {author: testAuthorName})
    .then((success) => {
      expect(success).toBe(true);
    });
});

test('Will delete a post by UUID', () => {
  return deletePost(postToDeleteUuid)
    .then((success) => {
      expect(success).toBe(true);
    });
});

// Testing negative cases. 
test('Will not add a comment to a post if it is missing an author.', ()=> {
  return createComment(
    undefined,
    commentContent,
    postUuid,
  ).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not add a comment to a post if it is missing content.', ()=> {
  return createComment(
    author,
    undefined,
    postUuid,
  ).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not add a comment to a post if the UUID is invalid.', ()=> {
  return createComment(
    author,
    commentContent,
    fakeUuid,
  ).then((success) => {
    expect(success).toBe(false);
  });
});

test('Will not add a comment to a post if it is missing a UUID.', ()=> {
  return createComment(
    author,
    commentContent,
    undefined,
  ).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not add a post if it is missing a title.', ()=> {
  return createPost(
    author,
    postContent,
    undefined).then((success) => {
  }).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not add a post if it is missing content.', ()=> {
  return createPost(
    author,
    undefined,
    postTitle).then((success) => {
  }).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not add a post if it is missing an author.', ()=> {
  return createPost(
    null,
    postContent,
    postTitle).then((success) => {
  }).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not get a comment by a bad UUID', () => {
  return getComment(fakeUuid)
    .catch((error) => {
      expect(error).toExist();
    });
});

test('Will not update a comment by a bad UUID', () => {
  return updateComment(fakeUuid, {author: testAuthorName})
    .catch((error) => {
      expect(error).toExist();
    });
});

test('Will not delete a comment by a bad UUID', () => {
  return deleteComment(fakeUuid)
    .catch((error) => {
      expect(error).toExist(true);
    });
});

// Posts negative tests. 
test('Will not get a post by a bad UUID', () => {
  return getPost(fakeUuid).catch((error) => {
    expect(error).toExist();
  });
});

test('Will not update a post by bad UUID', () => {
  return updatePost(fakeUuid, {author: testAuthorName})
    .catch((error) => {
      expect(error).toExist();
    });
});

test('Will not delete a post by UUID', () => {
  return deletePost(fakeUuid)
    .catch((error) => {
      expect(error).toExist();
    });
});


// In the real world more negative cases would be here...