# simplenoteapp

This is a simple note taking application.  

Backend includes using Javascript with ExpressJs and MongoDB, with Mocha/Chai testing libraries.  
Frontend includes using Javascript with ReactJs.  

Hosting includes:
 - MongoDB Atlas (Database), 
 - Google App Engine (Backend API), 
 - GitHub Pages (Frontend) and 
 - Google Cloud Functions (Serverless API).  

The whole of the application is deployed using GitHub Actions.  


## Usage

To run this application, the bare minimum is to have NodeJs and a local MongoDB instance installed.

To run the backend, you would need to create an environment file to connect to the database.
``` bash
## assume root level of repo
touch backend/.env
echo "MONGODB_URI=<DATABASE_URL_HERE>" > backend/.env
```

You can then run the following to boot up the backend. Running automated tests checks for edge cases such as incorrect format of data or invalid path called. The postman collections provided in `backend/postman` can be used to test endpoints present.
``` bash
## assume root level of repo
cd backend
npm install

npm start   ## run backend for manual testing
npm test    ## to run tests
npm run dev ## run backend for manual testing with hot reload
```

To run the frontend, you can run the following.
``` bash
## assume root level of repo
cd frontend
npm install

npm start   ## run frontend for manual testing
```
