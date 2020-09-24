const request = require('request');

let URL = 'https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec';

module.exports = robot => {
    robot.hear(/^tra .*$/i, res => {
        const plainText = res.message.message.plainText;
        const index = plainText.search(/(\(..=>..\)|\(..->..\))/); //言語指定があれば変える
        let txt = plainText.slice(3);
        let src = "ja";
        let tar = "en";
        if(index != -1){
            src = plainText.slice(index+1,index+3);
            tar = plainText.slice(index+5,index+7);
        }
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
            if(data.text) res.reply(data.text);
            else res.reply("きなのその言語知らない！");
        });
    })

        robot.hear(/^tratra .*$/i, res => {
        const plainText = res.message.message.plainText;
        let txt = plainText.slice(6);
        request.get({
            uri: URL,
            headers: {'Content-type': 'application/json'},
            qs: {
                "text": txt,
                "source": "ja",
                "target": "en"
            },
            json: true
        }, function(err, req, data){
            if(data.text) txt = data.text;
            else res.reply("きなのその言語知らない！");
        });
        request.get({
            uri: URL,
            headers: {'Content-type': 'application/json'},
            qs: {
                "text": txt,
                "source": "en",
                "target": "ja"
            },
            json: true
        }, function(err, req, data){
            if(data.text) res.reply(data.text);
            else res.reply("きなのその言語知らない！");
        });
    })
}

