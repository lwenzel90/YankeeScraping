const rp = require('request-promise');
const $ = require('cheerio');
const playerParse = require('./playerParse');
const url = `https://www.baseball-reference.com/teams/NYY/2018.shtml`;

rp(url)
    .then(html => {
        const playerUrls = [];
        for (let i = 0; i < 49; i++) {
            playerUrls.push($('#team_batting > tbody > tr > td > a', html)[i].attribs.href);
        }
        return Promise.all(
            playerUrls.map(url => {
                return playerParse('https://www.baseball-reference.com' + url);
            })
        );
    })
    .then(players => {
        console.log(players);
    })
    .catch(err => {
        console.log(err);
    });