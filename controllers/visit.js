const { response } = require('express');
const Visit = require('../models/visit');
const Plant = require('../models/plant');

const createVisit = async (req, res = response) => {
    const {
        user,
        plant,
        description,
        coverImage,
        clean,
        temperature,
        degrees,
        cut,
        water,
        abono,
        electro,
        ph,
        ml,
        mlAbono,

        nameAbono, 
        grams
    } = req.body;





    try {

        const newVisit = new Visit({
            user,
            plant,
            description,
            coverImage,
            clean,
            temperature,
            degrees,
            cut,
            water,
            electro,
            abono,
            ph,
            ml,
            mlAbono,
            nameAbono,
            grams
        });


        const visit = await newVisit.save();





        res.json({
            ok: true,
            visit,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const editVisit = async (req, res = response) => {
    const {
        description,
        coverImage,
        clean,
        temperature,
        degrees,
        cut,
        water,
        electro,
        abono,
        ph,
        ml,
        mlAbono,
        nameAbono,
        grams,
        id
    } = req.body;


    try {

        const updateVisit = {
            description: description,
            coverImage: coverImage,
            clean: clean,
            temperature: temperature,
            degrees: degrees,
            cut: cut,
            water: water,
            abono: abono,
            electro: electro,
            mlAbono: mlAbono,
            nameAbono: nameAbono,
            ph: ph,
            ml: ml,
            grams: grams
        };



        const oupdateVisit = await Visit.updateOne(
            {
                _id: id
            },
            {
                $set: updateVisit
            }
        );

        const visit = await Visit.findOne({ _id: id });



        res.json({
            ok: true,
            visit
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getVisitsById = async (req, res = response) => {

    try {
        const visitId = req.params.id;


        const visit = await Visit
            .findOne({ _id: visitId })


        res.json({
            ok: true,
            visit,
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

const getVisitsByPlant = async (req, res = response) => {

    try {
        const plantId = req.params.id;


        const visits = await Visit
            .find({ plant: plantId })
            .sort('-createdAt')





        res.json({
            ok: true,
            visits,
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


const getVisitsByUser = async (req, res = response) => {

    try {
        const userId = req.params.id;


        const visits = await Visit
            .find({ user: userId })
            .sort('-createdAt')




        res.json({
            ok: true,
            visits,
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

const deleteVisit = async (req, res = response) => {

    try {


        const visitId = req.params.id


        const visit = await Visit.findByIdAndDelete(visitId)


        res.json({
            ok: true,
            msg: 'Eliminado con exito!'
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
    createVisit,
    editVisit,
    getVisitsById,
    getVisitsByPlant,
    getVisitsByUser,
    deleteVisit
}

