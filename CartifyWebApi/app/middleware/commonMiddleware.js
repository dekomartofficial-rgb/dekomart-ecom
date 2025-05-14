
// Middleware to convert BigInt and numeric strings to Number globally
function bigIntReplacer(key, value) {
  if (typeof value === "string" && !isNaN(value) && value.match(/^\d+$/)) {
    const numValue = Number(value);
    if (numValue <= Number.MAX_SAFE_INTEGER) {
      return numValue;
    } else {
      return BigInt(value);
    }
  }
  return value;
}

const convertBigIntMiddleware = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    const convertedData = JSON.parse(JSON.stringify(data, bigIntReplacer));
    originalJson.call(this, convertedData);
  };

  next();
};


const convertBigIntRequestMiddleware = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    const convertedBody = JSON.parse(JSON.stringify(req.body, bigIntReplacer));
    req.body = convertedBody;
  }
  next();
};
module.exports = { convertBigIntMiddleware, convertBigIntRequestMiddleware };
