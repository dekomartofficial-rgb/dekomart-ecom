// Middleware to convert BigInt and numeric strings to Number globally
function bigIntReplacer(key, value) {
  if (typeof value === "string" && !isNaN(value) && value.match(/^\d+$/)) {
    // Convert string to Number if it's within the safe range
    const numValue = Number(value);
    if (numValue <= Number.MAX_SAFE_INTEGER) {
      return numValue;
    } else {
      // If exceeds safe range, convert to BigInt
      return BigInt(value);
    }
  }
  return value;
}

// Middleware to apply conversion globally
const convertBigIntMiddleware = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    // Apply BigInt conversion before sending response
    const convertedData = JSON.parse(JSON.stringify(data, bigIntReplacer));
    originalJson.call(this, convertedData);
  };

  next();
};

module.exports = convertBigIntMiddleware;
