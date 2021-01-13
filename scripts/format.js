module.exports = robot => {
    robot.hear(/^(format|fmt)\smatrix/i, res => {
        const { user, plainText } = res.message.message;
        if(!user.bot){
            let text = plainText.slice(plainText.search(/\n/) + 1);
            text = text.replace(/\n/gi, "\\\\").replace(/[,]/gi, "&");
            res.send(`$$\n\\left(\\begin{array}{ccc}${text}\\end{array}\\right)\n$$`);
        }
    })

    robot.hear(/^(format|fmt)\stable/i, res => {
        const { user, plainText } = res.message.message;
        if(!user.bot){
            let rows = plainText.slice(plainText.search(/\n/) + 1).split(/\n/);
            let len = [], table = rows[0] + "|\n";
            if(rows[0].search(/[,、，]/) != -1) {
                len = rows[0].match(/[,、，]/gi).length;
                table = rows[0].replace(/[,、，]/gi, "|") + "|\n";
            }
            for(let i = 0; i <= len; i++) table += "-|";
            table += "\n";
            for(let i = 1; i < rows.length; i++){
                table += rows[i].replace(/[,、，]/gi, "|") + "|\n";
            }
            res.send(table);
        }
    })
}