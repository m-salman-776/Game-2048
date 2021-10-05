
# Game-2048 https://malviyansalman.github.io/Game-2048/


**Used Tech Stack** 
* HTML/CSS
* JavaScrippt

<!-- **Highlights**
* MVC Architecture
* Authentication / Authorisation based Access
* Password Reset through verification Email
* Multer image upload
* Sessions
* Async/Await call

**Mongoose Model**
- User
- Products
- Orders


**Database**
- MongoDB Free Tier for text based
- Storage Location for Image yet to be configured -->

## Board Class Design

| Board Class | 
| --- |
| ***Size*** <br> ***ColorMap***<br> ***int Board[][]*** : |
| printBoard() <br> rotate90Clockwise() <br> rotate90AntiClockWise() <br> steteChange() <br> putRandomNumber() <br> getEmptyCells()|

## Game Class Design

| Game Class | 
| --- |
| ***Current_Score*** <br/> ***max_score*** <br> ***game_won***  <br> ***game_over*** <br> ***Board object***|
|updateScore() <br> makeMove(Direction) <br> performOperation() <br> performOperationOnRow(Row idx)<br>checkForPossibleMoves() <br> rowCheck() <br>colCheck()|

## User Interaction Function

| Interaction Model | 
| --- |
| ***onload*** : startGame() <br/> ***New Game*** : create a new intance of game class with highest score till now <br> ***startGame()*** : create Instance of game class and start listening for key events <br> ***Quit*** : start new Game|

