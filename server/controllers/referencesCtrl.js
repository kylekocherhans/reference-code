const { Reference } = require('../models/reference');

module.exports = {
    addReference: async (req, res) => {
        try {
            const { userId, title, description, snippet, notes } = req.body;

            await Reference.create({
                userId,
                title,
                description,
                snippet,
                notes
            });

            res.sendStatus(200);
        } catch (err) {
            console.log('ERROR IN addReference');
            console.log(err);
            res.status(500).send('Adding the reference failed!');
        }
    }
};