# placement-cell

Placement Cell Application is a web service that allows users to manage and participate in placement-related activities. It provides endpoints for creating, managing, and viewing placement-related data.

## Table of Contents
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
  
## Features

Create and manage student profiles.
Create and manage company profiles.
Schedule interviews and manage interview details.
View placement statistics and reports.

## Setup

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/placement-cell.git
```

2. Navigate to the project directory:

```bash
cd placement-cell
```

3. Install dependencies:

```bash
npm install
```

4. Set up your MongoDB database.

5. Start the server:

```bash
npm start
```

6. The server should now be running on http://localhost:3000.

## Usage

Use POSTMAN or any other API testing tool to make HTTP requests to the API endpoints.
Create and manage student profiles using the /students/create and /students/:id/update endpoints.
Create and manage company profiles using the /companies/create and /companies/:id/update endpoints.
Schedule and manage interviews using the /interviews/schedule and /interviews/:id/update endpoints.
View details of students, companies, and interviews using the respective GET endpoints.

## Customization

The application can be customized by modifying the existing endpoints or adding new ones. Refer to the code comments for guidance.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Please follow the Contribution Guidelines for details.
