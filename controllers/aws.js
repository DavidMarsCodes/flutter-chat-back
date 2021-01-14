require('dotenv').config()
var aws = require('aws-sdk');
const Profile = require('../models/profile');



const uploadAvatar = async (req, res = response ) => {

   
    console.log("file name", req.files.file);  

    try {
   

    const S3_BUCKET = process.env.Bucket;
    const s3 = new aws.S3();
    const fileName = req.files.file.name;
    const fileType = req.files.file.mimetype;
    //const fileName = String(Date.now()) + '.' + fileType;
    const folder = 'avatar';
    const body = req.files.file.data;


    console.log(fileName, fileType,body)
    
    const s3Params = {
        Bucket: S3_BUCKET + '/' + folder,
        Key: fileName,
        //Expires: 500,
        Body: new Buffer.from(string[body]),
        ContentType: fileType,
       //ACL: 'public-read'
    };

    console.log('s3Params', s3Params);

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
        
        if (err) {
            console.log(err);
            res.json({ success: false, error: err })
        }

        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${folder}/${fileName}`
        };

        console.log(returnData)

/*         Profile.updateOne(
            {
                user: uid
            },
            {
                $set: {
                    imageAvatar: name,
              
                    

                }
            }
        );



        console.log('profileUpdate', profileUpdate) */

        res.json({ ok: true, data: { returnData } });

    });

        
    } catch (error) {
        
    }

}

module.exports = {
    uploadAvatar
}