
const Message = require('../models/message');
const profile = require('../models/profile');

const getChat = async(req, res) => {

    const miId = req.uid;
    const messageBy = req.params.by;

    console.log('miId', miId, 'messageBy', messageBy)

    const last30 = await Message.find({
        $or: [{ by: miId, for: messageBy }, { by: messageBy, for: miId } ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        messages: last30
    })

}

const getProfilesChat = async(req, res) => {

    const miId = req.uid;
    const messageBy = req.params.by;

    console.log('miId', miId, 'messageBy', messageBy)

    const messages = await Message.find({
        $or: [{ by: miId } ]
    })
    .sort({ createdAt: 'desc' })

    console.log('messages : ',messages);
/*   messages.forEach(function (item) {

    const profiles = [];

   const profile = await Profile.findOne({_id: item.by })

   if(profile){

    
   }

  }); */


    res.json({
        ok: true,
        messages: messages
    })

}

module.exports = {
    getChat,
    getProfilesChat
}