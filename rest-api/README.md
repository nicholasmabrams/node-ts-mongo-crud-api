# Sample CRUD API using TypeScript, NodeJS, Express and MongoDB 

## Requirements
* NodeJS 16.13.1 LTS runtime
* MongoDB 5
* NodeJS compatible OS (MacOS, Windows 7+, or any supported Linux Distribution)
* Postman 2.1 (for the Postman endpoint suite in the test/api-testing directory) 

> Other modern versions of the software above should should work too, however this project has only been tested using the above recommended configurations. 

> If you already another modern version of NodeJS listed above installed on your machine, you may find it handy to use Node Version Manager to seamlessly manage switching to and from a variety of NodeJS and NPM versions.

* Download and install [Postman REST API tool](https://www.postman.com/downloads/)

## Installation and first run
This API references the `data-access-layer` in order to function. The DAL must first be built before running `npm install` within the `rest-api` directory. You can also avoid having to remember this by referencing the top-level `README.md` located in the root directory of this repository. If you wish to build the project manually or have an intimate understanding of it, follow the simple steps below:

1. Go into the `data-access-layer` directory, run `npm i`.

2. Come back into the `rest-api` directory, run `npm i`

3. You are now ready to run the API by running the last command needed: `npm start`. 

> If any changes are made to the `data-access-layer` within this project, you must manually rebuild before using this command since the API packages the `data-access-layer` and then references it as a submodule internally.
        
## Testing
> The API associated Postman test suite is located within the `$REPO_PARENT_DIRECTORY/capture-life-assessment/api-testing` directory within this repository.

### Validating functionality when manual testing the REST API
> Navigate to the `$REPO_PARENT_DIRECTORY/capture-life-assessment/*api-testing*` folder, within the context of the Postman API tool and then open up the testing suite using the tool. You will now be able to choose the desired endpoints and send any payloads that you wish with each of the available API methods designated HTTP verb.
