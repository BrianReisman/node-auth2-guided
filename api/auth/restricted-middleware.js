const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

//----------------------------------------------------------------------------//
// A method to verify that an authorization token is included as a header, and
// that the token is 1) valid, and 2) not expired. (jsonwebtoken checks for
// expired tokens automatically.)
// 
// A "valid" token is one where the payload+our_secret, when hashed with the
// correct hashing algorithm (specified in the JWT header), produces the same
// "signature" (cryptographic hash) as the one in the token. 
// 
// Remember that it is not possible for someone to create and store in the token
// the same hash that jsonwebtoken() will create when verifying the token,
// unless they use the same "secret", because jsonwebtoken() is going to use our
// secret to create a hash to compare to the signature in the JWT (because we
// are going to give it our secret.) If the signature in the JWT was created
// with some other secret key, or without one, the signature in the JWT will not
// match the one that is created by jsonwebtoken().
//----------------------------------------------------------------------------//
module.exports = (req, res, next) => {

  // we put this all in a try..catch block so that we can do better error
  // handling. 
  try {
    // Get the token from the authorization header. Remember that typically, the
    // client will include the "type" directive (typically "Bearer") in
    // addition to the token. So we need to strip off the type directive. If we
    // didn't do that, then when it is included (like it almost always is),
    // verification will fail, because we will be trying to verify "Bearer
    // {token}" instead of just "{token}". 
    //
    // See https://www.rfc-editor.org/rfc/rfc6750.html for information on
    // "bearer" tokens. 
    //
    // See https://tools.ietf.org/html/rfc2617 for information on "basic" and
    // "digest" authorization headers. 
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          next({ apiCode: 401, apiMessage: 'invalid or missing credentials' });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      next({ apiCode: 401, apiMessage: 'invalid or missing credentials' });
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'error validating credentials', ...err });
  }


};
