
const { response } = require('express');
const PlantProduct = require('../models/plants_product');





const addPlantsInProduct = async (req, res = response) => {

    const { user,
        product,
        plants

    } = req.body;

    try {

        const reorderPlants = []

        plants.map((item, index) => {
            item.position = index;
            reorderPlants.push(item);

        });

        const promises = reorderPlants.map((obj) =>

            new Promise((resolve, reject) => {


                // const plantExists = await PlantProduct.findOne({ product: product, user: user, plant: obj });





                const newPlantofProduct = new PlantProduct({
                    product: product,
                    user: user,
                    plant: obj,

                });


                const plantProduct = await newPlantofProduct.save();

                const plantsProducts = await PlantProduct.find({ product: product, user: user });


            }));
        Promise.all(promises)
            .then(() => {
                return res.json({
                    ok: true,
                    msg: 'plantas en producto con exito!'
                })
            })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



module.exports = {
    addPlantsInProduct
}


