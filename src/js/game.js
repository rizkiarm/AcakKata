var AcakKata = {
	/*
		Internal Acak Kata settings responsible for session management
		and maintaining words and UI element.
	*/
	settings: {
		session: {
			question: '',
			answer: '',
			correct: 0,
			wrong: 0,
		},
		words: [],
		ui: {},
	},

	/*
		Acak Kata init function responsible for initiating the game
		@params: list of string - list of word used in the game
		@return: none
	*/
	init: function(words = []) {
		this.setWords(words);
		this.registerUI();
		this.bindUIActions();
		this.refreshSession();
		this.refreshGame();
	},

	/*
		Function which register HTML Dom element into the Acak Kata system
		for later use.
		@params: none
		@return: none
	*/
	registerUI: function() {
		this.settings.ui.form = $('form');
		this.settings.ui.question = $('#question');
		this.settings.ui.answer = $('#answer');		
		this.settings.ui.correct = $('#correct');		
		this.settings.ui.wrong = $('#wrong');	
		this.settings.ui.refresh_button = $('#refresh-session');
	},

	/*
		Function which bind UI Actions.
		@params: none
		@return: none
	*/
	bindUIActions: function() {
		var self = this;
		var ui = this.settings.ui;
		// On submit, the answer would be captured and checked.
		// Respective callback function would be called inorder
		// to give responds to the user
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
		ui.refresh_button.click(function(){
			self.refreshSession();
			self.refreshGame();
			$.notify('Session Refreshed!');
		});
	},

	/*
		Function to generate question.
		@params: none
		@return: Object - answer and question
	*/
	generateQuestion: function() {
		var random_word = this.getRandomWord()
		return {
			answer: random_word,
			question: this.scramble(random_word),
		};
	},

	/*
		Function to generate question.
		@params: None
		@return: string - random word
	*/
	getRandomWord: function() {
		var words = this.getWords();
		return words[Math.floor(Math.random() * words.length)];
	},

	/*
		Function to scramble text.
		@param: string - word to be scrambled
		@return: string - scrambled word
	*/
	scramble: function(word) {
		return word.split('').shuffle().join('');
	},

	/*
		Function to check answer.
		@params: string - word to be checked
		@return: boolean
	*/
	isCorrectAnswer: function(answer) {
		return this.settings.session.answer == answer;
	},

	/*
		Function to give user response on correct answer
		@params: none
		@return: none
	*/
	correctAnswerCallback: function(){
		var session = this.settings.session;
		session.correct += 1;
		$.notify('Correct!');
	},

	/*
		Function to give user response on incorrect answer
		@params: none
		@return: none
	*/
	wrongAnswerCallback: function(){
		var session = this.settings.session;
		session.wrong += 1;
		$.notify('Wrong! correct answer: '+session.answer);
	},

	/*
		Function to refresh the current game
		@params: none
		@return: none
	*/
	refreshGame: function(){
		var ui = this.settings.ui;
		var session = this.settings.session;
		var question = this.generateQuestion();
		session.question = question.question;
		session.answer = question.answer;
		ui.question.html(question.question);
		ui.answer.val("");
		ui.correct.html(session.correct);
		ui.wrong.html(session.wrong);
	},

	/*
		Function to refresh the current game session
		@params: none
		@return: none
	*/
	refreshSession: function(){
		this.settings.session = {
			question: '',
			answer: '',
			correct: 0,
			wrong: 0,
		};
		this.refreshGame();
	},

	/*
		Function to get all words used in the game
		@params: none
		@return: list of string - words
	*/
	getWords: function(){
		return this.settings.words;
	},

	/*
		Function to load words to the settings.
		@params: list of string - words to be loaded on the game
		@return: none
	*/
	setWords: function(words){
		this.settings.words = words;
	},

	/*
		Function to add words in the game
		@params: list of string
		@return: list of string - list of failed to input string
	*/
	addWords: function(words){
		var fail = [];
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

	/*
		Function to add word in the game
		@params: string
		@return: boolean
	*/
	addWord: function(word){
		var current_words = this.getWords();
		if(current_words.indexOf(word) > -1){
			return false;
		}
		current_words.push(word);
		return true;
	}
}