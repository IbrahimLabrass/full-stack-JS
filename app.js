const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const crudRoutes = require('./routes/crudRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/crud', crudRoutes);


// Load Swagger
const swaggerDocument = YAML.load('./public/swagger/swagger.yaml');


// Endpoint to serve the Swagger YAML file
app.get('/swagger.yaml', (req, res) => {
  res.sendFile(__dirname + '/public/swagger/swagger.yaml');
});

// Endpoint to serve Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
