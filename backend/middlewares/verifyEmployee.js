const jwt = require('jsonwebtoken'); // Ensure you import the jwt library
const jwtKey = 'your_jwt_secret_key'; // Replace with your actual JWT secret key

function verifyEmployee(req, res, next) {
  console.log(req.headers['authorization']);
  const Header = req.headers['authorization'];

  if (typeof Header !== 'undefined') {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData._id == req.params.id) {
          console.log(authData);
          if (authData.Account == 3) {
            next();
          } else {
            res.sendStatus(403);
          }
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
module.exports = verifyEmployee;
