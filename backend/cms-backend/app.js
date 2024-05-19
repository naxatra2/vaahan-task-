const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const entityRoutes = require('./routes/entityRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'cms-frontend', 'build');
app.use(express.static(frontendPath));


app.use('/api', entityRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

db.sequelize.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
