require('dotenv').config();
const { SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const createToken = (username, id) => {
    return jwt.sign({username, id}, SECRET, {expiresIn: '2 days'});
};

module.exports = {
    register: async (req, res) => {
        try {
            let { username, password } = req.body;
            username = username.trim();
            password = password.trim();

            if (username.length === 0) {
                res.status(400).send('Invalid username');
                return;
            }
            
            if (password.length === 0) {
                res.status(400).send('Invalid password');
                return;
            }

            let foundUser = await User.findOne({where: {username: username}});

            if (foundUser) {
                res.status(400).send('That username is already taken');
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const newUser = await User.create({ username: username, hashedPass: hash });
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id);
                const exp = Date.now() + 1000 * 60 * 60 * 48;

                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token: token,
                    exp: exp
                });
            }
        } catch (err) {
            console.log('ERROR IN register');
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    },

    login: async (req, res) => {
        try {
            let { username, password } = req.body;
            username = username.trim();
            password = password.trim();

            if (username.length === 0 || password.length === 0) {
                res.status(400).send('Invalid username or password');
                return;
            }

            let foundUser = await User.findOne({where: {username: username}});

            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.dataValues.hashedPass);

                if (isAuthenticated) {
                    const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id);
                    const exp = Date.now() + 1000 * 60 * 60 * 48;

                    res.status(200).send({
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        token: token,
                        exp: exp
                    });
                } else {
                    console.log(`Incorrect password for user with username ${username}`);
                    res.status(400).send("Invalid username or password");
                }
            } else {
                console.log(`Couldn't find user with username ${username}`);
                res.status(400).send("Invalid username or password");
            }
        } catch (err) {
            console.log('ERROR IN login');
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }
};