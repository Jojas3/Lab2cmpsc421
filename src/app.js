// Load environment variables immediately
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order System API',
      version: '1.0.0',
      description: 'API for managing customers and orders',
    },
    servers: [
      { url: 'host.docker.internal:3001' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
