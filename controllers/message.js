
const Message = require('../models/message');
const Profile = require('../models/profile');

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


    try {

        const uid = req.params.uid;

        console.log('uid', uid, )
    
        const messages = await Message.find({
            $or: [{ by: uid } ]
        })
        .sort({ createdAt: 'desc' })
    
        console.log('messages : ',messages);

        messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));
    
    
        console.log('messagesUnique: ', messagesUnique);

        const profiles = [];

        const promises = messagesUnique.map((obj) => 
        
        new Promise((resolve, reject) => {

            console.log('obj!!', obj);
           Profile.findOne({ user: obj.for }, 
            (err, data) => {
                if (err) console.log(err);
                else

                console.log('data**', data)
                    resolve();
            });
        }));
        Promise.all(promises)
            .then((resolve) => {
                console.log("resolve :", resolve);

               return  res.json({
                    ok: true,
                    resolve: profile
                })
            })

    
   
  

  console.log('promises: ', promises)


   

} 
catch (error) {

    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });

}}


module.exports = {
    getChat,
    getProfilesChat
}