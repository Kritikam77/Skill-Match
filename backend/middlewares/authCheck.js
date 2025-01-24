const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const dotenv = require("dotenv");

dotenv.config();


// console.log("hehehehe ", process.env.AUTH0_DOMAIN);
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_IDENTIFIER,
  issuer: process.env.AUTH0_ISSUER_BASE_URL,
  algorithms: ["RS256"],
});

module.exports = {authCheck};
