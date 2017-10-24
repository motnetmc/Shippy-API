import jwt from 'jsonwebtoken';
import constant from '../Utilities/constant';


module.exports = function(req,res,next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, constant.CONST.TOKEN_SECRET, function(err, decoded) {
            if (err) { //failed verification.
                return res.json({
                  "error": err
                });
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).send({
            "error": true,
            "message": 'token not found'
        });
    }
}
