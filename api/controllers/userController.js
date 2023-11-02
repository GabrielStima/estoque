module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.listUsers = (req, res) => res.status(200).json(usersDB);
    controller.findUser = (req, res) => res.status(200).json(usersDB);
    controller.createUser = (req, res) => res.status(200).json(usersDB);
    controller.updateUser = (req, res) => res.status(200).json(usersDB);
    controller.deleteUser = (req, res) => res.status(200).json(usersDB);

    return controller;
}