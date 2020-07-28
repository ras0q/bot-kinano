// const README = require("../src/readme").README;
let mohu = ["なにそれ","なにそれ","なにそれ","もふもふ～","課題やって","もふもふ～:blob_pyon:","きなこもち！！！:kinako.ex-large:",{type: "stamp",name: "hi"},{type: "stamp",name: "hi"}]
module.exports = robot => {
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す

    robot.hear(/.*hoge.*$/i, res => {
        res.reply("huga");
    });

    
    robot.hear(/.*いらっしゃい.*$/i, res => {
        res.reply("おいす～(まだできないので``@Ras いらっしゃい``してね)");
    });

    robot.hear(/.*もちもち.*$/i, res => {
        res.reply("きなこもち～～～～～！");
    });

    robot.hear(/.*きなこ.*$/i, res => {
        res.send(":kinako.ex-large:");
    });

    robot.hear(/できること$/i, res => {
        res.send("[きなのはなんでもできるやんね！](https://wiki.trap.jp/bot/kinano)");
    });

    // 監視対象チャンネルで"もふもふ"を受け取ったら"もふもふ～"を返す
    // robot.hear(/.*id.*$/i, res => {
    //     res.send(res.message.message.user.id);
    // });

    robot.hear(x, res => {
        if(x == /.*もふもふ.*$/i) {
                let i = Math.floor( Math.random() * 9 );
                res.reply(mohu[i]);
            }
        else if(x == /.*(もふもち|もちもふ).*$/i) res.send("言いすぎやんね！！！:gao-.ex-large::anger.small.wiggle.wiggle:");
        else if(x == /.*もちもち.*$/i) res.send("もちもち～:blobenjoy:");
        else if(x == /.*やんね.*$/i) res.send("やんね！");
        else if(x == /.*(おやすみ|oyasumi|osumiya|oyasuta|poyasimi).*$/i) res.send("おやすみやんね～:zzz:");
        else if(x == /.*(おは|ohagoza|ohasta).*$/i) res.send("おはようやんね～");
        else if(x == /.*おい.*$/i) res.send("おい！");
        else if(x == /.*(か～|かあ).*$/i) res.send("いいぞいいぞ");
        else if(x == /.*うまうま.*$/i) res.send("むしゃむしゃ");
        else if(x == /.*(言ってる|いってる).*$/i) res.send("いうな！");
        else if(x == /.*なってる.*$/i) res.send("なるな！");
        else if(x == /.*(らす|Ras).*$/i) res.send("えへへ");
    });

    // robot.hear(/.*(もふもち|もちもふ).*$/i, res => {
    //     setTimeout(() => {
    //         res.send("言いすぎやんね！！！:gao-.ex-large::anger.small.wiggle.wiggle:");
    //     },1000);
    // });

    // robot.hear(/.*もふもふ.*$/i, res => {
    //     let i = Math.floor( Math.random() * 9 );
    //     res.reply(mohu[i]);
    // });

    // robot.hear(/.*もちもち.*$/i, res => {
    //     res.send("もちもち～:blobenjoy:");
    // });

    
    // robot.hear(/.*やんね.*$/i, res => {
    //     res.hear("やんね！");
    // });

    // robot.hear(/.*おい.*$/i, res => {
    //     res.send("おい！");
    // });

    //     robot.hear(/.*(かあ|か～).*$/i, res => {
    //     res.send("いいぞいいぞ");
    // });

    // robot.hear(/.*うまうま.*$/i, res => {
    //     res.send("むしゃむしゃ");
    // });

    // robot.hear(/.*(言ってる|いってる).*$/i, res => {
    //     res.send("いうな！");
    // });

    //     robot.hear(/.*なってる.*$/i, res => {
    //     res.send("なるな！");
    // });
    
    // robot.hear(/.*(Ras|らす).*$/i, res => {
    //     res.send("えへへ");
    // });

    // robot.hear(/.*(おやすみ|oyasumi|osumiya|oyasuta|poyasimi).*$/i, res => {
    //     res.send("おやすみやんね～:zzz:");
    // });
    
    // robot.hear(/.*(おは|ohagoza|ohasta).*$/i, res => {
    //     res.send("おはようやんね～");
    // });




    // // 監視対象チャンネルで"やんね"を受け取ったらスタンプを押す
    robot.hear(/.*(やんね|きなこ|きなの|黄名子|yannne).*$/i, res => {
        res.send(
            {
                type: "stamp",
                name: "yannne"
            },
            {
                type: "stamp",
                name: "gao-"
            },
            {
                type: "stamp",
                name: "mochimochi_kinakomochi"
            },
            {
                type: "stamp",
                name: "kinano"
            }
        );
    });

    robot.hear(/.*(黄|yellow).*$/i, res => {
        res.send(
            {
                type: "stamp",
                name: "yellow"
            }
        );
    });

    
    robot.hear(/.*(らす|Ras).*$/i, res => {
        res.send(
            {
                type: "stamp",
                name: "rascal"
            }
        );
    });
    



    robot.hear(/.*寝.*$/i, res => {
        if(res.message.message.user.id == "0fa5d740-0841-4b88-b7c8-34a68774c784"){
            res.send(
                {
                    type: "stamp",
                    name: "oyasumi"
                }
            );
        }
        else {
            res.send(
                {
                    type: "stamp",
                    name: "amae"
                }
            );
        }
    });


    // 以下やりたいこと

    // robot.hear(/できること$/i, res => {
    //     const commands = [
    //         `
    //         # できること:gao-:

    //         きなのはなんでもできるやんね！
    //             - ``@BOT_kinano やんね`` : ``@username やんね！`` をかえすやんね！やんねは正義やんね！:yannne:
    //             - ``@BOT_kinano もちもち`` : ``@username きなこもち～～～～～！`` をかえすやんね！おもちをたべるやんね！:yannne:
    //             - ``@BOT_kinano きなこもち`` : スタンプをかえすやんね！きなのは可愛いやんね！:yannne:"

                
    //             きなのはカンペキだけど不具合・要望があったら[#gps/times/Ras](https://q.trap.jp/channels/gps/times/Ras)でお願いやんね！:yannne:
    //             最終更新日:2020/07/25

    //         `
    //     ]

    //     res.reply(...commands);
    // });

    
    // // 監視対象チャンネルで"もふもふ"を受け取ったら"もちもち～"を返す
    // robot.hear(messages, res => {
    //     if(messages == /.*(らす|Ras).*$/i){
    //         res.send("えへへ");
    //     }
    //     else if(messages == /.*(おは|ohagoza|ohasta).*$/i){
    //         res.send("おはようやんね～");
    //     }
    //     else if(messages == /.*(おやすみ|oyasumi|osumiya|oyasuta|poyasimi).*$/i){
    //         res.send("おやすみやんね～:zzz:");
    //     }
    //     else if(messages == /.*もちもち.*$/i){
    //         res.send("もちもち:blobenjoy:");
    //     }
    //     else if(messages == /.*もふもふ.*$/i){
    //         res.send("もふもふ～");
    //     }
    //     else if(messages == /.*おい.*$/i){
    //         res.send("おい！");
    //     }
    //     else if(messages == /.*(かあ|か～).*$/i){
    //         res.send("いいぞいいぞ");
    //     }
    //     else if(messages == /.*うまうま.*$/i){
    //         res.send("むしゃむしゃ");
    //     }
    //     });
};
