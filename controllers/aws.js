require('dotenv').config()
var aws = require('aws-sdk');
const Profile = require('../models/profile');
const Plant = require('../models/plant');
const Product = require('../models/product');
const Visit = require('../models/visit');
var fs = require('fs');
var data = fs.readFileSync('./aws/keys.json', 'utf8');
var keys = JSON.parse(data);







const uploadAvatar = async (req, res = response) => {


    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'avatar';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }





        s3.upload(s3Params, async (err, data) => {

            if (err) {
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`
            };


            const uid = req.headers.uid;


            const profileUpdate = await Profile.updateOne(
                {
                    user: uid
                },
                {
                    $set: {
                        imageAvatar: returnData.url,



                    }
                }
            );




            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}

const uploadHeader = async (req, res = response) => {



    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'header';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }




        s3.upload(s3Params, async (err, data) => {

            if (err) {
                console.log(err);
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`
            };


            const uid = req.headers.uid;


            const profileUpdate = await Profile.updateOne(
                {
                    user: uid
                },
                {
                    $set: {
                        imageHeader: returnData.url,



                    }
                }
            );




            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}


const updateCoverPlant = async (req, res = response) => {


    console.log("req ##", req.headers.id);

    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'coverPlant';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }




        s3.upload(s3Params, async (err, data) => {

            if (err) {
                console.log(err);
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`
            };


            const plantId = req.headers.id;


            const plantUpdate = await Plant.updateOne(
                {
                    _id: plantId,

                },
                {
                    $set: {
                        coverImage: returnData.url,

                    }
                }
            );




            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}


const updateCoverProduct = async (req, res = response) => {



    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'coverProduct';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }




        s3.upload(s3Params, async (err, data) => {

            if (err) {
                console.log(err);
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`
            };


            const productId = req.headers.id;


            const productUpdate = await Product.updateOne(
                {
                    _id: productId,

                },
                {
                    $set: {
                        coverImage: returnData.url,

                    }
                }
            );




            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}

const uploadCoverPlant = async (req, res = response) => {



    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'coverPlant';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }




        s3.upload(s3Params, async (err, data) => {

            if (err) {
                console.log(err);
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`
            };



            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}


const uploadCoverVisit = async (req, res = response) => {



    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'visit';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }




        s3.upload(s3Params, async (err, data) => {

            if (err) {
                console.log(err);
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,

                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`


            };

            console.log(returnData)


            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}

const updateCoverVisit = async (req, res = response) => {



    try {


        const S3_BUCKET = keys.Bucket;
        const s3 = new aws.S3();
        const fileName = req.files.file.name;
        const fileType = req.files.file.mimetype;
        //const fileName = String(Date.now()) + '.' + fileType;
        const folder = 'coverVisit';
        const buffer = req.files.file.data;

        const s3Params = {
            Bucket: S3_BUCKET + '/' + folder,
            Key: fileName,
            //Expires: 500,
            Body: buffer,
            ContentType: fileType,
            ACL: 'public-read'
        }




        s3.upload(s3Params, async (err, data) => {

            if (err) {
                console.log(err);
                res.json({ success: false, error: err })
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/${folder}/${fileName}`
            };


            const visitId = req.headers.id;


            const visitUpdate = await Visit.updateOne(
                {
                    _id: visitId,

                },
                {
                    $set: {
                        coverImage: returnData.url,



                    }
                }
            );




            res.json({ ok: true, url: returnData.url });

        });


    } catch (error) {

    }

}

module.exports = {
    uploadCoverPlant,
    updateCoverPlant,
    uploadAvatar,
    uploadCoverVisit,
    updateCoverVisit,
    updateCoverProduct,
    uploadHeader
}