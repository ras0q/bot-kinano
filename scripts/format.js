module.exports = robot => {
  robot.hear(/^(format|fmt)\smatrix/i, res => {
    const { user, plainText } = res.message.message;
    if(!user.bot){
      const text = plainText
        .replace(/^[^\n]*\n/, '')
        .replace(/\n/gi, '\\\\')
        .replace(/,/gi, '&');
      res.send(`$$\n\\left(\\begin{array}{ccc}${text}\\end{array}\\right)\n$$`);
    }
  });

  robot.hear(/^(format|fmt)\stable/i, res => {
    const { user, plainText } = res.message.message;
    if(!user.bot){
      const rows = plainText
        .replace(/^[^\n]*\n/, '')
        .split('\n');
      const commas = rows[0].match(/[,、，]/g)
      const colLen = commas !== null ? commas.length + 1 : 1;
      const preformedRows = rows.map(text =>
        text.replace(/[,、，]/g, '|') + '|'
      );
      const table = [
        preformedRows[0],
        '-|'.repeat(colLen),
        ...preformedRows.slice(1)
      ].join('\n') + '\n';
      res.send(table);
    }
  });
};