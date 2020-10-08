const request = require('request');

let URL = 'https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec';

module.exports = robot => {
    robot.hear(/^tra .*/i, res => {
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
            else res.reply("きなのその言葉知らない！");
        });
    })

        robot.hear(/^tratra.*/i, res => {
        const plainText = res.message.message.plainText;
        let txt1 = plainText.slice(6);
        let txt2 = "";
        request.get({
            uri: URL,
            headers: {'Content-type': 'application/json'},
            qs: {
                "text": txt1,
                "source": "ja",
                "target": "kg"
            },
            json: true
        }, function(err, req, data){
            if(data.text) {
                txt2 = data.text;
                request.get({
                    uri: URL,
                    headers: {'Content-type': 'application/json'},
                    qs: {
                        "text": txt2,
                        "source": "kg",
                        "target": "ja"
                    },
                    json: true
                }, function(err, req, data){
                    if(data.text) res.reply(data.text);
                    else res.reply("きなのその言葉知らない！");
                });
            }
            else res.reply("きなのその言葉知らない！");
        });
    })

    robot.hear(/.*/, res => {
        const createdAt = res.message.message.createdAt;
        console.log((Number(createdAt.slice(11,13)) + 9) % 24, Number(createdAt.slice(14,16)));
        if((Number(createdAt.slice(11,13)) + 9) % 24 == Number(createdAt.slice(14,16))){
            const plainText = res.message.message.plainText;
            let txt = "";
            request.get({
                uri: URL,
                headers: {'Content-type': 'application/json'},
                qs: {
                    "text": plainText,
                    "source": "ja",
                    "target": "en"
                },
                json: true
            }, function(err, req, data){
                if(data.text) {
                    txt = data.text;
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
                        else res.reply("きなのその言葉知らない！");
                    });
                }
                else res.reply("きなのその言葉知らない！");
            });
        }
    })
}

