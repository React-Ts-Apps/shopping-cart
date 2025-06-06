
import app from './app.js';
import 'dotenv/config';

// Handle uncaught exceptions immediately
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server closing due to uncaught exception');
    process.exit(1);
});


const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server closing due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    });
});
