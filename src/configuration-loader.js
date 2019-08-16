
const path = require('path');
const { File, Path } = require('./utils');

module.exports.loadConfiguration = async () => {
    const data = await File.read(path.resolve(__dirname, '..', 'configuration.json'));
    configuration = JSON.parse(data);
    configuration.quizz.folder = Path.removeLastSlash(configuration.quizz.folder);
    configuration.quizz.name = Path.getLastPathName(configuration.quizz.folder);
    return configuration;
}