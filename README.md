## nodejs-task-3

# Simple CRUD API
---
### How to start 
1. clone the repository
2. go to this project folder
3. go to the development branch: **git checkout task-3**
4. run **npm install**
5. start the server in one of the ways:
  * Production: **npm run start:prod**
  * Development: **npm run start:dev**

### Use
1. to check the server operation, use the Postman application (port number - 8000 - is specified in the .env file)
2. to run the tests use the command **npm run test**

### API path /person:
* GET **/person** or **/person/${personId}** - to return all persons or person with corresponding personId
* POST **/person** is used to create record about new person and store it in database
* PUT **/person/${personId}** is used to update record about existing person
* DELETE **/person/${personId}** is used to delete record about existing person from database
