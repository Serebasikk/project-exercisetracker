module.exports = async function userCreate(req, res) {
    const User = req.mongoose.user;
    const Exercises = req.mongoose.exercises;
    const { from, to, limit } = req.query;
    const { _id } = req.params;
    const query = { user_id: _id };
    try {

        if (from || to) query.date = {};
        if (from) query.date.$gte = new Date(from);
        if (to) query.date.$lte = new Date(to);

        const user = await User.findOne({ _id });
        const exercisesList = await Exercises.find(query)
            .select('description duration date').limit(limit);

        const result = Object.assign({}, { username: user.username, _id: user._id, count: exercisesList.length });
        result.log = exercisesList.map(exercise => {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
            return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date ? exercise.date.toDateString('en-US', options) : ''
            };
        });

        return res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};
