export const validate = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
        console.log(" Validation Error:", error.issues);
      if (error.issues) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        }));
  
        return res.status(400).json({
          success: false,
          errors: errorMessages,
        });
      }
  
      return res.status(400).json({
        success: false,
        message: "Validation failed",
      });
    }
  };