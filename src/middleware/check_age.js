import moment from 'moment';
import User from "../models/user-model"

const checkAge = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).exec();
        const birthday_date = user.birthday_date;
        const age = moment().diff(birthday_date, 'years');

        req.user.age = age;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
};

export default checkAge;