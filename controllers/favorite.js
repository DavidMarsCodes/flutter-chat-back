
const { response } = require('express');
const Favorite = require('../models/favorite');


const addFavorite = async (req, res = response) => {
    const { user,
        product,

    } = req.body;


    const uid = user;



    try {

        const likeExist = await Favorite.findOne({ product: product, user: uid });

        if (likeExist) {


            console.log('likeExist', likeExist)

            const updateLike = (likeExist.isLike) ? false : true;

            const update = {

                isLike: updateLike
            };


            const updateok = await Favorite.updateOne(
                {
                    user: uid
                },
                {
                    $set: update
                }
            );

            if (updateok) {


                const favorite = await Favorite.findOne({ product: product, user: uid });

                console.log('favorite', favorite)


                res.json({
                    ok: true,
                    favorite,

                });

            }





        }




        const addFavorite = new Favorite({
            isLike: true,
            user: user,
            product: product
        });

        const favorite = await addFavorite.save();


        console.log('favorite', favorite)


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


