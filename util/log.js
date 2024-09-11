function log(request) {
  console.log(request.baseUrl);
  console.log(request.originalUrl);
  console.log(request.path);
}

module.exports = log;
