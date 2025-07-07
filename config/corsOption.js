const allowOrigins = require('./allowedOrigin');

const corsOption = {
    origin: (origin, callback) => {
        if (allowOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',  // Specify allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

module.exports = corsOption;    