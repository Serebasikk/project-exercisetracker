module.exports = async function userCreate(req, res) {
    const { mongoose } = req;
    const User = mongoose.user;

    try {

        const result = await User.find().select('_id username');

        return res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};
