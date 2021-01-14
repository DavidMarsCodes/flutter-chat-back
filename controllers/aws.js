require('dotenv').config()
var aws = require('aws-sdk');
const Profile = require('../models/profile');

const fs = require('fs');

const uploadAvatar = async (req, res = response ) => {

   
    console.log("file name", req.files);  

    try {
   

    const S3_BUCKET = process.env.Bucket;
  
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const fileName = req.files.file.name;
    const fileType = req.files.file.mimetype;
    //const fileName = String(Date.now()) + '.' + fileType;
    const folder = 'avatar';
    const buffer = req.files.file.data;


    var base64data = await new Buffer.from(buffer, 'binary').toString('base64');

    print(base64data);
    
    const s3Params = {
        Bucket: S3_BUCKET + '/' + folder,
        Key: fileName,
        //Expires: 500,
        Body: base64data,
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