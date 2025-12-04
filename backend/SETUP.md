# MongoDB Setup Guide

## What You Need to Provide

To connect the application to MongoDB, you need to provide the following information:

### 1. MongoDB Connection String (MONGODB_URI)

**Option A: Local MongoDB**
```
mongodb://localhost:27017/hcms
```

**Option B: MongoDB Atlas (Cloud)**
```
mongodb+srv://username:password@cluster.mongodb.net/hcms?retryWrites=true&w=majority
```

### 2. JWT Secret Key
Any random string for signing JWT tokens (keep it secret!)
Example: `my_super_secret_jwt_key_12345`

### 3. Port (Optional)
Default is 5000, but you can change it if needed.

## Setup Steps

### Step 1: Create `.env` file

In the `backend` folder, create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hcms
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**Replace the values:**
- `MONGODB_URI`: Your MongoDB connection string (see options above)
- `JWT_SECRET`: A random secret string for JWT tokens

### Step 2: Install Dependencies

```bash
cd hcms-mern/backend
npm install
```

### Step 3: Seed Initial Data

Run the seed script to populate categories and hostels:

```bash
npm run seed
```

**Note:** Edit `scripts/seedData.js` to add your actual hostel names before running the seed script.

### Step 4: Start the Server

```bash
npm run dev
```

## MongoDB Options

### Local MongoDB Setup

1. **Install MongoDB** on your machine
2. **Start MongoDB service**
3. Use connection string: `mongodb://localhost:27017/hcms`

### MongoDB Atlas Setup (Cloud - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string and replace username/password
7. Use the connection string in your `.env` file

## Example .env File

```env
PORT=5000
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/hcms?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_12345_change_this_in_production
NODE_ENV=development
```

## Troubleshooting

- **Connection Error**: Make sure MongoDB is running (if local) or your Atlas cluster is accessible
- **Authentication Error**: Check your MongoDB username and password
- **Network Error**: For Atlas, make sure your IP is whitelisted

