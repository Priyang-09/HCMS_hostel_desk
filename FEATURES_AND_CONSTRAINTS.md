# Hostel Complaint Management System - Features & Input Constraints

## 📋 Complete Feature List

### 🔐 Authentication Features

#### Student Authentication
- ✅ Student Signup (Registration)
- ✅ Student Login
- ✅ JWT Token-based Authentication (7-day expiration)
- ✅ Session Management

#### Staff Authentication
- ✅ Staff Signup (Registration)
- ✅ Staff Login
- ✅ JWT Token-based Authentication (7-day expiration)
- ✅ Session Management

### 👤 Student Features

1. **Complaint Management**
   - Submit new complaints
   - View all own complaints
   - Filter complaints by:
     - Date
     - Category (Electricity, Ethernet, Water-cooler, Plumbing)
     - Status (Pending/Completed)
   - Soft delete complaints (delete_by_student flag)
   - View complaint status (Pending/Completed)
   - View assigned staff details (name, phone)
   - View complaint timestamps (created_at, resolved_at)

2. **Profile Management**
   - View profile
   - Edit profile (name, email, phone, hostel, room number)
   - Change password
   - Delete account

### 👨‍💼 Staff Features

1. **Complaint Management**
   - View all assigned complaints
   - Filter complaints by:
     - Date
     - Status (Pending/Completed)
   - Mark complaints as resolved
   - Soft delete complaints (delete_by_staff flag)
   - View student details (name, phone, hostel, room number)
   - View complaint timestamps (created_at, resolved_at)
   - Automatic load balancing (complaints assigned to staff with lowest count)

2. **Profile Management**
   - View profile
   - Edit profile (name, email, phone)
   - Change password
   - Delete account (only if no pending complaints)

### 🤖 Automated Features

1. **Staff Assignment**
   - Complaints automatically assigned to staff based on category
   - Load balancing: Staff with lowest complaint count gets assigned
   - Staff count incremented on assignment
   - Staff count decremented on resolution

2. **Complaint Status Tracking**
   - Automatic timestamp on creation (created_at)
   - Automatic timestamp on resolution (resolved_at)
   - Status: false (pending) → true (resolved)

---

## 🔒 Input Constraints & Validation Rules

### Student Signup (`POST /api/auth/student/signup`)

| Field | Type | Constraints | Required | Unique | Notes |
|-------|------|-------------|----------|--------|-------|
| `id` (student_id) | String | Any string | ✅ Yes | ✅ Yes | Used as login ID |
| `full_name` | String | Any string | ✅ Yes | ❌ No | Student's full name |
| `email` | String | Valid email format | ✅ Yes | ✅ Yes | Must be unique |
| `phone` | String | Any string | ✅ Yes | ❌ No | Contact number |
| `password` | String | Any string | ✅ Yes | ❌ No | Stored as plain text (dev) |
| `hostel` | ObjectId | Must exist in Hostel collection | ✅ Yes | ❌ No | Reference to Hostel |
| `roomno` (room_no) | Number | Any number | ✅ Yes | ❌ No | Room number |

**Validation Rules:**
- `student_id` must be unique (cannot duplicate)
- `email` must be unique (cannot duplicate)
- `hostel` must be a valid MongoDB ObjectId from Hostel collection
- If `student_id` or `email` already exists → Error: "Student already exists"

**Example Valid Input:**
```json
{
  "id": "STU001",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "mypassword123",
  "hostel": "507f1f77bcf86cd799439011",
  "roomno": 101
}
```

---

### Staff Signup (`POST /api/auth/staff/signup`)

| Field | Type | Constraints | Required | Unique | Notes |
|-------|------|-------------|----------|--------|-------|
| `id` (staff_id) | String | Any string | ✅ Yes | ✅ Yes | Used as login ID |
| `full_name` | String | Any string | ✅ Yes | ❌ No | Staff's full name |
| `email` | String | Valid email format | ✅ Yes | ✅ Yes | Must be unique |
| `phone` | String | Any string | ✅ Yes | ❌ No | Contact number |
| `password` | String | Any string | ✅ Yes | ❌ No | Stored as plain text (dev) |
| `category` | ObjectId | Must exist in Category collection | ✅ Yes | ❌ No | Reference to Category |

**Validation Rules:**
- `staff_id` must be unique (cannot duplicate)
- `email` must be unique (cannot duplicate)
- `category` must be a valid MongoDB ObjectId from Category collection
- If `staff_id` or `email` already exists → Error: "Staff already exists"

**Example Valid Input:**
```json
{
  "id": "STAFF001",
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "password": "staffpass123",
  "category": "507f1f77bcf86cd799439012"
}
```

---

### Student Login (`POST /api/auth/student/login`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `id` | String | Must match existing student_id | ✅ Yes | Student ID used during signup |
| `password` | String | Must match stored password | ✅ Yes | Plain text comparison |

**Validation Rules:**
- Student with `id` must exist
- Password must match exactly (case-sensitive)
- If invalid → Error: "Invalid credentials"

**Example Valid Input:**
```json
{
  "id": "STU001",
  "password": "mypassword123"
}
```

---

### Staff Login (`POST /api/auth/staff/login`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `id` | String | Must match existing staff_id | ✅ Yes | Staff ID used during signup |
| `password` | String | Must match stored password | ✅ Yes | Plain text comparison |

**Validation Rules:**
- Staff with `id` must exist
- Password must match exactly (case-sensitive)
- If invalid → Error: "Invalid credentials"

**Example Valid Input:**
```json
{
  "id": "STAFF001",
  "password": "staffpass123"
}
```

---

### Submit Complaint (`POST /api/complaint/student`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `category` | ObjectId | Must exist in Category collection | ✅ Yes | Complaint category |
| `complaint` (description) | String | Any text | ✅ Yes | Complaint description |

**Validation Rules:**
- User must be authenticated (JWT token required)
- `category` must be a valid MongoDB ObjectId from Category collection
- Staff automatically assigned based on category (load balancing)
- Complaint status defaults to `false` (pending)

**Available Categories:**
- Electricity (category_id: 1)
- Ethernet (category_id: 2)
- Water-cooler (category_id: 3)
- Plumbing (category_id: 4)

**Example Valid Input:**
```json
{
  "category": "507f1f77bcf86cd799439013",
  "complaint": "The light in room 101 is not working"
}
```

---

### Filter Complaints (Student: `POST /api/complaint/student/filter`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `datepicker` | String | Date format (YYYY-MM-DD) | ❌ No | Optional date filter |
| `category` | ObjectId/String | Category ID or "None" | ❌ No | Optional category filter |
| `status` | String | "0" (pending), "1" (completed), or "None" | ❌ No | Optional status filter |

**Validation Rules:**
- All fields are optional
- If `category` is "None" or empty → no category filter
- If `status` is "None" or empty → no status filter
- Date filter uses exact date match (start of day to end of day)

**Example Valid Input:**
```json
{
  "datepicker": "2024-01-15",
  "category": "507f1f77bcf86cd799439013",
  "status": "0"
}
```

---

### Filter Complaints (Staff: `POST /api/complaint/staff/filter`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `datepicker` | String | Date format (YYYY-MM-DD) | ❌ No | Optional date filter |
| `status` | String | "0" (pending), "1" (completed), or "None" | ❌ No | Optional status filter |

**Validation Rules:**
- All fields are optional
- Staff cannot filter by category (only see their assigned category)
- Date filter uses exact date match

**Example Valid Input:**
```json
{
  "datepicker": "2024-01-15",
  "status": "1"
}
```

---

### Update Student Profile (`PUT /api/student/profile`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `name` (full_name) | String | Any string | ✅ Yes | Student's full name |
| `email` | String | Valid email format | ✅ Yes | Must be unique (if changed) |
| `contact` (phone) | String | Any string | ✅ Yes | Contact number |
| `hostel` | ObjectId | Must exist in Hostel collection | ✅ Yes | Reference to Hostel |
| `room` (room_no) | Number | Any number | ✅ Yes | Room number |

**Validation Rules:**
- User must be authenticated
- `email` must be unique (if changed to existing email → error)
- `hostel` must be a valid MongoDB ObjectId

**Example Valid Input:**
```json
{
  "name": "John Updated",
  "email": "johnnew@example.com",
  "contact": "1111111111",
  "hostel": "507f1f77bcf86cd799439011",
  "room": 202
}
```

---

### Update Staff Profile (`PUT /api/staff/profile`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `name` (full_name) | String | Any string | ✅ Yes | Staff's full name |
| `email` | String | Valid email format | ✅ Yes | Must be unique (if changed) |
| `contact` (phone) | String | Any string | ✅ Yes | Contact number |

**Validation Rules:**
- User must be authenticated
- `email` must be unique (if changed to existing email → error)
- Category cannot be changed

**Example Valid Input:**
```json
{
  "name": "Jane Updated",
  "email": "janenew@example.com",
  "contact": "2222222222"
}
```

---

### Change Password (Student/Staff: `POST /api/student/change-password` or `POST /api/staff/change-password`)

| Field | Type | Constraints | Required | Notes |
|-------|------|-------------|----------|-------|
| `old_password` | String | Must match current password | ✅ Yes | Current password |
| `new_password` | String | Any string | ✅ Yes | New password |
| `confirm_password` | String | Must match new_password | ✅ Yes | Confirm new password |

**Validation Rules:**
- `old_password` must match current password exactly
- `new_password` must match `confirm_password` exactly
- `new_password` must be different from `old_password`
- If validation fails:
  - "Incorrect account password" (old password wrong)
  - "Please make sure confirm password matches..." (mismatch)
  - "Please choose a different password" (same as old)

**Example Valid Input:**
```json
{
  "old_password": "oldpass123",
  "new_password": "newpass456",
  "confirm_password": "newpass456"
}
```

---

### Delete Account

#### Student (`DELETE /api/student/account`)
- ✅ No constraints (can delete anytime)
- ✅ All associated complaints remain in database

#### Staff (`DELETE /api/staff/account`)
- ❌ **Cannot delete if pending complaints exist**
- ✅ Can delete only if all assigned complaints are resolved (status = true)
- Error if pending: "Cannot delete account, please complete pending requests."

---

## 📊 Data Types Summary

### ID Fields
- **student_id**: String (unique, required)
- **staff_id**: String (unique, required)
- **category_id**: Number (unique, required) - Auto-incremented
- **hostel_id**: Number (unique, required) - Auto-incremented

### Reference Fields (MongoDB ObjectIds)
- **hostel**: References Hostel collection
- **category**: References Category collection
- **student**: References Student collection (in Complaint)
- **staff**: References Staff collection (in Complaint)

### Status Fields
- **status**: Boolean (false = pending, true = resolved)
- **delete_by_student**: Number (0 = active, 1 = deleted)
- **delete_by_staff**: Number (0 = active, 1 = deleted)
- **count**: Number (staff complaint count, default: 0)

### Date Fields
- **created_at**: Date (auto-set on creation)
- **resolved_at**: Date (set when status changes to true)

---

## ⚠️ Important Notes

1. **No Length Constraints**: Currently, there are NO maximum length restrictions on:
   - student_id, staff_id (can be any string)
   - full_name, email, phone (can be any string)
   - password (can be any string)
   - description (can be any text)

2. **No Format Validation**: 
   - Email format is not validated (only uniqueness checked)
   - Phone number format is not validated
   - Password strength is not enforced

3. **Password Security**:
   - Passwords stored as plain text (development only)
   - Should implement bcrypt hashing for production

4. **Unique Constraints**:
   - student_id: Must be unique across all students
   - staff_id: Must be unique across all staff
   - email: Must be unique across students AND staff (separate collections)

5. **Required Fields**: All fields marked as "required" in the schema must be provided, otherwise MongoDB will throw a validation error.

---

## 🎯 Example Valid IDs

### Student ID Examples:
- `"STU001"`
- `"2024CS001"`
- `"student123"`
- `"S-2024-001"`
- Any string (no format restriction)

### Staff ID Examples:
- `"STAFF001"`
- `"EMP2024"`
- `"staff123"`
- `"S-ELEC-001"` (for electricity staff)
- Any string (no format restriction)

### Category IDs (Pre-seeded):
- `1` - Electricity
- `2` - Ethernet
- `3` - Water-cooler
- `4` - Plumbing

### Hostel IDs (Pre-seeded):
- `1` - h9
- `2` - h14
- `3` - h100

