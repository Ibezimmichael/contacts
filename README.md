# contacts
A contact api with express

## Features

- Create, Read, Update, and Delete (CRUD) operations for contacts.
- Secure API endpoints using JWT authentication.
- Error handling for better user experience.
- Simple and extensible codebase.


## Requirements

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)


## Getting Started

### Installation

Clone the repository:

- git clone https://github.com/Ibezimmichael/contacts.git
- cd contacts
- npm install
- cp .env.example .env
- npm run start


Your API should now be running on http://localhost:5001.

API Endpoints
GET /contacts: Retrieve all contacts.
GET /contacts/:id: Retrieve a specific contact.
POST /contacts: Create a new contact.
PUT /contacts/:id: Update a contact.
DELETE /contacts/:id: Delete a contact.