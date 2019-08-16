const ejs = require('ejs');
const path = require('path');
const { File, Path } = require('./utils');

function buildIdFromResponse(response) {
    let id = `quizz-radio-${Path.removeFirstSlash(response.nextPath)}`;
    id = Path.removeLastSlash(id);
    return id.replace(/\/+/, '-');
}

function buildQuizzResponses(responses) {
    responses.forEach(response => response.id = buildIdFromResponse(response));
    return responses;
}

function buildQuizzParameter(page, quizz) {
    let title = page.title;
    if (!title)
        title = quizz.global.page.title;

    const responses = buildQuizzResponses(page.responses);
    return {
        title: title,
        question: page.question,
        responses: responses,
        navigation: page.navigation
    };
}

async function loadHtml(page, quizz) {
    if (page.type === "ejs") {
        const filePath = path.resolve(__dirname, '..', quizz.basePath, Path.removeFirstSlash(page.file));
        const file = await File.read(filePath);
        return ejs.render(file, page.parameter);
    }

    if (page.type === 'quizz') {
        const quizzParemeter = buildQuizzParameter(page, quizz);
        const filePath = path.resolve(__dirname, '..', 'views', 'quizz.ejs');
        const file = await File.read(filePath);
        return ejs.render(file, quizzParemeter);
    }

    throw new Error(`page.type [${page.type}] from quizz.json is not recognized`);
}

module.exports.resolveRoots = (app, quizz) => {
    for (const page of quizz.pages) {
        app.get(page.path, async (req, res) => {
            const html = await loadHtml(page, quizz);
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        });
    }
}