module.exports = app => {
    const controller = app.controllers.customerController;

    app.route('/api/v1/customers')
        .get(controller.listCustomers);

    app.route('/api/v1/customer/:id')
        .get(controller.findCustomer);

    app.route('/api/v1/customer')
        .post(controller.createCustomer);
    
    app.route('/api/v1/customer/:id')
        .patch(controller.updateCustomer);

    app.route('/api/v1/customer/:id')
        .delete(controller.deleteCustomer);
}