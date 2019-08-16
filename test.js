function test(page, quizz){
    if (page.type === 'quizz'){
        console.log(typeof quizz);
    }
}

test({type : 'quizz'}, {});