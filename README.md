# Nicholas Abrams | Sample CRUD API using TypeScript, NodeJS, Express and MongoDB 

##  Introduction
Thanks for your interest, as well as the opportunity to have fun doing what I love!

## Requirements
* NodeJS 16.13.1 LTS runtime
* MongoDB 5
* NodeJS compatible OS (MacOS, Windows 7+, or any supported Linux Distribution)
* Postman 2.1 (for the Postman endpoint suite in the test/api-testing directory) 

> Other modern versions of the software above should should work too, however this project has only been tested using the above recommended configurations. 

> If you already another modern version of NodeJS listed above installed on your machine, you may find it handy to use Node Version Manager to seamlessly manage switching to and from a variety of NodeJS and NPM versions.

* Download and install [Postman REST API tool](https://www.postman.com/downloads/)

## Installation and first run
> In your terminal or command prompt navigate into this projects root directory, install the NPM dependencies and then execute the NodeJS Express application. 

1. Go into the projects top-level/root directory.

        %> cd $REPO_PARENT_DIRECTORY/capture-life-assessment

2. Run `npm run build` in the **top level** directory located within the `$REPO_PARENT_DIRECTORY/capture-life-assessment` on your machines filesystem, in order to install all of the dependencies within the data-access-layer, api and automatically copy the transpiled version of the DAL into the `$REPO_PARENT_DIRECTORY/capture-life-assessment/unit-test` folder. This skips the need to manually traverse the repo into each child directory, understand the architecture or build each module individually.

        %> npm run build
> You only need to run the above `build` command when you first run the project on a machine, make changes to the `data-access-layer`, or when you delete any or all of the `node_modules` directories, and/or run `npm cache clean`. Changes to the API and unit tests will be reflected by just re-running the `npm start` command in the next step.

3. You are now ready to run the project! After performing the above (2) steps, you may start the API by simply running `npm start`! 

        %> npm run start

> If any changes are made to the `data-access-layer` within this project, you must manually rebuild before using this command since the API packages the `data-access-layer` and then references it as a submodule internally.
        
## Testing
> Unit tests (for the DAL), and manual Postman testing (for the API) are located within the `$REPO_PARENT_DIRECTORY/capture-life-assessment/unit-tests` and  the `$REPO_PARENT_DIRECTORY/capture-life-assessment/api-testing`, respectively.

### Running unit tests 
    %> cd $REPO_PARENT_DIRECTORY/capture-life-assessment/unit-tests
    %> npm run test

### Validating functionality when manual testing the REST API

> Navigate to the $REPO_PARENT_DIRECTORY/capture-life-assessment/*api-testing*, within the context of the Postman API tool and then open up the testing suite. You will now be able to choose the desired endpoints and send any payloads that you wish with each of the available API methods designated HTTP verb.
