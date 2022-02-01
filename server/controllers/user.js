import User from '../models/user';

//!Get a user
export const getUser = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
      console.log(user);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};
