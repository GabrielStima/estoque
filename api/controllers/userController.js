const uuid = require('../utils/uuid');
const cryptography = require('../utils/cryptography');
const authentication = require('../utils/authentication');
const userValidator = require('../validators/usersRoutes');
const authValidator = require('../validators/authRoutes');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.listUsers = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});
        const validateToken = authentication.verifyToken(token);

        if (!token || error || !validateToken) {
            return res.status(401).json({ 
                status: "error",
                error: "Error of autentication"
            });
        } else {
                const response = usersDB.map(item => ({
                    "id":item.id,
                    "firstName":item.firstName,
                    "lastName":item.lastName,
                    "email":item.email,
                    "phone":item.phone,
                    "birthDate":item.birthDate,
                    "occupatio":item.occupation
                }))

                return res.send({
                    status: "success",
                    data: response
                })            
        }
    };
    controller.findUser = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});
        const validateToken = authentication.verifyToken(token);
        const userId = req.params.id;

        if(!userId){
            return res.status(404).json({ 
                status: "error",
                error: "Missing param"
            });
        } else if (!token || error || !validateToken) {
            return res.status(401).json({ 
                status: "error",
                error: "Error of autentication"
            });
        } else {
            const response = usersDB.find(item => {
                if(item.id === userId){
                    return {
                            "id":item.id,
                            "firstName":item.firstName,
                            "lastName":item.lastName,
                            "email":item.email,
                            "phone":item.phone,
                            "birthDate":item.birthDate,
                            "occupatio":item.occupation
                        }
                }
            })

            return res.send({
                status: "success",
                data: response
            })      
        }
    };
    controller.createUser = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});
        const validateToken = authentication.verifyToken(token);

        if (!token || error || !validateToken) {
            return res.status(401).json({ 
                status: "error",
                error: "Error of autentication"
            });
        } else {
            const { error, value } = userValidator.createUser.validate(req.body);
            value.id = uuid.getUuid();
            value.password = cryptography.createHash(value.password);
    
            if (error) {
                return res.status(400).json({ 
                    status: "error",
                    error: error.details[0].message 
                });
              } else {
                return res.send({
                    status: "success",
                    data: value
                })            
              }   
        }     
    }
    controller.updateUser = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});
        const validateToken = authentication.verifyToken(token);
        const userId = req.params.id;

        if(!userId){
            return res.status(404).json({ 
                status: "error",
                error: "Missing param"
            });
        } else if (!token || error || !validateToken) {
            return res.status(401).json({ 
                status: "error",
                error: "Error of autentication"
            });
        } else {
            const { error, value } = userValidator.createUser.validate(req.body);

            if (error) {
                return res.status(400).json({ 
                    status: "error",
                    error: error.details[0].message 
                });
            }else{
                const response = usersDB.find(item => {
                    if(item.id === userId){
                        console.log('achei')      
                    }
                })
            }
        }
    };
    controller.deleteUser = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});
        const validateToken = authentication.verifyToken(token);
        const userId = req.params.id;

        if(!userId){
            return res.status(404).json({ 
                status: "error",
                error: "Missing param"
            });
        } else if (!token || error || !validateToken) {
            return res.status(401).json({ 
                status: "error",
                error: "Error of autentication"
            });
        } else {
            const response = usersDB.find(item => {
                if(item.id === userId){
                    return true
                }
            })

            if(!response){
                return res.status(404).send({
                    status: "fail",
                    data: "ID not found"
                })
            } 

            return res.status(204).send()
        }
    };

    return controller;
}