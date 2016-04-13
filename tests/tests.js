var words = ['aku','kamu','kita','bersama'];
var i;

QUnit.test( "Game init tests", function( assert ) {
	AcakKata.init(words);
  	assert.deepEqual( AcakKata.settings.words, words, "Initialized words equals to words input" );
  	assert.ok( AcakKata.settings.session.question, "Question is not empty" );
  	assert.ok( AcakKata.settings.session.answer, "Answer is not empty" );
  	assert.equal( AcakKata.settings.session.correct, 0, "Correct answer in current session equals to 0" );
  	assert.equal( AcakKata.settings.session.wrong, 0, "Wrong answer in current session equals to 0" );
});

QUnit.test( "Set words tests", function( assert ) {
	AcakKata.setWords(words);
  	assert.deepEqual( AcakKata.getWords(), words, "Initialized words equals to words input" );
});

QUnit.test( "Generate question tests", function( assert ) {
	var question = AcakKata.generateQuestion();
	assert.ok( question.question, "Question is not null" );
  	assert.equal( words.indexOf(question.answer) > -1 , true, "Answer is in word list" );
});

QUnit.test( "Get random word tests", function( assert ) {
  	assert.equal( words.indexOf(AcakKata.getRandomWord()) > -1 , true, "Random word is in word list" );
});

QUnit.test( "Scramble word tests", function( assert ) {
  	assert.ok( AcakKata.scramble('test'), "Scrambled text is not null" );
  	assert.equal( AcakKata.scramble('test').length, 4, "Scrambled text have the same length as the original text" );
});

QUnit.test( "Answer checker tests", function( assert ) {
	AcakKata.init(words);
	var answer = AcakKata.settings.session.answer;
  	assert.equal( AcakKata.isCorrectAnswer(answer), true, "Correct answer return true" );
  	assert.equal( AcakKata.isCorrectAnswer(answer+"a"), false, "Incorrect answer return false" );
});

QUnit.test( "Get words tests", function( assert ) {
	AcakKata.init(words);
  	assert.deepEqual( AcakKata.getWords(), words, "Get words function returned word list" );
});

QUnit.test( "Add word tests", function( assert ) {
	AcakKata.init(["kamu"]);
	assert.equal( AcakKata.addWord("aku"), true, "Word added successfully" );
  	assert.equal( AcakKata.settings.words.indexOf("aku") > -1, true, "Inputted word exist in word list" );
  	assert.equal( AcakKata.addWord("aku"), false, "Duplicate would not be added to the word list" );
});

QUnit.test( "Add words tests", function( assert ) {
	AcakKata.init(["kamu"]);
	assert.deepEqual( AcakKata.addWords(["aku","bersama"]), [], "Words added successfully" );
  	assert.equal( AcakKata.settings.words.indexOf("aku") > -1 && AcakKata.settings.words.indexOf("bersama") > -1, true, "Inputted words exist in word list" );
  	assert.deepEqual( AcakKata.addWords(["aku","bersama","kita"]), ["aku","bersama"], "Duplicate would not be added to the word list, and returned" );
});