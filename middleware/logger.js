
function logger (request, response, next) {
    console.log(`Logging.....`);
    next();
};

module.exports = logger;