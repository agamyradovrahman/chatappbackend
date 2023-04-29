const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: "https://polite-sunshine-4d436e.netlify.app",
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;