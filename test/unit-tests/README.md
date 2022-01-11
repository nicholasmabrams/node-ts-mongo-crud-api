# Unit tests
Since the API is tested using Postman, the only portions of code which needed coverage by unit tests are located in the `data-access-layer`.

### Running unit tests 

First, install the unit test dependencies through your terminal like so:

        %> npm i
        
Last, run the transpiler to ship the JS code to the test runner in order to avoid unnecessary complexity within the test bed configuration. Finally, run Jest to process and render the results of the unit tests:
      
      %> npm run test

> Note: The Jest warning for open async operations is not a real issue due to the fact that it is complaining due to the test runner leaving the connection tp `MongoClient` open. This does not happen when running the code within the context of the application since the connection is naturally managed via async, since it gets closed automatically when it is done being used for a request, however this is not the case when being instantiated from within the Jest runtime. Run jest with `--detectOpenHandles` and verify the *non-issue* [Here](https://www.mongodb.com/community/forums/t/where-to-close-db-connection/1368/2).