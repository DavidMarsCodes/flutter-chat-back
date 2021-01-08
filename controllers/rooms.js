const { response } = require('express');
const Room = require('../models/room');
const Profile = require('../models/profile');

var async = require('async');


const createRoom = async (req, res = response ) => {
    const { description, name, id } = req.body;
  
    console.log('id! ', id)
    try {

        const nameExist = await Room.findOne({name: name, user:id });

        console.log('nameExist:', nameExist)
        if( nameExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un room con ese nombre'
            });
        }

        const roomsTotal = await Room.find({user:id})
      

        const room = new Room( {name: name, description: description, user: id, position: roomsTotal.length });

        
        await room.save();

        console.log('room create: ', room)


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

const getRoomsByUser = async ( req, res = response ) => {

    try {
    const userId = req.params.id;

    console.log('es:',userId);

    const rooms = await Room
        .find({ user: userId })
        .sort('position')



    console.log('rooms ', rooms)

    
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

const deleteRoom = async (req, res = response ) => {


    try{

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





const editPositionByRoom = async (req, res = response ) => {
    try {

        console.log(req.body.userId);

        const NewOrderrooms =  [] 


        req.body.rooms.map((item, index) => {
            item.position = index;
            NewOrderrooms.push(item);
            
        });

        console.log('NewOrderrooms**', NewOrderrooms);
       // Room.deleteMany({user: req.body.userId});

       var updates = await NewOrderrooms.map((item) => {

        console.log('obj', item)
            Room.updateOne({ "_id": item._id }, {"$set": { "position": item.position }});       
    });
    
  

/* 
        NewOrderrooms.forEach((item, index) => {
        console('item ', item);
        Room.updateOne({"id": item.id}, {"$set": {"position": index }}, callback);
        })  */
    
  
/* 
       const rooms = await Room.find({ user: req.body.userId })
        .forEach(function (doc) {

            console('doc:', doc);
            doc.rooms.forEach(function (room, index) {
            room.position  = index
        });
         Room.save(doc);
  }); 

  console.log(rooms); */
 

        async.eachSeries(NewOrderrooms, function(obj, done) {
            // Model.update(condition, doc, callback)
            console.log('obj*', obj)
            Room.updateOne({ _id: obj.id }, { $set : { position: obj.position }}, done);

          
        }, function allDone (err) {
            // this will be called when all the updates are done or an error occurred during the iteration
        });
    /*     
      NewOrderrooms.forEach((item, index) =>  {

            console.log(item, index);
            item.position = index;

            const room =  await Room.updateOne(
                {
                  id: item.id
                },
                {
                  $set: {
                    position: item.position,
                    
                  }
                }
              ) 

        }); */

    

          res.json({
            ok: true,
            msg: 'Success position!',
            //room

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
    getRoomsByUser,
    deleteRoom,
    editPositionByRoom

}

