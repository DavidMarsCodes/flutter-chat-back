
const Subscription = require('../models/subscription');
const Profile = require('../models/profile');
const User = require('../models/user');

const getProfilesSubscriptorsByUser = async(req, res) => {


    try {

        const uid = req.params.uid;

        const myprofile = await Profile.findOne({ user:  uid })


        const isClub = myprofile.isClub;



        if(isClub){


            const update = { 
                   
                isClubNotifi: false
             };
    
    
       await Subscription.updateMany(
            {
                club: uid
            },
            {
                $set: update
            }
        );
    
       

            const subscription = await Subscription
            .find({ club: uid, subscribeApproved: false, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })
    

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.subscriptor }
            )
            .then(item => {


                User.findById(obj.subscriptor 
                    )

                    .then(user => {
    
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
                        isClub: item.isClub,
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
                

               return  res.json({
                    ok: true,
                    profiles: profiles
                })
            })

        
        }

        else {

            const update = { 
                   
                isUserNotifi: false
             };
    
    
       await Subscription.updateMany(
            {
                subscriptor: uid
            },
            {
                $set: update
            }
        );
    


            console.log('else!!!')

            const subscription = await Subscription
            .find({ subscriptor: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })

      

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.club }
            )
            .then(item => {



                if(item.user._id != uid){

                User.findById(obj.club 
                    )

                    .then(user => {
    
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
                        isClub: item.isClub,
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
                

               return  res.json({
                    ok: true,
                    profiles: profiles
                })
            })

        }

   




   

} 
catch (error) {


    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });

}}



const getProfilesSubscriptorsApproveByUser = async(req, res) => {


    try {

        const uid = req.params.uid;

        const myprofile = await Profile.findOne({ user:  uid })


        const isClub = myprofile.isClub;



        if(isClub){

/* 
            const update = { 
                   
                isClubNotifi: false
             };
    
    
       await Subscription.updateMany(
            {
                club: uid
            },
            {
                $set: update
            }
        );
     */
       

            const subscription = await Subscription
            .find({ club: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })
    

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.subscriptor }
            )
            .then(item => {


                User.findById(obj.subscriptor 
                    )

                    .then(user => {
    
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
                        isClub: item.isClub,
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
                

               return  res.json({
                    ok: true,
                    profiles: profiles
                })
            })

        
        }

        else {
/* 
            const update = { 
                   
                isUserNotifi: false
             };
    
    
       await Subscription.updateMany(
            {
                subscriptor: uid
            },
            {
                $set: update
            }
        );
     */


            console.log('else!!!')

            const subscription = await Subscription
            .find({ subscriptor: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })

      

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.club }
            )
            .then(item => {



                if(item.user._id != uid){

                User.findById(obj.club 
                    )

                    .then(user => {
    
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
                        isClub: item.isClub,
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
                

               return  res.json({
                    ok: true,
                    profiles: profiles
                })
            })

        }

   




   

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


        const update = { 
                   
            isClubNotifi: false
         };


   await Subscription.updateMany(
        {
            club: uid
        },
        {
            $set: update
        }
    );


    
        const subscription = await Subscription
            .find({ club: uid, subscribeApproved: false, isUpload: true, subscribeActive: true })
        .sort({ createdAt: 'asc' })
    

        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.subscriptor }
            )
            .then(item => {


                User.findById(obj.subscriptor 
                    )

                    .then(user => {
    
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
                        isClub: item.isClub,
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
    


        const profiles = [];

        const promises = subscription.map((obj) => 
        
        new Promise((resolve, reject) => {

           Profile.findOne({ user: obj.club }
            )
            .then(item => {


                User.findById(obj.club 
                    )

                    .then(user => {
    
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
                        isClub: item.isClub,
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



const getNotifications = async (req, res = response) => {

    const {

        id
    } = req.params ;

    const profileAuth = await Profile.findOne({user: id});

    isClub = profileAuth.isClub;


      if(isClub){


          const subscriptionsNotifi = await Subscription
          .find({ isClubNotifi: true,  club: id })


          res.json({
            ok: true,
            subscriptionsNotifi,

        });


      }

      else {

        const subscriptionsNotifi = await Subscription
        .find({ isUserNotifi: true,  subscriptor: id })


        res.json({
          ok: true,
          subscriptionsNotifi,

      });


      }

}

module.exports = {
    getProfilesSubscriptorsByUser,
    getProfilesSubscriptorsApproveByUser,
    getProfilesSubscriptorsPendingByClub,
    getClubSubscriptionBySubid,
    getNotifications
}