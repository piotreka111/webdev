const bodyParser = require('body-parser');

function addRawBody(req, res, buf, encoding) {
    req.rawBody = buf.toString();
}

const bodyParserJsonException = function (req, res, next) {
    bodyParser.json({
        verify: addRawBody,
    })(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({
                error: "Bład parsowania json"
            });
            return;
        }
        next();
    })
};



module.exports = {
  bodyParserJsonException: bodyParserJsonException
};
