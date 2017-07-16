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



## Technical design

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
- view as cell: shows only pseudo-unique key (like name for author). This is clickable, and goes to "view as row"
- view as row
    - render HORIZONTAL (table row)
    - render VERTICAL (edit modal/page)
- show attributes a1 (Entity) a2 (Input Field), ...

##### Common Fields are provided as React components in codebase, and extend parent component Field (or rather use composition instead of inheritance). Specific Fields can be defined by manually extending the parent.


#### Tests for
- reducers
- actions