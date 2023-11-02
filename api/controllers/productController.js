module.exports = app => {
    const productsDB = app.data.productsDB;
    const controller = {};

    controller.listProducts = (req, res) => res.status(200).json(productsDB);
    controller.findProduct = (req, res) => res.status(200).json(productsDB);
    controller.createProduct = (req, res) => res.status(200).json(productsDB);
    controller.updateProduct = (req, res) => res.status(200).json(productsDB);
    controller.deleteProduct = (req, res) => res.status(200).json(productsDB);

    return controller;
}