
const Message = require('../models/message');
const Profile = require('../models/profile');
const Subscription = require('../models/subscription');
const User = require('../models/user');

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
            $or: [{ by: uid  } ], $or: [{ for: uid  } ]
        })

        
        

     
        console.log('messages : ',messages);

        messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.by.toString()]:cur}),{}));
    

        console.log('messagesUnique: ', messagesUnique);

        const profiles = [];

        const promises = messagesUnique.map((obj) => 
        
        new Promise((resolve, reject) => {

            console.log('obj!!', obj);
           Profile.findOne({ user: obj.by }
            )
            .sort({ updateAt: 'asc' })
            .then(item => {

                console.log('messagesUnique: ', messagesUnique);

                User.findById(obj.by 
                    )

                    .then(user => {
                    console.log('item**', item)

                    const subscription = await Subscription.findOne({
                        $or: [{ subscriptor: uid  } ], $or: [{ club: uid  } ]
                    })
                    .then(() => {


                        console.log('subscription :', subscription)

                        const subscriptionApprove =  (subscription)? subscription.subscriptionApprove : false;
                    
    
                        console.log('subscriptionApprove :', subscriptionApprove)
    
    
                        const profile = {
                            name: item.name,
                            lastName: item.lastName,
                            imageHeader: item.imageHeader,
                            imageAvatar: item.imageAvatar,
                            about: item.about,
                            id: item._id,
                            user: {
                                online: user.online,
                                uid: user._id,
                                email: user.email,
                                username: user.username,
                
                            },
                            subscriptionApprove: subscriptionApprove,
                            message: obj.message,
                            messageDate: obj.createdAt,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt
                
                        }
        
                            profiles.push(profile);
                            resolve();
                    })
    


                });
                
            })
            ;
        }));
        Promise.all(promises)
            .then((resolve) => {
                

                console.log('profiles!!', profiles)
               return  res.json({
                    ok: true,
                    profiles: profiles
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