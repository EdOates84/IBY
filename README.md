# RESTful APIs for IBY Dashboard

# Database Schema
![Supervisor@2x](https://user-images.githubusercontent.com/46043645/135523334-7ceb080f-0ded-4c83-88e8-0176802b1bc0.png)

# API Workflow/Overview
<!-- ![Supervisor](https://user-images.githubusercontent.com/46043645/135523168-505bb8a8-bc02-4054-ae98-32b499698847.png) -->
![Supervisor@2x (1)](https://user-images.githubusercontent.com/46043645/135523575-b6069325-bb0a-4446-a406-dde18792dc10.png)

# API Endpoints

| Route                                                   	|       Method       	| Description                                                                                                                                                                                                                                           	|
|---------------------------------------------------------	|:------------------:	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| /client_api/accounts/                                   	|      GET, POST     	| POST: Add accounts record in the database with all the data sent in the request body.<br/> GET: Lists all the accounts in the database.                                                                                                               	|
| /client_api/accounts/(str: account_id)                  	| GET, PATCH, DELETE 	| GET: Get the account with account_id sent in the URL.<br/> PATCH: Update the account with account_id sent in URL and data sent in the request body.<br/> DELETE: Delete the account from DB whose account_id matches with the account_id sent in URL. 	|
| /client_api/users/                                      	|      GET, POST     	| POST: Add the user’s record in the database with all the data sent in the request body.<br/> GET: Lists all the users in the database.                                                                                                                	|
| /client_api/users/(str: user_id)                        	| GET, PATCH, DELETE 	| GET: Get the user with user_id sent in the URL.<br/> PATCH: Update the user with user_id sent in URL and data sent in the request body.<br/> DELETE: Delete the user from DB whose user_id matches with the user_id sent in URL.                      	|
| /client_api/app_usages/(str: user_id)                   	|      GET, POST     	| GET: Get the app usages data from DB whose user_id matches with the user_id sent in the URL.<br/> POST: Add app usages record in the database with user_id sent in URL and data sent in the request body.                                             	|
| /client_api/app_usages/                                 	|         GET        	| GET: Lists all the app usages in the database.                                                                                                                                                                                                        	|
| /client_api/facial_emotion/(str: user_id)               	|        POST        	| POST: Add facial emotions record in the database with user_id sent in URL and data sent in the request body.                                                                                                                                          	|
| /client_api/facial_emotion/(str: user_id)?from=?&to=?   	|         GET        	| GET: Get the facial emotions data from DB whose user_id matches with the user_id sent in the URL & between dates(from, to).                                                                                                                           	|
| /client_api/facial_emotion?from=?&to=?                  	|         GET        	| GET: Lists all the facial emotions data whose date lies between the range in the database.                                                                                                                                                            	|
| /client_api/voice_acoustics/(str: user_id)              	|        POST        	| POST: Add voice acoustics record in the database with user_id sent in URL and data sent in the request body.                                                                                                                                          	|
| /client_api/voice_acoustics/(str :user_id)?from=?&to=?  	|         GET        	| GET: Get the voice acoustics data from DB whose user_id matches with the user_id sent in the URL & between date(from, to).                                                                                                                            	|
| /client_api/voice_acoustics?from=?&to=?                 	|         GET        	| GET: Lists all the voice acoustics data whose date lies between the range in the database.                                                                                                                                                            	|
| /client_api/user_emotion_map/(str: user_id)             	|        POST        	| POST: Add user emotion map record in the database with user_id sent in URL and data sent in the request body.                                                                                                                                         	|
| /client_api/user_emotion_map/(str :user_id)?from=?&to=? 	|         GET        	| GET: Get the user emotion map data from DB whose user_id matches with the user_id sent in the URL & between dates(from,to).                                                                                                                           	|
| /client_api/user_emotion_map?from=?&to=?                	|         GET        	| GET: Lists all the user emotion map data whose date lies between the range in the database.                                                                                                                                                           	|
| /client_api/valence_score/(str :user_id)?from=?&to=?    	|         GET        	| GET: Get the valence score data from DB whose user_id matches with the user_id sent in the URL & between dates(from,to).                                                                                                                              	|
| /client_api/valence_score?from=?&to=?                   	|         GET        	| GET: Lists all the valence score data data whose date lies between the range in the database.                                                                                                                                                         	|

# API Documentation

I have used [Postman Collection](https://documenter.getpostman.com/view/15546015/TzedhjiX) for the proper documentation of APIs with examples.


# Usage

## Deployment

This example is made to work with the Serverless Framework dashboard, which includes advanced features such as CI/CD, monitoring, metrics, etc.

In order to deploy with dashboard, you need to first login with:

```
serverless login
```

install dependencies with:

```
npm install
```

and then perform deployment with:

```
serverless deploy
```

## Local development

It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
