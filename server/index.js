require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { SERVER_PORT } = process.env
const { sequelize } = require('./util/db');
const { User } = require('./models/user');
const { Reference } = require('./models/reference');

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Reference);
Reference.belongsTo(User);

const { register, login } = require('./controllers/authCtrl');
const { getUserReferences, getReference, addReference, editReference, deleteReference } = require('./controllers/referencesCtrl');
const { isAuthenticated } = require('./middleware/isAuthenticated');

app.post('/api/register', register);
app.post('/api/login', login);

app.get('/api/userReferences/:userId', isAuthenticated, getUserReferences);
app.get('/api/references/:id', isAuthenticated, getReference);
app.post('/api/references', isAuthenticated, addReference);
app.put('/api/references', isAuthenticated, editReference);
app.delete('/api/references/:id', isAuthenticated, deleteReference);

// sequelize.sync({ force: true }) // DROPS TABLES
sequelize.sync()
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}!!!`));
    })
    .catch(err => console.log(err));
