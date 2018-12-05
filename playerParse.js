const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.baseball-reference.com/players/s/sanchga02.shtml';

const playerParse = url => {
    return rp(url)
    .then(html => {
        return {
            name: $('#meta > div >h1', html).text(),
            postions: cleanText($('#meta > div >h1', html).next().text())
                
        };
    })
    .catch(err => console.log(err));    
}

let cleanText = (str) => {
    str = str.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();
    str = str.replace("Position:", "").trim();
    str = str.replace("Positions:", "").trim();
    str = str.replace(" and ", ", ").trim();
    return str;
}

module.exports = playerParse;