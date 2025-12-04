const Staff = require("../models/Staff");

const assignStaff = async (categoryId) => {
  try {
    const staff = await Staff.find({ category: categoryId })
      .sort({ count: 1 })
      .limit(1);

    if (staff.length === 0) {
      throw new Error("No staff available for this category");
    }

    await Staff.findByIdAndUpdate(staff[0]._id, {
      $inc: { count: 1 },
    });

    return staff[0]._id;
  } catch (error) {
    throw error;
  }
};

module.exports = assignStaff;
