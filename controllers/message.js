
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

    const uid = req.params.uid;

    console.log('uid', uid, )

    const messages = await Message.find({
        $or: [{ by: uid } ]
    })
    .sort({ createdAt: 'desc' })

    console.log('messages : ',messages);

    userIdList = [];
    userIdList = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));


    console.log('userIdList: ', userIdList);
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