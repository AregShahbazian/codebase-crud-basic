# Generic boilerplate code for CRUD web-apps

- ReactJs
- Redux 
- Webpack
- Wiremock stubs
- Jest unit tests
- TestCafe E2E tests

## Development

- Webpack Dev Server
    - $ npm start

- Wiremock stub server
    - $ npm run wiremock
    
- Jest unit tests
    - $ npm run test:watch
    
- Testcafe E2E tests
    - $ npm run testcafe:all
    
## Production

- Webpack
    - $ npm build

#### The user logs in as admin. Depending or his role, the possible pages are shown in menu

### Pages
- Login page
- Profile page
    View and edit user's attributes
- Table A ..Z
    - CRUD page for table
- Table Users
    - CRUD page for users
- (Monitoring pages)
    - (audits, performance, graphs, etc.)

#### JSON Domain

- Author
    - id : int
    - name : string
    - dateOfBirth : date
    - publisher : object 
    - books : list

- Book
    - id : int
    - title : string
    - author : object
    
- Publisher
    - id : int
    - name : string 
    - authors : list 



