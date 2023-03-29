const { Reference } = require('../models/reference');

module.exports = {
    getUserReferences: async (req, res) => {
        console.log("GET USER REFERENCES");

        try {
            const { userId } = req.params;
            const references = await Reference.findAll({
                where: {userId: userId}
            });

            res.status(200).send(references);
        } catch (err) {
            console.log('ERROR IN getUserReferences');
            console.log(err);
            res.sendStatus(400);
        }
    },

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