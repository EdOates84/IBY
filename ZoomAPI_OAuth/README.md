# Zoom OAuth Hello World

This is a Hello World app using an OAuth Marketplace App client ID and Secret to create an OAuth token, used to call the Zoom API. 

Follow allong with relevant Zoom OAuth documentation as we set this up: 

1. [OAuth with Zoom](https://marketplace.zoom.us/docs/guides/authorization/oauth/oauth-with-zoom) 
2. [Create an OAuth App](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-oauth-app) 


```bash
cd zoom-oauth-sample-app && npm install 
```

Run server:

```bash
npm run start
```

### Setup dotenv 
Create a `.env` file in which to store your PORT, access credentials, and Redirect URL.

```bash
touch .env
```

Copy the following into this file, which we'll add your own values to:

```
clientID=
clientSecret=
redirectURL=
```

> Remember: Never share or store your client credentials publicly. Your `.env` is included in the `.gitignore` file to ensure these files won't be included in a git workflow.

During the OAuth flow, Zoom will need to know where to redirect a user after they have successfully authenticated and installed the app on their account.


This will generate a forwarding link. Copy this and add it into your `.env` file as the `redirectURL`. Keep ngrok running! If the linkage disconnects, we'll need to readd a new redirectURL.

Example: 

```
redirectURL=https://app-dashboard.imbesideyou.com/
```


## Create an OAuth App on the Zoom App Marketplace

Sign in to the Zoom App Marketplace and [Create an OAuth App](https://marketplace.zoom.us/develop/create?source=devdocs). 

Creating this app will generate your OAuth Client ID and Secret needed to install on your account and get an access token. 

Copy these credentials and add them to your `.env` file.

Example: 

```
clientID=1234567890
clientSecret=13245678901234567890
redirectURL=https://app-dashboard.imbesideyou.com/
```