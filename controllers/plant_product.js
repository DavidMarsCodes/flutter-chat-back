
const { response } = require('express');
const PlantProduct = require('../models/plants_product');
const Plant = require('../models/plant');




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


const getPlantsByProduct = async (req, res = response) => {

    try {
        const productId = req.params.id;


        const plantsProduct = await PlantProduct
            .find({ product: productId })

        console.log('plantsProduct', plantsProduct)

        const plants = []

        const promises = plantsProduct.map((plantProduct) =>

            new Promise((resolve, reject) => {



                Plant.findById(plantProduct.plant)
                    .then((plant) => {
                        console.log('plant', plant);


                        const plantPosition = {

                            id: plant._id,
                            user: plant.user,
                            room: plant.room,
                            name: plant.name,
                            createdAt: plant.createdAt,
                            updatedAt: plant.updatedAt,
                            description: plant.description,
                            quantity: plant.quantity,
                            germinated: plant.germinated,
                            flowering: plant.flowering,
                            pot: plant.pot,
                            cbd: plant.cbd,
                            thc: plant.thc,
                            coverImage: plant.coverImage,
                            position: plantProduct.position,

                        }
                        plants.push(plantPosition);
                        resolve()





                    })



            }))

        Promise.all(promises)
            .then((resolve) => {




                const plantsPosition = plants.sort((a, b) => {

                    return (b.position) - (a.position);
                });

                console.log('plantsPosition', plantsPosition)


                res.json({
                    ok: true,
                    plants: plantsPosition,
                })
            })




    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {

    getPlantsByProduct
}


