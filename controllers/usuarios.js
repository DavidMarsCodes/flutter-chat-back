const { response } = require('express');
const User = require('../models/usuario');

const getUsers = async ( req, res = response ) => {

    const from = Number( req.query.desde ) || 0;

    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(from)
        .limit(20)

    console.log('users', users)
    res.json({
        ok: true,
        users,
    })
}



module.exports = {
    getUsers
}