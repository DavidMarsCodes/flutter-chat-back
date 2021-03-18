
const { response } = require('express');
const Favorite = require('../models/favorite');


const addFavorite = async (req, res = response) => {
    const { user,
        product,

    } = req.body;


    const uid = user;



    try {

        const likeExist = await Favorite.findOne({ product: product, user: uid });

        if (likeExist.isLike) {


            const update = {

                isLike: false
            };


            await Favorite.updateOne(
                {
                    for: uid
                },
                {
                    $set: update
                }
            );

            const favorite = await Favorite.findOne({ product: product, user: uid });

            res.json({
                ok: true,
                favorite,

            });



        }




        const addFavorite = new Favorite({
            isLike: true,
            user: user,
            pproduct: product
        });

        const favorite = await addFavorite.save();



        res.json({
            ok: true,
            favorite,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    addFavorite
}


