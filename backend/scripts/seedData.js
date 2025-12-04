const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Category = require("../models/Category");
const Hostel = require("../models/Hostel");

dotenv.config({ path: path.join(__dirname, "../.env") });

if (!process.env.MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is not set in .env file");
  console.error("Please create a .env file in the backend directory with:");
  console.error("MONGODB_URI=mongodb://localhost:27017/original");
  console.error("JWT_SECRET=hcms_jwt_secret_key_2024_secure_random_string_xyz789abc123");
  process.exit(1);
}

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");

    await Category.deleteMany({});
    await Hostel.deleteMany({});

    const categories = [
      { category_id: 1, category_name: "Electricity" },
      { category_id: 2, category_name: "Ethernet" },
      { category_id: 3, category_name: "Plumbing" },
    ];

    await Category.insertMany(categories);
    console.log("Categories seeded successfully");

    const hostels = [
      { hostel_id: 1, hostel_name: "h7" },
      { hostel_id: 2, hostel_name: "h9" },
      { hostel_id: 3, hostel_name: "h14" },
    ];

    await Hostel.insertMany(hostels);
    console.log("Hostels seeded successfully");

    console.log("Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
