# Basic CRUD Codebase Project - Front end

- React components
- Redux basics with undo
- 1 entity domain
- Basic CRUD screens without style

## Development

- Webpack Dev Server
    - $ npm start

## Production

- Webpack
    - $ npm build


## Terminology
Distinction between
- Input Fields with name and type
    - myFirstName{name: firstname, type:TEXT, value:"Authortje"}
    - myAge{name: age, type:DATE, value:"Authortje"}
- Entities with attributes
    - myAuthor{firstname:myFirstName, age:myAge)

## Functional design

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
    - (audits, performance, graphs, blabla)

#### Undoable
- Navigation
- NOT Crud operations

#### Tables are
- sortable
- paginated



## Technical design

##### Each Entity has attributes, which can be either other Entities, or Input Fields

##### Each Input Field has 2 types of rendering:
- display READ_ONLY
- display WRITE


##### Each entity has multiple types of rendering:
- view as cell: shows only pseudo-unique key (like name for author). This is clickable, and goes to "view as row"
- view as row
    - render HORIZONTAL (table row)
    - render VERTICAL (edit modal/page)
- show attributes a1 (Entity) a2 (Input Field), ...

##### Common Input Fields are provided as React components in codebase, and extend parent component InputField (or rather use composition instead of inheritance). Uncommon Input Fields can be defined by manually inheriting the parent.


#### Tests for
- reducers
- actions