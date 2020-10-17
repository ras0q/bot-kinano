const request = require('request');

let URL = 'https://script.google.com/macros/s/AKfycby3sNNJlWubQB4q_K4xHjZnpCxaCtYzbcuPmT-r9PJGTs4ZMb0/exec';

module.exports = robot => {

    //翻訳(デフォルトは日=>英)
    robot.hear(/^tra /i, res => {
        const plainText = res.message.message.plainText;
        const bot = res.message.message.user.bot;
        if(!bot){
            const index = plainText.search(/(\(|\[)..([=-]>|→)..(\)|\])/); //言語指定があれば変える
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
        }
    })

    //逆翻訳
    robot.hear(/^tratra /i, res => {
        const plainText = res.message.message.plainText;
        const bot = res.message.message.user.bot;
        if(!bot){
            let txt1 = plainText.slice(7);
            let txt2 = "";
            request.get({
                uri: URL,
                headers: {'Content-type': 'application/json'},
                qs: {
                    "text": txt1,
                    "source": "",
                    "target": "en"
                },
                json: true
            }, function(err, req, data){
                txt2 = data.text;
                request.get({
                    uri: URL,
                    headers: {'Content-type': 'application/json'},
                    qs: {
                        "text": txt2,
                        "source": "en",
                        "target": "ja"
                    },
                    json: true
                }, function(err, req, data2){
                    res.reply("**" + data2.text + "**\n(" + data.text + ")");
                });
            });
        }
    })

    let now = new Date();
    if((now.getHours() + 9) % 24 == now.getMinutes()){
        robot.hear(/.*/, res => {
            const bot = res.message.message.user.bot;
            if(!bot){
                const plainText = res.message.message.plainText;
                let txt = "";
                request.get(
                    {
                        uri: URL,
                        headers: {'Content-type': 'application/json'},
                        qs: {
                            "text": plainText,
                            "source": "",
                            "target": "en"
                        },
                        json: true
                    },
                function(err, req, data){
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
                        }, function(err, req, data2){
                            if(data2.text) res.reply(data2.text);
                            else res.reply("きなのその言葉知らない！");
                        });
                    }
                    else res.reply("きなのその言葉知らない！");
                });
            }
        })
    }
}

