const Youtube = require('youtube-node');
const config = require('./youtube-config');
const youtube = new Youtube(config.key);

youtube.search('Exercico em casa para biceps', (error, result) => {
    if(!error) {
        console.log(JSON.stringify(result));
    } else {
        console.log('Deu erro');
    }
});