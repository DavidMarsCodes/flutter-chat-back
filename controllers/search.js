const Profile = require('../models/profile');
const User = require('../models/user');


const getSearchPrincipalByQuery = async (req, res = response) => {



    const QueryRegex = new RegExp(req.params.query);


    try {


        const resultFindArray = await

            Profile.find({ 'name': { $regex: QueryRegex, $options: 'i' } })
                .limit(50)
                .populate('user');


        // .sort('-online')

        // Profile.find({ $and: [ { $or: [{name: QueryRegex },{user.username: regex}] }, {category: value.category}, {city:value.city} ] } )

        const profiles = [];

        // console.log('profilesFind', profilesFind);

        resultFindArray.map((item) => {



            if (item.isClub) {

                const profile = {
                    name: item.name,
                    lastName: item.lastName,
                    about: item.about,
                    imageHeader: item.imageHeader,
                    imageAvatar: item.imageAvatar,
                    id: item._id,
                    user: {
                        online: item.user.online,
                        uid: item.user._id,
                        email: item.user.email,
                        username: item.user.username,

                    },

                    messageDate: item.updatedAt,
                    isClub: item.isClub,
                    subscribeActive: item.subscribeActive,
                    subscribeApproved: item.subscribeApproved,
                    subId: item._id,
                    isUpload: item.isUpload,

                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt

                }

                profiles.push(profile);

            }


        }
        );




        res.json({
            ok: true,
            profiles
        })
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {

    getSearchPrincipalByQuery
}