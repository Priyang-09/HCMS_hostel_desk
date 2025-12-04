# Configuration Details

## MongoDB Connection
- **URI**: `mongodb://localhost:27017/original`
- **Database Name**: `original`

## JWT Secret Key
- **Generated Key**: `hcms_jwt_secret_key_2024_secure_random_string_xyz789abc123`
- This is used to sign and verify JWT tokens for authentication

## Hostels
The following hostels are seeded in the database:
- h9
- h14
- h100

## Passwords

**Important**: There are NO standard/default passwords in the system.

- Users create their own passwords during signup
- Passwords are currently stored as plain text (for development)
- **For production, you should implement bcrypt hashing** (already imported in the code)

### Password Requirements
- Users can set any password during signup
- No minimum length or complexity requirements are enforced
- Passwords are validated during login by direct comparison

### To Use the System:
1. Create a student account via `/signup` - you'll set your own password
2. Create a staff account via `/signupstaff` - you'll set your own password
3. Use those credentials to login

## Setup Instructions

1. **Create `.env` file** in `hcms-mern/backend/` with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/original
   JWT_SECRET=hcms_jwt_secret_key_2024_secure_random_string_xyz789abc123
   NODE_ENV=development
   ```

2. **Install dependencies**:
   ```bash
   cd hcms-mern/backend
   npm install
   ```

3. **Seed the database**:
   ```bash
   npm run seed
   ```
   This will create:
   - Categories: Electricity, Ethernet, Water-cooler, Plumbing
   - Hostels: h9, h14, h100

4. **Start the server**:
   ```bash
   npm run dev
   ```

## Notes
- Make sure MongoDB is running on your local machine
- The database will be created automatically when you first connect
- The seed script will populate initial data (categories and hostels)

