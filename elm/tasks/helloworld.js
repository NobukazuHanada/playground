var http = require('http');
var server = http.createServer();
 
server.on('request', doRequest);
server.listen(8080);
function doRequest(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('{"msg":"Hello World"}');
    res.end();
}
