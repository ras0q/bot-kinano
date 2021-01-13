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
      const len = (rows[0].match(/[,、，]/g)?.length) ?? 0;
      const preformedRows = rows.map(text =>
        text.replace(/[,、，]/g, '|') + '|'
      );
      const table = [
        preformedRows[0],
        '-|'.repeat(len+1),
        ...preformedRows.slice(1)
      ].join('\n') + '\n';
      res.send(table);
    }
  });
};