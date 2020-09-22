const Youtube = require('youtube-node');
const config = require('./youtube-config');
const youtube = new Youtube(config.key);

function searchVideoURL(message, queryText) {
    return new Promise((resolve, reject) => {
        youtube.search(`Exercico em casa para biceps ${queryText}`, 2, (error, result) => {
            if(!error) {
                const videoIds = result.items.map((item) => item.id.videoIds).filter(item => item);
                const youtubeLinks = videoIds.map(videoIds => `https://www.youtube.com/watch?v=${videoIds}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            } else {
                console.log(JSON.stringify(result, null, 2));
                reject('Deu erro')
            }
        });
    });
};

youtube.search('Exercico em casa para biceps', (error, result) => {
    if(!error) {
        console.log(JSON.stringify(result));
    } else {
        console.log('Deu erro');
    }
});

module.exports.searchVideoURL = searchVideoURL;