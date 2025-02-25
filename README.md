
# Syncit-waitlist-backend

Syncit Waitlist Backend is an Express-based backend service designed to manage user email addresses for the Syncit application waitlist. This backend ensures that users who sign up for early access receive notifications when the Syncit application launches.

SyncIt waitlist is live! 🚀🎵 Join now: [https://syncit.org.in/](https://syncit.org.in/) 🔥


## Features

- 📥 Collects and stores user email addresses securely.
- ✅ Provides an API for adding users to the waitlist.
- 🔍 Ensures email validation before storing.
- 📢 Supports future email notification functionality.

## Technologies Used
- Node.js
- Express.js
- MongoDB (for storing email addresses)
## Local development

- Node.js (>=16.x , LTS preferred)
- npm or yarn
- MongoDB database (if using MongoDB for storage)
- 
## Run Locally

1. Clone the project

```bash
  git clone https://github.com/x15sr71/Syncit-waitlist-backend.git
  cd Syncit-waitlist-backend
```

Go to the project directory

```bash
  cd SyncIt-Backend
```

Install dependencies

```bash
  npm install
````

create a .env similar to .env.example

Ensure your MongoDB database is running.

Start Development Server

````bash
  npm run start
````

Build the Project
````bash
  npm run build
````

