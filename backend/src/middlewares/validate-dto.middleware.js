const { StatusCodes } = require("http-status-codes");
const { z } = require("zod");

// Validate a DTO against a Zod schema
// If the DTO is invalid, it returns a 400 response with the error details
// If an unexpected error occurs, it returns a 500 response
function validateDto(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server error" });
      }
    }
  };
}

module.exports = { validateDto };
