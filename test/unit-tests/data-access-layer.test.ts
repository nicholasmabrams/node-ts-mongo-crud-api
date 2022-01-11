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
const commentToDeleteUuid = '61dce6993dcc09c1ee21247e';
const postToDeleteUuid = '61dce43e2d11360eed529cfe';

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
      const consoleMethod = console[success ? 'log' : 'error'];
      const consoleMessage = (
        success
          ? 'New post successful!'
          : 'New post failed!'
      );
    
      consoleMethod(consoleMessage);
      expect(success).toBe(true);
  });
});

// Testing positive cases for comments.
test('Will successfully add a comment to a post', ()=> {
  return createComment(
    author,
    commentContent,
    postUuid,
  ).then((success) => {
    const consoleMethod = console[success ? 'log' : 'error'];
    const consoleMessage = (
      success
        ? 'Matched and updated entity with new comment!'
        : 'No match in posts or comments!'
    );

    if (!success) {
      consoleMethod(consoleMessage);
    }

    expect(success).toBe(true);
  });
});

test('Will successfully add a comment to a comment', ()=> {
  return createComment(
    author,
    commentContent,
    commentUuid,
  ).then((success) => {
    const consoleMethod = console[success ? 'log' : 'error'];
    const consoleMessage = (
      success
        ? 'Matched and updated entity with new comment!'
        : 'No match in posts or comments!'
    );

    if (!success) {
      consoleMethod(consoleMessage);
    }

    expect(success).toBe(true);
  });
});

test('Will get a comment by UUID', () => {

  return getComment(commentUuid).then((comment) => {
    expect(!!comment).toBe(true);
  });
});

test('Will update a comment by UUID', () => {
  return updateComment(commentUuid, {author: testAuthorName}).then((success) => {
    expect(success).toBe(true);
  });
});

test('Will delete a comment by UUID', () => {
  return deleteComment(commentToDeleteUuid).then((success) => {
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
  const testAuthorName = 'Ken Thompson';
  
  return updatePost(postUuid, {author: testAuthorName}).then((success) => {
    expect(success).toBe(true);
  });
});

test('Will delete a post by UUID', () => {
  return deletePost(postToDeleteUuid).then((success) => {
    expect(success).toBe(true);
  });
});

// Testing negative cases. 
test('Will not add a comment to a post if the ID is invalid.', ()=> {
  return createComment(
    author,
    commentContent,
    fakeUuid,
  ).then((success) => {
    const consoleMethod = console[!success ? 'log' : 'error'];
    const consoleMessage = (
      success
        ? 'No new comment was added since an invalid UUID was provided.'
        : `Unexpected! New comment added despite the fact that an 
           invalid UUID provided to createComment().`
    );

    if (success) {
      consoleMethod(consoleMessage);
    }

    expect(success).toBe(false);
  });
});
