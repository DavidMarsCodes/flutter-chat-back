require('dotenv').config()
var aws = require('aws-sdk');
const Profile = require('../models/profile');
const Plant = require('../models/plant');

var fs =require('fs');
var data = fs.readFileSync('./aws/keys.json', 'utf8');
var keys = JSON.parse(data);







const uploadAvatar = async (req, res = response ) => {


    
   
        console.log("req ##", req.headers.uid);  

    try {


const S3_BUCKET = keys.Bucket;
const s3 = new aws.S3();
const fileName = req.files.file.name;
const fileType = req.files.file.mimetype;
//const fileName = String(Date.now()) + '.' + fileType;
const folder = 'avatar';
const buffer = req.files.file.data;

console.log(fileName,fileType )
const s3Params = {
    Bucket: S3_BUCKET + '/' + folder,
    Key: fileName,
    //Expires: 500,
    Body: buffer,
    ContentType: fileType,
   ACL: 'public-read'
}

   


    console.log('s3Params', s3Params)

    s3.upload(s3Params, async (err, data) => {
        
        if (err) {
            console.log(err);
            res.json({ success: false, error: err })
        }

        const returnData = {
            signedRequest: data,
            url: `http://${S3_BUCKET}.s3.sa-east-1.amazonaws.com/${folder}/${fileName}`
        };

        console.log(returnData)

        const uid = req.headers.uid;

        console.log('UID: ', uid);

      const  profileUpdate = await Profile.updateOne(
            {
                user: uid
            },
            {
                $set: {
                    imageAvatar: returnData.url,
              
                    

                }
            }
        );
 


        console.log('profileUpdate', profileUpdate)  

        res.json({ ok: true, url: returnData.url  });

    });

        
    } catch (error) {
        
    }

}

const uploadHeader = async (req, res = response ) => {

   
    console.log("req ##", req.headers.uid);  

try {


const S3_BUCKET = keys.Bucket;
const s3 = new aws.S3();
const fileName = req.files.file.name;
const fileType = req.files.file.mimetype;
//const fileName = String(Date.now()) + '.' + fileType;
const folder = 'header';
const buffer = req.files.file.data;

console.log(fileName,fileType )
const s3Params = {
    Bucket: S3_BUCKET + '/' + folder,
    Key: fileName,
    //Expires: 500,
    Body: buffer,
    ContentType: fileType,
   ACL: 'public-read'
}



console.log('s3Params', s3Params)

s3.upload(s3Params, async (err, data) => {
    
    if (err) {
        console.log(err);
        res.json({ success: false, error: err })
    }

    const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.sa-east-1.amazonaws.com/${folder}/${fileName}`
    };

    console.log(returnData)

    const uid = req.headers.uid;

    console.log('UID: ', uid);

  const  profileUpdate = await Profile.updateOne(
        {
            user: uid
        },
        {
            $set: {
                imageHeader: returnData.url,
          
                

            }
        }
    );



    console.log('profileUpdate', profileUpdate)  

    res.json({ ok: true, url: returnData.url  });

});

    
} catch (error) {
    
}

}


const uploadCoverPlant = async (req, res = response ) => {

   
    console.log("req ##", req.headers.uid);  

try {


const S3_BUCKET = keys.Bucket;
const s3 = new aws.S3();
const fileName = req.files.file.name;
const fileType = req.files.file.mimetype;
//const fileName = String(Date.now()) + '.' + fileType;
const folder = 'coverPlant';
const buffer = req.files.file.data;

console.log(fileName,fileType )
const s3Params = {
    Bucket: S3_BUCKET + '/' + folder,
    Key: fileName,
    //Expires: 500,
    Body: buffer,
    ContentType: fileType,
   ACL: 'public-read'
}



console.log('s3Params', s3Params)

s3.upload(s3Params, async (err, data) => {
    
    if (err) {
        console.log(err);
        res.json({ success: false, error: err })
    }

    const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.sa-east-1.amazonaws.com/${folder}/${fileName}`
    };

    console.log(returnData)

    const uid = req.headers.uid;

    console.log('UID: ', uid);

  const  profileUpdate = await Plant.updateOne(
        {
            user: uid,
            room: roomId
        },
        {
            $set: {
                imageHeader: returnData.url,
          
                

            }
        }
    );



    console.log('profileUpdate', profileUpdate)  

    res.json({ ok: true, url: returnData.url  });

});

    
} catch (error) {
    
}

}

const uploadCoverPlant = async (req, res = response ) => {

   
    console.log("req ##", req.headers);  

try {


const S3_BUCKET = keys.Bucket;
const s3 = new aws.S3();
const fileName = req.files.file.name;
const fileType = req.files.file.mimetype;
//const fileName = String(Date.now()) + '.' + fileType;
const folder = 'coverPlant';
const buffer = req.files.file.data;

console.log(fileName,fileType )
const s3Params = {
    Bucket: S3_BUCKET + '/' + folder,
    Key: fileName,
    //Expires: 500,
    Body: buffer,
    ContentType: fileType,
   ACL: 'public-read'
}



console.log('s3Params', s3Params)

s3.upload(s3Params, async (err, data) => {
    
    if (err) {
        console.log(err);
        res.json({ success: false, error: err })
    }

    const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.sa-east-1.amazonaws.com/${folder}/${fileName}`
    };

    console.log(returnData)


    res.json({ ok: true, url: returnData.url  });

});

    
} catch (error) {
    
}

}

module.exports = {
    uploadCoverPlant,
    uploadAvatar,
    uploadHeader
}