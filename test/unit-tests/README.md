# Unit tests
Since the API is tested using Postman, the only portions of code which remain to be covered by unit tests are the data access layer.

## Running tests
First, install the unit test dependencies through your terminal like so:

        %> npm i
        
Last, run the transpiler to ship the JS code to the test runner in order to avoid unnecessary complexity within the test bed configuration and if everything goes according to plan - run Jest to process and repost the evaluated unit tests:
      
      %> npm run test

> Note: The Jest warning for open async operations is not a real issue due to the fact that it is complaining due to the test runner leaving the connection via MongoClient open. This does not happen when running the code via async since it is collected automatically within this context, but not when being called from Jest. Run jest with `--detectOpenHandles` and verify the non-issue [https://www.mongodb.com/community/forums/t/where-to-close-db-connection/1368/2](Here)