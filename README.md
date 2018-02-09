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
- foreign rows are not shown. The relevant attributes are joined in the backend, and rendered as Fields.

#### Edit form
- hidden under every row. only one row at a time canbe edited
- add form == edit form, for first "special" row. The Add-row

## Technical design

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


#### Terminology
Distinction between
- Fields
    - text input
    - dropdown select
    - Can be generic or domain-specific
- Entities, that consist of fields


##### Each entity has attributes, rendered by Fields.

##### Each Field has 2 types of rendering:
- display READ_ONLY
- display WRITE


##### Each entity has multiple rendering options:
- render HORIZONTAL (table row)
    - by default all Fields READ_ONLY, unless WRITE specified
- render VERTICAL (edit modal/page)
    - by default all Fields WRITE, unless READ_ONLY specified

##### Common Fields are provided as React components in codebase, and extend parent component Field (or rather use composition instead of inheritance). Specific Fields can be defined by manually extending the parent.


#### Tests for
- reducers
- actions


