
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

    messagesUnique = [];
    messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));


    console.log('userIdList: ', messagesUnique);
    messagesUnique.forEach(function (item) {

    const profiles = [];

   const profile = await Profile.findOne({_id: item.by })

   if(profile){

    profiles.push(profile);
   }

  });

  console.log('profiles: ', profiles)


    res.json({
        ok: true,
        messages: messages
    })

}

module.exports = {
    getChat,
    getProfilesChat
}