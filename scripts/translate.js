const request = require('request');
const { responds } = require('./words');

let URL = 'https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec';

module.exports = robot => {
    robot.hear(/^tra .*$/i, res => {
        const plainText = res.message.message.plainText;
        const src = plainText.slice(4,6);
        const tar = plainText.slice(7,9);
        const txt = plainText.slice(10);
        request.get({
            uri: URL,
            headers: {'Content-type': 'application/json'},
            qs: {
                "text": txt,
                "source": src,
                "target": tar
            },
            json: true
        }, function(err, req, data){
            res.respond(data.text);
        });
    })
}

