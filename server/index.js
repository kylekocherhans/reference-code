require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { SERVER_PORT } = process.env

const { sequelize } = require('./util/db');
const { User } = require('./models/user');
const { Reference } = require('./models/reference');
const { register, login } = require('./controllers/authCtrl');
const { addReference } = require('./controllers/referencesCtrl');

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Reference);
Reference.belongsTo(User);

app.post('/api/register', register);
app.post('/api/login', login);

app.post('/api/references', addReference);

// sequelize.sync({ force: true }) // DROPS TABLES
sequelize.sync()
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}!!!`));
    })
    .catch(err => console.log(err));
