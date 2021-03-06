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

    console.log('req.body', req.body)

    const uid = user;
    const plantid = plant;

    console.log('uid', uid)
    console.log('plantid', plantid)


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

        console.log('after create: ', newVisit);

        const visit = await newVisit.save();



        console.log('Visit create: ', visit);


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

    console.log('req.body', req.body)

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

        console.log('after updateVisit: ', updateVisit);


        const oupdateVisit = await Visit.updateOne(
            {
                _id: id
            },
            {
                $set: updateVisit
            }
        );

        const visit = await Visit.findOne({ _id: id });

        console.log(visit);


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

        console.log('visitId:', visitId);

        const visit = await Visit
            .findOne({ _id: visitId })

        console.log('visit** ', visit)

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

        console.log('plantId:', plantId);

        const visits = await Visit
            .find({ plant: plantId })
            .sort('-createdAt')



        console.log('visits** ', visits)


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

        console.log('userId:', userId);

        const visits = await Visit
            .find({ user: userId })
            .sort('-createdAt')



        console.log('visits** ', visits)


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

        console.log(req.params);

        const visitId = req.params.id

        console.log(visitId);

        const visit = await Visit.findByIdAndDelete(visitId)

        console.log("visit: ", visit);

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

