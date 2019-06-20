# React JS example using Bootstrap + Axios

React JS example to consume the [spring-boot-rest-jwt-example](https://github.com/salimerid/spring-boot-rest-jwt-example) endpoints.

### What's inside

   - React JS
   - Bootstrap
   - Axios (for API call)
 
 
### Prerequisites

Need to run [spring-boot-rest-jwt-example](https://github.com/salimerid/spring-boot-rest-jwt-example) for backend API.
 
     $ node --version
     v8.0.0
     
     $ npm --version
     6.1.0
    
## Installation

#### Clone project
   
    $ cd PROJECT
    # install dependencies
    $ npm install
    
#### Configure app
      
   - Add the host to /src/api. The default ones are : 
   
    
    baseURL: 'http://localhost:8080'


#### Start & watch
  
    # serve with hot reload at localhost:3000
    $ npm start
    
#### Simple build for production
  
    # build for production with minification
    $ npm run build

#### Functionalities:

   - User registration
   - User login
   - Create a new story
   - Listing of stories with pagination
   - Search Story
   - Updating an existing story
   - Deleting an existing story
