const ical = require('ical');
const rp = require('request-promise');
const cron = require('node-cron');
const traqapi = require('../src/traqapi').api;
const { at_Ras } = require('../src/words');

const baseURL = process.env.ICAL_URL;

module.exports = robot => {
  cron.schedule('0 * * * *', () => {
    try {
      readIcal(baseURL);
    }
    catch(err) {
      robot.send({userID: at_Ras}, `#cron error\n${err}`);
    }
  }, { timezone: 'Asia/Tokyo' });
};

const readIcal = (url) => {
  rp(url)
    .then(body => {
      const ics = ical.parseICS(body);
      const now = new Date();
      const sortedKeys = Object.keys(ics).sort((a,b) => {
        if(ics[a].start < ics[b].start) return -1;
        else return 1;
      });
      const nextEventKey = sortedKeys.find(key => (now < ics[key].start));
      const { summary, start } = ics[nextEventKey];
      const displayName =  `きなの@${summary} は${start.getMonth()+1}/${start.getDate()} ${start.getHours()}:${('0'+start.getMinutes()).slice(-2)}から！`;
      traqapi.editMe({ displayName });
      return null;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
