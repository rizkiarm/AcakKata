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
	*/
	init: function(words = []) {
		this.setWords(words);
		this.registerUI();
		this.bindUIActions();
		this.refreshGame();
	},

	/*
		Function which register HTML Dom element into the Acak Kata system
		for later use.
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
	*/
	bindUIActions: function() {
		self = this;
		ui = this.settings.ui;
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
		Function to load words to the settings.
		@param: list of string - words to be loaded on the game
	*/
	loadWords: function(words) {
		this.words = words
	},

	/*
		Function to generate question.
		@return: Object - answer and question
	*/
	generateQuestion: function() {
		random_word = this.getRandomWord()
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
		words = this.getWords();
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
	*/
	correctAnswerCallback: function(){
		session = this.settings.session;
		session.correct += 1;
		$.notify('Correct!');
	},

	/*
		Function to give user response on incorrect answer
	*/
	wrongAnswerCallback: function(){
		session = this.settings.session;
		session.wrong += 1;
		$.notify('Wrong!');
	},

	/*
		Function to refresh the current game
	*/
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

	/*
		Function to refresh the current game session
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
		return: list of string - words
	*/
	getWords: function(){
		return this.settings.words;
	},

	/*
		Function to set words in the game
		params: list of string
	*/
	setWords: function(words){
		this.settings.words = words;
	},

	/*
		Function to add words in the game
		params: list of string
		return: list of string - list of failed to input string
	*/
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

	/*
		Function to add word in the game
		params: string
		return: boolean
	*/
	addWord: function(word){
		current_words = this.getWords();
		if(current_words.indexOf(word) > -1){
			return false;
		}
		current_words.push(word);
		return true;
	}
}

// Initiate Acak Kata game
AcakKata.init(['aku','kamu','kita','bersama']);