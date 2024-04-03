module.exports = async function userCreate(req, res) {
    const { username } = req.body;
    const { mongoose } = req;
    const User = mongoose.user;

    try {
        const newUser = await User.create({ username });

        return res.send({
            username: newUser.username,
            _id: newUser._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};
