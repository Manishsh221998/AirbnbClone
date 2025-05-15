const Property = require("../../model/property");

class ApiControllerProperty {
  async getAllProperty(req, res) {
    try {
      const data = await Property.find();

      return res.status(200).json({
        status: true,
        totalCount: data.length,
        message: "Property fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error in getAllProperty:", error);
      return res.status(500).json({
        status: false,
        message: "Server error while fetching properties",
        error: error.message,
      });
    }
  }

  async getCategoryList(req, res) {
    try {
      const { field, value } = req.query;

      if (!field || !value) {
        return res.status(400).json({
          status: false,
          message: "Both field and value query parameters are required",
        });
      }

      const data = await Property.aggregate([
        {
          $match: {
            [field]: value,
          },
        },
      ]);

      return res.status(200).json({
        status: true,
        totalCount: data.length,
        message: "Category-wise property fetched successfully",
        data,
      });
    } catch (error) {
      console.error("Error in getCategoryList:", error);
      return res.status(500).json({
        status: false,
        message: "Server error while fetching category properties",
        error: error.message,
      });
    }
  }
}

module.exports = new ApiControllerProperty();
