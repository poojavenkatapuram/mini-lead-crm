# Mini Lead CRM (Superleap Backend Assessment)

## Tech Stack
- Node.js + Express: REST API framework
- MongoDB + Mongoose: NoSQL database for flexible lead storage

## Setup Instructions
1. Clone the repository
2. Install dependencies:
   npm install
3. Start MongoDB:
   mongod --dbpath ~/mongodb-data --port 27018 --nounixsocket
4. Run the server:
   npm run dev

## API Endpoints

POST /api/leads  
GET /api/leads  
GET /api/leads/:id  
PUT /api/leads/:id  
DELETE /api/leads/:id  
PATCH /api/leads/:id/status  

Supports filtering:
GET /api/leads?status=NEW

## Status Transition Rules

NEW → CONTACTED → QUALIFIED → CONVERTED  
Any state → LOST (except CONVERTED)  
CONVERTED and LOST are terminal states  

Invalid transitions return 400 errors.

## Design Decisions
- Used service layer for business logic separation
- Implemented status transitions using a controlled state machine
- Centralized validation and error handling

## Future Improvements
- Bulk operations (Level 2)
- Caching layer (Level 3)
- Pagination and search
