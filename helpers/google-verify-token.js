const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '998672229328-07tmmjq53grsbt07s1r4akseqlas9fu0.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

const validGoogleToken = async (token) => {

    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                CLIENT_ID,
                '998672229328-8om047f0u3t12qconuvlpcr4acbr9ong.apps.googleusercontent.com',
                '998672229328-jefh61rgduqj36t7qvrp358j1lmb54pr.apps.googleusercontent.com'
            ]  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();


        return {

            name: payload['name'],
            lastName: payload['family_name'],
            //imageHeader
            imageAvatar: payload['picture'],
            email: payload['email'],
            //username: payload['given_name'],
            id: payload['aud']

        }

    } catch (error) {

        return  null;

    }


}

module.exports = {
    validGoogleToken
}

