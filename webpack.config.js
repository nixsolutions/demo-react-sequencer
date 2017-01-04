if(process.env.NODE_ENV === 'githubpages'){
    module.exports = require('./webpack-githubpages.config');
} else{
    module.exports = require('./webpack-common.config');
}