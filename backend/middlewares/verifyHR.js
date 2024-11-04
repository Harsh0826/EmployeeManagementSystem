const jwt = require('jsonwebtoken'); // Ensure you import the jwt library
const jwtKey = 'your_jwt_secret_key'; // Replace with your actual JWT secret key

function verifyHR(req, res, next) {
  console.log(req.headers['authorization']);
  const Header = req.headers['authorization'];

  if (typeof Header !== 'undefined') {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 2) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
module.exports = verifyHR;
