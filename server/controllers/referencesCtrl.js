const { Reference } = require('../models/reference');

module.exports = {
    getUserReferences: async (req, res) => {
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

    getReference: async (req, res) => {
        try {
            const { id } = req.params;
            const reference = await Reference.findOne({where: {id: id}});

            res.status(200).send(reference);
        } catch (err) {
            console.log('ERROR IN getReference');
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
    },

    editReference: async (req, res) => {
        try {
            const { id, userId, title, description, snippet, notes } = req.body;

            const results = await Reference.update(
                {
                    userId,
                    title,
                    description,
                    snippet,
                    notes
                },
                { 
                    where: {id},
                    returning: true
                }
            );

            console.log("Reference");
            console.log(results[1]);

            res.status(200).send(results[1][0]);
        } catch (err) {
            console.log('ERROR IN editReference');
            console.log(err);
            res.status(500).send('Editing the reference failed!');
        }
    }
};