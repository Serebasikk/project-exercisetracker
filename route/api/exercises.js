module.exports = async function userCreate(req, res) {
    const { description, duration, date } = req.body;
    const { _id } = req.params;
    const { mongoose } = req;
    const User = mongoose.user;
    const Exercises = mongoose.exercises;
    try {
        const newDate = date ? new Date(date) : new Date();

        const newExercises = await Exercises.create(
            {
                user_id: _id, description, duration, date: newDate
            });

        const user = await User.findOne({ _id });

        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };

        const formattedDate = newDate.toDateString('en-US', options);

        return res.send({
            username: user.username,
            description: description,
            duration: duration,
            date: formattedDate,
            _id: newExercises._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};
