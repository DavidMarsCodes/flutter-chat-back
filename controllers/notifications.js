
const Subscription = require('../models/subscription');
const Profile = require('../models/profile');
const User = require('../models/user');

const getProfilesSubscribe = async(req, res) => {


    try {

        const uid = req.params.uid;

        console.log('uid**', uid, )
    
        const subscription = await Subscription
            .find({ club: uid, subscribeAccepted: false, isUpload: true })
        .sort({ createdAt: 'asc' })
    
        console.log('subscription : ',subscription);

        /* messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));
        console.log('messagesUnique: ', messagesUnique);
 */
        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

            console.log('obj!!', obj);
           Profile.findOne({ user: obj.subscriptor }
            )
            .then(item => {


                User.findById(obj.subscriptor 
                    )

                    .then(user => {
                    console.log('item**', item)
    
                    const profile = {
                        name: item.name,
                        lastName: item.lastName,
                        imageHeader: item.imageHeader,
                        imageAvatar: item.imageAvatar,
                        imageRecipe: item.imageRecipe,
                        
                        about: item.about,
                        id: item._id,
                        user: {
                            online: user.online,
                            uid: user._id,
                            email: user.email,
                            username: user.username,
            
                        },
                        messageDate: obj.createdAt,

                        subscribeActive: obj.subscribeActive,
                        subId: obj._id,
                        isUpload: obj.isUpload,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
            
                    }
    
                        profiles.push(profile);
                        resolve();

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
    getProfilesSubscribe
}