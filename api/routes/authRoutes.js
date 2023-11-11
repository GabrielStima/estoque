module.exports = app => {
    const controller = app.controllers.authController;

    app.route('/api/v1/user/login')
        .post(controller.login);
}