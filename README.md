# BigOooo 

- This is a work in progress...  

- Uses Angular with Material design for front end and Amazon's lambda, API Gateway and Dynamo DB for backend. The backend is managed using the serverless toolkit. Obvioulsy GIT as a source control tool.

- http://bigoooo.com

## How to get running on your local machine

- Need serverless installed (https://www.npmjs.com/package/serverless)
- npm install -g serverless

```
git clone https://github.com/fpiergen/bigoooo.git
cd bigoooo
npm install
cd ../serverless
npm install
sls dynamodb install
sls offline start
Go to browser and open up DynamoDB Javascript shell to create a table entry in the local DynamoDB table.
(I could not get this to seed automatically via a json file so it needs to be done manually each time you restart serverless offline)
http://localhost:8000/shell/
insert the following javascript and run
var params = {
TableName: 'TaperedStoneWall',
           Item: { // a map of attribute name to AttributeValue

name: 'Simple Straight',
      rate: 80
          // attribute_value (string | number | boolean | null | Binary | DynamoDBSet | Array | Object)
          // more attributes...
           },
ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
              ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
              ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
};
docClient.put(params, function(err, data) {
        if (err) ppJson(err); // an error occurred
        else ppJson(data); // successful response
        });
Go to another window
cd gui
npm start
Go to browser
http://localhost:4100

Everyting should be working. Changed server or gui code will be compiled automatically.
*** Any Changes to the serverless.yml file will require a serverless offline restart ***
```

# DEVELOPMENT

The following are development notes. I should probably put this all in a project tab.

# GUI

## How generated 
- This gui was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.
To start the project

```
ng new PROJECT-NAME
cd PROJECT-NAME
ng serve
```

Then used https://material.angular.io/guide/getting-started
To integrate in Material Design


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

TODO Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). 

## Running end-to-end tests

TODO Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# SERVERLESS


## How generated 
followed this
https://blog.shovonhasan.com/deploying-a-typescript-node-aws-lambda-function-with-serverless/

Below assumes you have an access_key and secret_key to amazon in you home directory aws config

## Create serverless template and initialize npm
npm i serverless -g
mkdir bigOooo && cd bigOooo
serverless create --template aws-nodejs
npm init

## Add in plugins

```
npm i serverless-offline serverless-plugin-typescript serverless-dynamodb-local --save-dev
in serverless.yml
    plugins:
      - serverless-plugin-typescript
      - serverless-offline
      - serverless-dynamodb-local
```

## Install the local dynamo DB server

```
serverless dynamodb install

Included following in yml so it starts when offline is started
migrate set to true will create table in resources
see https://www.npmjs.com/package/serverless-dynamodb-local for more info

custom:
  dynamodb:
   start:
     port: 8000
     inMemory: true
     migrate: true

resources:
  Resources:
    BigOoooData:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: TaperedStoneWall
        AttributeDefinitions:
            - AttributeName: name
              AttributeType: S
        KeySchema:
            - AttributeName: name
              KeyType: HASH
        ProvisionedThroughput:
            ReadCapacityUnits: 1
            WriteCapacityUnits: 1

```
## Typescript
Initialize the tsconfig file
```
tsc  --init  (see the tsconfig file for the configuration setting for typescript)

install the lambda types
npm i @types/aws-lambda --save-dev

```

## Serverless startup

```
serverless offline start
```
Now all your code will be compiled as you make changes while Lambda is running locally.

## Lambda functions and AWS API Gateway
Add to yml file
```
functions:
  cost:
    handler: src/handler.cost
    events:
      - http:
          path: cost
          method: post
```


## Deployment

Before deploying exclude modules that are not needed by adding the following to yml file.

```
package:
  exclude:
    - node_modules/**/*
  include:
    handler.ts
```

- Needed to include header Access-Control-Allow-Origin='*' in Angular's httpClient.post method in order for CORS to work with AWS API Gateway using a Lambda proxy.
- Added authorization to allow querying of Dynamo DB table from lambda function ( see serverless.yml ).
- Used environment variable on GUI to switch from localhost to deployed API endpoint.
- Used SLS_OFF_LINE environment variable to switch from localhost DYNAMO to AWS Dynamo.
- To deploy:  sls deploy
- To remove:  sls remove


