# BigOooo 

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

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

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
npm i serverless-offline serverless-plugin-typescript serverless-dynamodb-local --save-dev
in serverless.yml
    plugins:
      - serverless-plugin-typescript
      - serverless-offline
      - serverless-dynamodb-local

## Install the local dynamo DB server
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

## Typescript
Initialize the tsconfig file
tsc  --init  (see the tsconfig file for the configuration setting for typescript)

install the lambda types
npm i @types/aws-lambda --save-dev

## Serverless startup
serverless offline start
now all your code will be compiled as you make changes while Lambda is running locally.

## Lambda functions and AWS API Gateway
ass to yml file
functions:
  cost:
    handler: src/handler.cost
    events:
      - http:
          path: cost
          method: post


## Deployment

Before deploying exclude modules that are not needed by adding the following to yml file.

package:
  exclude:
    - node_modules/**/*
  include:
    handler.ts

finally add an endpoint via aws
