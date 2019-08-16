const path = require('path');
const { File } = require('./utils');

module.exports.loadQuizz = async configuration => {
    const filePath = path.resolve(__dirname, '..', configuration.quizz.folder, 'quizz.json');
    const data = await File.read(filePath);
    const quizz = JSON.parse(data);
    quizz.basePath = configuration.quizz.folder;
    return quizz;
}