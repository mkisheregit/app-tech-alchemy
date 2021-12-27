# What is App-tech-alchemy?
```
App-tech-alchemy gives news and weather information in json format.
It fetches data from certain websites and show.
```
# Prerequisites

You should have installed and ready to use apps :
### [Nodejs](https://nodejs.org/en/).
### [Mongoshell](https://www.mongodb.com/try/download/shell).
### MongoDB GUI like [Robo3T](https://www.mongodb.com/try/download/shell).
### Testing platform for APIs [Postman](https://www.postman.com/downloads/).

# Steps For Project Setups

##### 1. Open Project in Code editer.
##### 2. Create .env file in root folder of project
```
Write following code in .env
ACCESS_SECRET_KEY = <type here any string>
REFRESH_SECRET_KEY = <type here another string different to above string>
```
##### 3. Open Command line type 'mongod' and press enter .
```
This will start server for mongoDB
```

### Run following commands :
```
npm install -g nodemon (this will install nodemon globally)
npm i                  (this will install all packages needed)
nodemon index.js       (this will start the node app)
```

### Api Endpoints or Urls

##### http://localhost:3000/auth/sign-up
```
This is POST request.
request body must have 3 parameters
1. email
2. username
3. password

None of 3 should be null
```
##### http://localhost:3000/auth/login
```
This is POST request.
request body must have 2 parameters
1. email
2. password

It will give two tokens on success.
1. accessToken  (You have to use Access token in order to  get access of authenticated urls.
                  it will be invalid/expired after 2 minutes of login)
2. refreshToken  (You have to use Refresh token in order to  regenerate access token after accessToken is expired)
```
##### http://localhost:3000/auth/logout
```
This is DELETE request.
This will make user log out and so user can't use refreshToken to generate accessToken again
```
##### http://localhost:3000/news
```
This is GET request.
This is authenticated url i.e. you can't access it without Authorization. 
set Headers:
            Authorization : Bearer <accessToken>
            
This will give headlines of news in response body (JSON format)
You can use query "seach" and it will give you news around its value
e.g. http://localhost:3000/news?search="politics"
it will give you news of politics.
```
##### http://localhost:3000/weather
```
This is GET request.
This is unauthenticated url i.e. you can access it without Authorization.
It will give you weather forecast of 5 days.
```
##### http://localhost:3000/auth/refreshToken
```
This is POST request.
In request body , there is 1 parameter :

token : <refreshToken>

It will give you new accessToken so we can use accessToken to fetch news again.
This will be expired once logged out.
```







