
const Message = require('../models/message');

const getChat = async(req, res) => {

    const miId = req.uid;
    const messageBy = req.params.by;

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



module.exports = {
    getChat
}