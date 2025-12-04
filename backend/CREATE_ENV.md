# How to Create .env File

## Quick Fix

The error occurs because the `.env` file doesn't exist. Here's how to create it:

### Option 1: Copy from ENV_SETUP.txt (Windows PowerShell)

```powershell
cd D:\SE_PROJECT\hcms-mern\backend
Copy-Item ENV_SETUP.txt .env
```

### Option 2: Create Manually

1. Navigate to `hcms-mern/backend/` folder
2. Create a new file named `.env` (note the dot at the beginning)
3. Copy and paste this content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/original
JWT_SECRET=hcms_jwt_secret_key_2024_secure_random_string_xyz789abc123
NODE_ENV=development
```

### Option 3: Using Command Line (Windows)

```powershell
cd D:\SE_PROJECT\hcms-mern\backend
@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/original
JWT_SECRET=hcms_jwt_secret_key_2024_secure_random_string_xyz789abc123
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8
```

## Verify

After creating the `.env` file, run:

```powershell
npm run seed
```

You should see:
- MongoDB Connected
- Categories seeded successfully
- Hostels seeded successfully
- Database seeding completed!

