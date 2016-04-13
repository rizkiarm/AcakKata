Acak Kata
=========
A simple scramble text game. Built in HTML, CSS, Javascript. Using jQuery and Bootstrap.

Usage
-----
To run this app, follow this instructions:

1. Clone this repository
2. Open the ``index.html`` file located in ``src`` folder

#####Wordlist
######Add, Set, Get Word(s)
To add more words, in your browser javascript console type
```
AcakKata.addWords(["aa","bb"]); // Add "aa" and "bb"
```
Or,
```
AcakKata.setWords(["aa","bb"]); // Set words with "aa" and "bb"
```
To get word list, type
```
AcakKata.getWords();
```
######Word Source
Default wordlist on the app is taken from:
```
https://quizlet.com/11704796/500-hardest-english-words-flash-cards/
```
You can alter the word list by modifying the content of ``words.txt`` inside ``src`` folder. Each word must be placed on the different line.

#####Refresh
To refresh the game session type
```
AcakKata.refreshSession();
```
To refresh the game (generate new question), type
```
AcakKata.refreshGame();
```
Tests
-----
To run the tests, simply open the ``index.html`` inside ``tests`` folder.
The automated tests will tests the app and return the tests report.
The tests suite is created using QUnit.