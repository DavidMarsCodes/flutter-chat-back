const { response } = require('express');
const Room = require('../models/room');



const createRoom = async (req, res = response) => {
    const { name,
        description,
        wide,
        long,
        tall,
        co2,
        co2Control,
        timeOn,
        timeOff ,
        user} = req.body;

console.log('req.body', req.body)

        const uid = user;

        console.log('uid', uid)


    try {

        const nameExist = await Room.findOne({ name: name, user: uid });

        console.log('nameExist:', nameExist)
        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un room con ese nombre'
            });
        }

        const roomsTotal = await Room.find({ user: user });


        const newRoom = new Room({ 
            name: name, 
            description: description, 
            wide: wide,
            long: long,
            tall: tall,
            co2: co2,
            co2Control: co2Control,
            timeOn: timeOn,
            timeOff: timeOff,
            user: user, 
            position: roomsTotal.length
         });
         console.log('after create: ', newRoom);

       const room = await newRoom.save();

        console.log('room create: ', room);


        res.json({
            ok: true,
            room,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const editRoom = async (req, res = response) => {
    const { name,
        description,
        wide,
        long,
        tall,
        co2,
        co2Control,
        timeOn,
        timeOff ,
        id} = req.body;

    console.log('req.body', req.body)

   


    try {

        const updateRoom = { 
            name: name, 
            description: description, 
            wide: wide,
            long: long,
            tall: tall,
            co2: co2,
            co2Control: co2Control,
            timeOn: timeOn,
            timeOff: timeOff,
           
           
         };

         console.log('after newRoom: ', updateRoom);


       const  uodateRoom = await Room.updateOne(
        {
            _id: id
        },
        {
            $set: updateRoom
        }
    );

            const room = await Room.findOne({ _id: id});

            console.log(room);
         

        res.json({
            ok: true,
            room,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getRoomsById = async (req, res = response) => {

    try {
        const roomId = req.params.id;

        console.log('es:', roomId);

        const room = await Room
            .findOne({ _id: roomId })
           


        console.log('room** ', room)


        res.json({
            ok: true,
            room,
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

const getRoomsByUser = async (req, res = response) => {

    try {
        const userId = req.params.id;

        console.log('es:', userId);

        const rooms = await Room
            .find({ user: userId })
            .sort('position')



        console.log('rooms** ', rooms)


        res.json({
            ok: true,
            rooms,
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

const deleteRoom = async (req, res = response) => {


    try {

        console.log(req.params);

        const roomId = req.params.id

        console.log(roomId);

        const room = await Room.findByIdAndDelete(roomId)

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





const editPositionByRoom = async (req, res = response) => {
    try {

        const onReorderRooms = []

        req.body.rooms.map((item, index) => {                                                          
            item.position = index;
            onReorderRooms.push(item);

        });

        const promises = onReorderRooms.map((obj) => 
        
        new Promise((resolve, reject) => {
            Room.updateOne({ _id: obj.id }, { $set: { position: obj.position } }, 
            (err, data) => {
                if (err) console.log(err);
                else
                    resolve();
            });
        }));
        Promise.all(promises)
            .then(() => {
                return res.json({
                    ok: true,
                    msg: 'Eliminado con exito!'
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
    createRoom,
    editRoom,
    getRoomsById,
    getRoomsByUser,
    deleteRoom,
    editPositionByRoom

}

