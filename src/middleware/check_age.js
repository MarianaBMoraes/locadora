import moment from "moment";
import User from "../models/user-model.js";
import Movie from "../models/movie-model.js";

const checkAge = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();
    const birthday_date = user.birthday_date;
    const age = moment().diff(birthday_date, "years");

    const movie = await Movie.findById(req.body.movie_rented).exec();
    const classification = movie.classification;

    let ageRequire = 0;
    switch (classification) {
      case "MAIOR14":
        ageRequire = 16;
        break;
      case "MAIOR16":
        ageRequire = 16;
        break;
      case "MAIOR18":
        ageRequire = 18;
        break;
      default:
        ageRequire = 0;
    }

    if (age < ageRequire) {
      return res.status(403).send({
        message: "Usuário menor de idade, sem permissão para alugar esse filme!",
      });
    }

    req.user.age = age;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export default checkAge;