var AcakKata = {
	settings: {
		session: {
			scrambled: '',
			answer: '',
			correct: 0,
			wrong: 0,
		},
		words: [],
		ui: {},
	},
	init: function(words = []) {
		this.setWords(words);
		this.registerUI();
		this.bindUIActions();
		this.refreshGame();
	},
	registerUI: function() {
		this.settings.ui.form = $('form');
		this.settings.ui.question = $('#question');
		this.settings.ui.answer = $('#answer');		
		this.settings.ui.correct = $('#correct');		
		this.settings.ui.wrong = $('#wrong');	
	},
	bindUIActions: function() {
		self = this;
		ui = this.settings.ui;
		ui.form.submit(function(e){
			user_answer = ui.answer.val();
			if(self.isCorrectAnswer(user_answer)){
				self.correctAnswerCallback();
			} else {
				self.wrongAnswerCallback();
			}
			self.refreshGame();
			e.preventDefault();
		});
	},
	loadWords: function(words) {
		this.words = words
	},
	generateQuestion: function() {
		random_word = this.getRandomWord()
		return {
			answer: random_word,
			question: this.scramble(random_word),
		};
	},
	getRandomWord: function() {
		words = this.getWords();
		return words[Math.floor(Math.random() * words.length)];
	},
	scramble: function(word) {
		return word.split('').shuffle().join('');
	},
	isCorrectAnswer: function(answer) {
		return this.settings.session.answer == answer;
	},
	correctAnswerCallback: function(){
		session = this.settings.session;
		session.correct += 1;
		$.notify('Correct!');
	},
	wrongAnswerCallback: function(){
		session = this.settings.session;
		session.wrong += 1;
		$.notify('Wrong!');
	},
	refreshGame: function(){
		ui = this.settings.ui;
		session = this.settings.session;
		question = this.generateQuestion();
		session.question = question.question;
		session.answer = question.answer;
		ui.question.html(question.question);
		ui.answer.val("");
		ui.correct.html(session.correct);
		ui.wrong.html(session.wrong);
	},
	refreshSession: function(){
		this.settings.session = {
			scrambled: '',
			answer: '',
			correct: 0,
			wrong: 0,
		};
		this.refreshGame();
	},
	getWords: function(){
		return this.settings.words;
	},
	setWords: function(words){
		this.settings.words = words;
	},
	addWords: function(words){
		fail = [];
		for(i in words){
			if(typeof words[i] != "string"){
				continue;
			}
			if(!this.addWord(words[i])){
				fail.push(words[i]);
			}
		}
		return fail;
	},
	addWord: function(word){
		current_words = this.getWords();
		if(current_words.indexOf(word) > -1){
			return false;
		}
		current_words.push(word);
		return true;
	}
}

AcakKata.init(['aku','kamu','kita','bersama']);