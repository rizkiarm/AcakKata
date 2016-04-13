Acak Kata
=========
A simple scramble text game. Built in HTML, CSS, Javascript. Using jQuery and Bootstrap.

Usage
-----
To run this app, follow this instructions:

1. Clone this repository
2. Open the ``index.html`` file

#####Wordlist
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
#####Refresh
To refresh the game session type
```
AcakKata.refreshSession();
```
To refresh the game (generate new question), type
```
AcakKata.refreshGame();
```