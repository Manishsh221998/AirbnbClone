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

  // Update your controller

async getCategoryList(req, res) {
  try {
    const { category } = req.params;
    
    // Convert URL parameter to match enum values (e.g., "amazing-views" → "Amazing views")
    const formattedCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const data = await Property.find({ 
      category: formattedCategory 
    });

    return res.status(200).json({
      status: true,
      totalCount: data.length,
      message: data.length > 0 
        ? "Properties fetched successfully" 
        : "No properties found for this category",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
}
}

module.exports = new ApiControllerProperty();
