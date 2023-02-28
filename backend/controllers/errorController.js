//handle duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `That ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field });
};

//handle field formatting and empty fields
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    res.status(code).send({ messages: errors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
};

const handleJWTError = (res) => {
  return res.status(401).send("Invalid token. Please log in again!");
};

module.exports = (err, req, res, next) => {
  try {
    console.log("Error Middleware: ", err);
    if (err.name === "ValidationError") {
      return (err = handleValidationError(err, res));
    }
    if (err.code && err.code == 11000) {
      return (err = handleDuplicateKeyError(err, res));
    }
    if (err.name === "JsonWebTokenError") {
      handleJWTError(res);
    } else {
      res.status(err.code).send({ messages: err.message });
    }
  } catch (err) {
    res.status(500).send("An unknown error occurred.");
  }
};
