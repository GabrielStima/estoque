module.exports = app => {
    const controller = app.controllers.productController;

    app.route('/api/v1/products')
        .get(controller.listProducts);

    app.route('/api/v1/product')
        .get(controller.findProduct);

    app.route('/api/v1/product')
        .post(controller.createProduct);
    
    app.route('/api/v1/product')
        .put(controller.updateProduct);

    app.route('/api/v1/product')
        .delete(controller.deleteProduct);
}