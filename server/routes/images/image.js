const express = require('express');
const router = express.Router();
var cors = require('cors');
const { cloudinary } = require('./cloudinary');

router.use(express.static('public'));
// router.use(express.json({ limit: '50mb' }));
// router.use(express.urlencoded({ limit: '50mb', extended: true,parameterLimit:500000 }));
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended:true}));
// var bodyParser = require('body-parser');
// router.use(bodyParser.json({limit: "50mb"}));
// router.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
router.use(cors());
router.get('/', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:dcoder')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
router.post('/upload',  async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dcoder',
        });
        console.log("in upload router:");
        console.log(uploadResponse);
        res.json({ imageUrl: uploadResponse.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router 