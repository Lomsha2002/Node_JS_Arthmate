# Node.js Project

This is a basic Node.js project demonstrating API creation, MongoDB integration, and request handling. The project includes three APIs:

- `/db-save` - Save customer details to the database with validation and deduplication.
- `/time-based-api` - Save customer details to the database with time-based restrictions.
- `/db-search` - Retrieve customer names whose age is between 10 and 25.

## Prerequisites

- **VS Code**: Integrated development environment (IDE).
- **MongoDB Compass**: MongoDB GUI for managing your database.
- **Postman**: Tool for testing API endpoints.
- **Node.js**: JavaScript runtime environment (use LTS version).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Lomsha2002/Node_JS_Arthmate.git
   cd Node_JS_Arthmate
   ```

2. **Install Dependencies**:
   Make sure you have `npm` installed. Run:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory of the project and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://agrawallomsha:<password>@customers.ikf6tdb.mongodb.net/
   ```

4. **Add `.env` to `.gitignore`**:
   Ensure `.env` is included in `.gitignore` to avoid committing sensitive information.

## Usage

1. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8000`.

2. **API Endpoints**:

   ### 1. `/db-save`
   - **Method**: POST
   - **Request Body**:
     ```json
     {
       "customer_name": "arthmate1",
       "dob": "2001-09-19",
       "monthly_income": "1200"
     }
     ```
   - **Description**: Saves customer details to the database with the following checks:
     - All parameters are required.
     - Age must be above 15.
     - Rate limit: Only 1 hit per 2 minutes per customer and 2 hits per 5 minutes.

   - **cURL Command**:
     ```bash
     curl -X POST http://localhost:8000/db-save \
          -H "Content-Type: application/json" \
          -d '{
                "customer_name": "arthmate1",
                "dob": "2001-09-19",
                "monthly_income": "1200"
              }'
     ```

   ### 2. `/time-based-api`
   - **Method**: POST
   - **Request Body**:
     ```json
     {
       "customer_name": "arthmate",
       "dob": "2001-09-19",
       "monthly_income": "1200"
     }
     ```
   - **Description**: Saves customer details to the database with time-based restrictions:
     - API is not available on Mondays.
     - API is not available between 08:00 AM and 03:00 PM every day.

   - **cURL Command**:
     ```bash
     curl -X POST http://localhost:8000/time-based-api \
          -H "Content-Type: application/json" \
          -d '{
                "customer_name": "arthmate",
                "dob": "2001-09-19",
                "monthly_income": "1200"
              }'
     ```

   ### 3. `/db-search`
   - **Method**: GET
   - **Description**: Retrieves customer names whose age is between 10 and 25. The response includes the time taken by the API.

   - **cURL Command**:
     ```bash
     curl -X GET http://localhost:8000/db-search
     ```

## Folder Structure

```
mock-project/
├── index.js
├── db.js
├── .env
├── .gitignore
├── package.json
├── routes/
│   ├── dbSave.js
│   ├── timeBasedApi.js
│   └── dbSearch.js
└── models/
    └── customerDetails.js
```
