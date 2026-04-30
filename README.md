#  Mini Lead CRM Backend

A scalable backend API to manage leads using **Node.js, Express, and MongoDB**, with support for workflows, filtering, and performance optimization.

---

##  Features

### Level 1

* CRUD operations for leads
* Status workflow:
  NEW → CONTACTED → QUALIFIED → CONVERTED (with LOST)
* Validation & error handling

---

### Level 2

* Pagination (page, limit)
* Search (name/email, case-insensitive)
* Filter by status
* Bulk create & bulk delete

---

### Level 3

* Redis caching (optional)
* MongoDB indexing
* Rate limiting

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Redis (optional)

---

## Setup

git clone https://github.com/poojavenkatapuram/mini-lead-crm.git
cd mini-lead-crm
npm install
npm run dev

---

##  Example API

GET /api/leads?page=1&limit=10&search=pooja
POST /api/leads
PATCH /api/leads/:id/status
POST /api/leads/bulk
DELETE /api/leads/bulk

---

##  Key Highlights

* Clean architecture (controller + service pattern)
* Strict status transition logic
* Scalable querying (pagination + filtering)
* Performance improvements using caching & indexing

---

## Notes

* Redis is optional. If not running, the app works without caching
* .env file is not included for security

---

## Author

Pooja Venkatapuram

