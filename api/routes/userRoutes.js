module.exports = app => {
    const controller = app.controllers.userController;

    app.route('/api/v1/users')
        .get(controller.listUsers);

    app.route('/api/v1/user')
        .get(controller.findUser);

    app.route('/api/v1/user')
        .post(controller.createUser);
    
    app.route('/api/v1/user')
        .put(controller.updateUser);

    app.route('/api/v1/user')
        .delete(controller.deleteUser);
}