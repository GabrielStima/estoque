module.exports = app => {
    const controller = app.controllers.authController;

    app.route('/api/v1/user/login')
        .post(controller.login);
    app.route('/api/v1/user/validate')
        .post(controller.validateToken);
}