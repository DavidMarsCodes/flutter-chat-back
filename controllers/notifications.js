
const Subscription = require('../models/subscription');
const Profile = require('../models/profile');
const User = require('../models/user');

const getProfilesSubscriptorsByClub = async(req, res) => {


    try {

        const uid = req.params.uid;

        const myprofile = await Profile.findOne({ user:  uid })


        const isClub = myprofile.isClub;

       console.log('isclubbb', isClub)


        if(isClub){
        const subscription = await Subscription
            .find({ club: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })
            
        

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.subscriptor }
            )
            .then(item => {


                if(item.user._id != uid){

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
                        messageDate: obj.updatedAt,

                        subscribeActive: obj.subscribeActive,
                        subscribeApproved: obj.subscribeApproved,
                        subId: obj._id,
                        isUpload: obj.isUpload,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
            
                    }
    
                        profiles.push(profile);
                        resolve();

                });

            }

            else {
               
                resolve();
            }
                
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

        
        }

        else {

            const subscription = await Subscription
            .find({ subscriptor: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })

        subscription = res;

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.subscriptor }
            )
            .then(item => {



                if(item.user._id != uid){

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
                        messageDate: obj.updatedAt,

                        subscribeActive: obj.subscribeActive,
                        subscribeApproved: obj.subscribeApproved,
                        subId: obj._id,
                        isUpload: obj.isUpload,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
            
                    }
                    console.log('toPush!!***!!', profile)

                        profiles.push(profile);
                        resolve();

                });

            }

            else {
               
                resolve();
            }
                
            })
            ;
        }));
        Promise.all(promises)
            .then((resolve) => {
                

                console.log('profiles***!!', profiles)
               return  res.json({
                    ok: true,
                    profiles: profiles
                })
            })

        }

   

        /* messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));
        console.log('messagesUnique: ', messagesUnique);
 */
       

    
   
  



   

} 
catch (error) {

    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });

}}



const getProfilesSubscriptorsPendingByClub = async(req, res) => {


    try {

        const uid = req.params.uid;

    
        const subscription = await Subscription
            .find({ club: uid, subscribeApproved: false, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })
    

        /* messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));
        console.log('messagesUnique: ', messagesUnique);
 */
        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

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
                        messageDate: obj.updatedAt,

                        subscribeActive: obj.subscribeActive,
                        subscribeApproved: obj.subscribeApproved,
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
                

                console.log('profiles sub!!!!!', profiles)
               return  res.json({
                    ok: true,
                    profiles: profiles
                })
            })




   

} 
catch (error) {

    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });

}}

const getClubSubscriptionBySubid = async(req, res) => {


    try {

        const subid = req.params.subid;

    
        const subscription = await Subscription
            .find({ subscriptor: subid, subscribeApproved: true, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })
    

        /* messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc,cur)=>Object.assign(acc,{[cur.for.toString()]:cur}),{}));
        console.log('messagesUnique: ', messagesUnique);
 */
        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

            console.log('obj!!', obj);
           Profile.findOne({ user: obj.club }
            )
            .then(item => {


                User.findById(obj.club 
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
                        messageDate: obj.updatedAt,

                        subscribeActive: obj.subscribeActive,
                        subscribeApproved: obj.subscribeApproved,
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
    getProfilesSubscriptorsByClub,
    getProfilesSubscriptorsPendingByClub,
    getClubSubscriptionBySubid
}