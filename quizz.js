const express = require('express');
const { loadConfiguration } = require('./src/configuration-loader');
const { loadQuizz } = require('./src/quizz-loader');
const { resolveRoots } = require('./src/roots-resolver');

const app = express();

(async () => {
    const configuration = await loadConfiguration();
    const quizz = await loadQuizz(configuration);

    app.set('view engine', 'ejs');
    console.log('Tafiditra 1');
    app.use('/public', express.static('public'));
    console.log('Tafiditra 2');
    app.use(`/${configuration.quizz.name}`, express.static(`${configuration.quizz.folder}/public`));
    console.log('Tafiditra 3');

    resolveRoots(app, quizz);

    app.listen(configuration.server.port, () => console.log(`Quizz server runs on port ${configuration.server.port}`));
})();


