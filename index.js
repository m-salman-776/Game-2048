// let board = [[0,0,0],[0,0,0],[0,0,0]]
// let colorMap = ['#ffb3b3','#ff9999','#ff8080','#ff6666','#ff5050','#ff4d4d','#ff3333','#ff1a1a','#ff0000','#e60000',]
// let game_own = false;
// let game_over = false;
// let current_score = 0;
// let max_score = 0;
// let move_count = 0;
// function fun(){
//     makeBoard(3)
//     printBord()
//     updateScore()
//     putRandomNumber();
//     putRandomNumber();
// }
// function createScoreBoard(){
//     let scoreBoard = document.createElement('div')
//     scoreBoard.classList.add('score')
//     let name = document.createElement('div')
//     name.innerHTML = 2048
//     name.classList.add('name')
//     scoreBoard.appendChild(name)
//     let current_score = document.createElement('div')
//     current_score.classList.add('curr')
//     let spanScore = document.createElement('span')
//     spanScore.style.fontWeight = "100px";
//     spanScore.innerHTML = 'Score'
//     let scoreDisplay = document.createElement('div')
//     scoreDisplay.setAttribute('id','curr')
//     scoreDisplay.innerHTML = 0;
//     current_score.appendChild(spanScore)
//     current_score.appendChild(scoreDisplay)
//     scoreBoard.appendChild(current_score)

//     let max_score = document.createElement('div');
//     let max_score_display = document.createElement('div')
//     max_score_display.setAttribute('id','max')
//     max_score.setAttribute('class','max')
//     max_score.innerHTML = 'BEST'
//     max_score_display.innerHTML = 0
//     max_score.appendChild(max_score_display)
//     scoreBoard.appendChild(max_score)
//     return scoreBoard;
// }
// function createGameGrid(size){
//     let game = document.createElement('div')
//     game.setAttribute('class','game')
//     let gameGrid = document.createElement('div')
//     gameGrid.setAttribute('class','grid')
//     for(let row=0;row<size;row++){
//         let gameRow = document.createElement('div')
//         gameRow.setAttribute('class','row')
//         for(let cell = 0;cell < size;cell++){
//             let gameCell = document.createElement('div')
//             gameCell.setAttribute('class','cell')
//             gameRow.appendChild(gameCell)
//         }
//         gameGrid.appendChild(gameRow)
//     }
//     game.appendChild(gameGrid)
//     return game;
// }
// function createController(){
//     let controller = document.createElement('div')
//     controller.setAttribute('class','controller')
//     let newGameButton = document.createElement('button')
//     let quitButton = document.createElement('button')
//     let verdict = document.createElement('div')
//     newGameButton.setAttribute('class','btn')
//     quitButton.setAttribute('class','btn')
//     verdict.setAttribute('class','verdict')
//     newGameButton.innerHTML = 'New Game'
//     quitButton.innerHTML = 'Quit'
//     newGameButton.onclick = resetCurrentScore;
//     quitButton.onclick = function(){console.log('Quit is clicked')}
//     controller.appendChild(newGameButton)
//     controller.appendChild(quitButton)
//     controller.appendChild(verdict)
//     return controller;
// }
// function makeBoard(size){
//     let container = document.querySelector('.container')
//     let centerTag = document.createElement('center')

//     centerTag.appendChild(createScoreBoard())
//     centerTag.appendChild(createGameGrid(size));
//     centerTag.appendChild(createController())

//     container.appendChild(centerTag)
// }
// function updateScore(){
//     document.getElementById('curr').innerHTML = current_score;
//     document.getElementById('max').innerHTML = max_score
// }
// function printBord(){
//     let grid = document.querySelector('.grid')
//     let parents = Array.from(grid.children)
//     for(let i=0;i<parents.length;i++){
//         let parent = parents[i].children;
//         for(let j=0;j<parent.length;j++)
//         {
//             parent[j].innerHTML = board[i][j]>0 ? board[i][j] : ''
//             if(board[i][j]>0)
//             parent[j].style.background = colorMap[Math.log2(board[i][j])-1];
//             else parent[j].style.background = "#cdc1b4";

//         }
//     }
// }
// function getEmptyCells(){
//     let emptyCells = []
//     let result = false;
//     for(let i=0;i<board.length;i++)
//     for(let j=0;j<board[i].length;j++)
//     if(board[i][j] == 0) emptyCells.push({x :i,y :j})
//     else if(board[i][j] >= 128) result = true;
//     return {cell:emptyCells,result : result}
// }
// function putRandomNumber(){
//     if(game_own == true) return;
//     let res = getEmptyCells();
//     let emptyCells = res.cell
//     if(emptyCells.length == 0)  return;
//     let idx1 = Math.floor(Math.random()*emptyCells.length);
//     board[emptyCells[idx1].x][emptyCells[idx1].y] = Math.random() > 0.5 ? 4 : 2

//     let grid = document.querySelector('.grid')
//     let parents = Array.from(grid.children)
//     for(let i=0;i<parents.length;i++){
//         let parent = parents[i].children;
//         for(let j=0;j<parent.length;j++)
//         if(i == emptyCells[idx1].x && j == emptyCells[idx1].y)
//         parent[j].style.background = "#eee4da"
//     }
//     printBord()
//     if(res.result == true){
//         document.querySelector('.verdict').innerHTML = 'You Won!'
//         game_own = true;
//     }
// }
// function rotate90Clockwise(){
//     for(let i=0;i<board.length;i++)
//     for(let j=i+1;j<board[i].length;j++){
//         let t = board[i][j];
//         board[i][j] = board[j][i]
//         board[j][i] = t;
//     }
//     let left = 0 , right = board.length-1;
//     while(left < right){
//         for(let i = 0 ; i < board.length;i++){
//             let t = board[i][left]
//             board[i][left] = board[i][right]
//             board[i][right] = t;
//         }
//         left += 1 ; right -= 1;
//     }
// }
// function rotate90AntiClockWise(){
//     for(let i=0;i<board.length;i++)
//     for(let j=i+1;j<board[i].length;j++){
//         let t = board[i][j];
//         board[i][j] = board[j][i]
//         board[j][i] = t;
//     }
//     let left = 0 , right = board.length-1;
//     while(left < right){
//         for(let i = 0 ; i < board.length;i++){
//             let t = board[left][i]
//             board[left][i] = board[right][i]
//             board[right][i] = t;
//         }
//         left += 1 ; right -= 1;
//     }
// }
// function makeMove(dir){
//     let object = document.querySelector('.verdict')
//     if(game_own){
//         object.innerHTML= 'You have own please start new Game'
//         object.style.color = "#e6e6e6"
//         object.style.backgroundColor = "#ff471a"
//         return;
//     }
//     if(game_over){
//         object.style.color = "#e6e6e6"
//         object.style.backgroundColor = "#ff471a"
//         object.innerHTML = 'Game is Over please start new Game!'
//         return ;
//     }
//     let oldBoard = copyBoard()
//     switch(dir){
//         case 'UP' :rotate90AntiClockWise();performOperation();rotate90Clockwise(); break;
//         case 'RIGHT' : rotate90Clockwise();rotate90Clockwise();performOperation();rotate90AntiClockWise();rotate90AntiClockWise(); break;
//         case 'DOWN' :rotate90Clockwise();performOperation();rotate90AntiClockWise(); break;
//         case 'LEFT' :performOperation(); break;
//         default:this.printBord();break;
//     }
//     if(stateCheck(oldBoard)){
//         putRandomNumber()
//         move_count = 0;
//     }
//     else {
//         let emptyCells = getEmptyCells().cell;
//         if(emptyCells.length == 0 && !checkForPossibleMove()){
//             let object = document.querySelector('.verdict')
//             object.style.color = "#e6e6e6"
//             object.style.backgroundColor = "#ff471a"
//             object.innerHTML = 'Game Over!' 
//             game_over = true;
//         }
//     }
// }

// function performOperation(){
//     for(let i = 0;i<board.length;i++){
//         board[i] = performOperationOnRow(i);
//     }
//     updateScore()
// }
// function printBoardOnColsole(){
//     for(let i=0;i<board.length;i++){
//         let line = ''
//         for(let j = 0;j < board.length;j++)
//         line += board[i][j] + ' ';
//         console.log(line + '\n')
//     }
// }
// function performOperationOnRow(row_idx){
//     let row = board[row_idx]
//     let st =  new Stack();
//     for(let i=row.length-1;i>=0;i--)
//     if(row[i] > 0) st.push(row[i])
//     let newRow = []
//     for(let i=row.length-1;i>=0;i--)
//     newRow[i] = 0;
//     for(let i=0;i<row.length;i++){
//         if(st.empty()){
//             newRow[i] = 0
//         }
//         else if(st.size() == 1){
//             newRow[i] = st.top();
//             st.pop();
//         }
//         else if(st.size()>=2){
//             let a = st.top(); st.pop();
//             if(st.top() == a){
//                 newRow[i] = 2*a;
//                 current_score += newRow[i];
//                 max_score = Math.max(current_score,max_score)
//                 st.pop();
//             }
//             else newRow[i] = a;
//         }
//     }
//     return newRow;
// }
// class Stack {
//     constructor(){
//         this.items = [];
//     }
//     push(val){
//         this.items.push(val)
//     }
//     pop(){
//         return this.items.pop();
//     }
//     empty(){
//         return this.items.length == 0
//     }
//     top(){
//         return this.items[this.items.length-1];
//     }
//     size(){
//         return this.items.length;
//     }
// }

// function copyBoard(){
//     let oldBoard = new Array(board.length)
//     for(let i=0;i<board.length;i++){
//         oldBoard[i] = new Array(board[i].length)
//         for(let j=0;j<board[i].length;j++)
//         oldBoard[i][j] = board[i][j]
//     }
//     return oldBoard;
// }

// function stateCheck(oldBoard){
//     for(let i=0;i<board.length;i++)
//     for(let j=0;j<board[i].length;j++)
//     if(board[i][j] != oldBoard[i][j]) return true;
//     return false;
// }

// document.onkeyup = function(key){
//     switch(key.code){
//         case "ArrowUp": makeMove('UP');console.log('up');break;
//         case "ArrowDown":makeMove('DOWN');console.log('down');break;
//         case "ArrowRight":makeMove('RIGHT');break;
//         case "ArrowLeft":makeMove('LEFT');break;
//     }
// }
// function resetCurrentScore(){
//     console.log('called from reset')
//     current_score = 0;
//     document.querySelector('.verdict').innerHTML=''
//     document.querySelector('.verdict').style.backgroundColor = "grey"
//     game_own = false;
//     game_over = false
//     for(let i=0;i<board.length;i++)
//     for(let j=0;j<board[i].length;j++)
//     board[i][j] = 0;
//     move_count = 0;
//     fun()
// }

// function checkForPossibleMove(){
//     return (rowCheck() || columnCheck())
// }

// function rowCheck(){
//     for(let row=0;row<board.length;row++){
//         let newRow = []
//         for(let col=0;col<board.length;col++)
//         if(board[row][col] > 0){
//             if(newRow.length>=1 && newRow[newRow.length-1] == board[row][col]) return true;
//             newRow.push(board[row][col]);
//         } 
//     }
// }

// function columnCheck(){
//     for(let col = 0 ; col < board.length;col++){
//         let newCol = []
//         for(let row=0;row<board.length;row++){
//             if(board[row][col] > 0){
//                 if(newCol.length>=1 && newCol[newCol.length-1] == board[row][col]) return true;
//                 newCol.push(board[row][col])
//             }
//         }
//     }
// }

class Board{
    constructor(size){
        this.size = size;
        this.colorMap = ['#ffb3b3','#ff9999','#ff8080','#ff6666','#ff5050','#ff4d4d','#ff3333','#ff1a1a','#ff0000','#e60000'];
        this.board = new Array(size);
        for(let i=0;i<size;i++)
        {
            this.board[i] = new Array(size);
            for(let j = 0;j<size;j++)
            this.board[i][j] = 0;
        }
        this.makeBoard(size);
        this.max_to_achieve = size == 3 ? 128 : 256
    }
    makeBoard(size){
        let container = document.querySelector('.container')
        if(container.hasChildNodes())
        container.removeChild(container.childNodes[0])
        let centerTag = document.createElement('center')

        centerTag.appendChild(this.createScoreBoard())
        centerTag.appendChild(this.drawGameGrid(size));
        centerTag.appendChild(this.createController())
        

        container.appendChild(centerTag)
    }
    createScoreBoard(){
        let scoreBoard = document.createElement('div')
        scoreBoard.classList.add('score')
        let name = document.createElement('div')
        name.innerHTML = 2048
        name.classList.add('name')
        scoreBoard.appendChild(name)
        let current_score = document.createElement('div')
        current_score.classList.add('curr')
        let spanScore = document.createElement('span')
        spanScore.style.fontWeight = "100px";
        spanScore.innerHTML = 'Score'
        let scoreDisplay = document.createElement('div')
        scoreDisplay.setAttribute('id','curr')
        scoreDisplay.innerHTML = 0;
        current_score.appendChild(spanScore)
        current_score.appendChild(scoreDisplay)
        scoreBoard.appendChild(current_score)
    
        let max_score = document.createElement('div');
        let max_score_display = document.createElement('div')
        max_score_display.setAttribute('id','max')
        max_score.setAttribute('class','max')
        max_score.innerHTML = 'BEST'
        max_score_display.innerHTML = 0
        max_score.appendChild(max_score_display)
        scoreBoard.appendChild(max_score)
        return scoreBoard;
    }
    drawGameGrid(size){
        let game = document.createElement('div')
        game.setAttribute('class','game')
        let gameGrid = document.createElement('div')
        gameGrid.setAttribute('class','grid')
        for(let row=0;row<size;row++){
            let gameRow = document.createElement('div')
            gameRow.setAttribute('class','row')
            for(let cell = 0;cell < size;cell++){
                let gameCell = document.createElement('div')
                gameCell.setAttribute('class','cell')
                gameRow.appendChild(gameCell)
            }
            gameGrid.appendChild(gameRow)
        }
        game.appendChild(gameGrid)
        return game;
    }
    populateGrid(){
        let grid = document.querySelector('.grid')
        for(let row=0;row<size;row++){
            let gameRow = document.createElement('div')
            gameRow.setAttribute('class','row')
            for(let cell = 0;cell < size;cell++){
                let gameCell = document.createElement('div')
                gameCell.setAttribute('class','cell')
                gameRow.appendChild(gameCell)
            }
            grid.appendChild(gameRow)
        }
    }
    createController(){
        let controller = document.createElement('div')
        controller.setAttribute('class','controller')
        let newGameButtonDiv = document.createElement('div')
        let newGameButton = document.createElement('button')
        let quitButton = document.createElement('button')
        let verdict = document.createElement('div')
        let select = document.createElement('select')
        let option1 = document.createElement('option')
        let option2 = document.createElement('option')
        select.setAttribute('id','dropdown')
        select.setAttribute('class','optionstyle')
        option1.setAttribute('value','3')
        option2.setAttribute('value','4')
        newGameButtonDiv.setAttribute('class','btn')
        newGameButton.setAttribute('class','btnstyle')
        option1.innerHTML = '3X3'
        option2.innerHTML = '4X4'
        newGameButton.innerHTML = 'New Game'
        option2.setAttribute('selected','true')
        select.appendChild(option1)
        select.appendChild(option2)
        quitButton.setAttribute('class','btn')
        verdict.setAttribute('class','verdict')
        quitButton.innerHTML = 'Quit'
        newGameButton.onclick = resetCurrentScore;
        quitButton.onclick = quit;
        newGameButtonDiv.appendChild(newGameButton)
        newGameButtonDiv.appendChild(select)
        controller.appendChild(newGameButtonDiv)
        controller.appendChild(quitButton)
        controller.appendChild(verdict)
        return controller;
    }
    copyBoard(){
        let oldBoard = new Array(this.size)
        for(let i=0;i<this.size;i++){
            oldBoard[i] = new Array(this.size)
            for(let j=0;j<this.size;j++)
            oldBoard[i][j] = this.board[i][j]
        }
        return oldBoard;
    }
    printBord(){
        let grid = document.querySelector('.grid')
        let parents = Array.from(grid.children)
        for(let i=0;i<parents.length;i++){
            let parent = parents[i].children;
            for(let j=0;j<parent.length;j++)
            {
                parent[j].innerHTML = this.board[i][j]>0 ? this.board[i][j] : ''
                if(this.board[i][j]>0)
                parent[j].style.background = this.colorMap[Math.log2(this.board[i][j])-1];
                else parent[j].style.background = "#cdc1b4";
            }
        }
    }
    getEmptyCells(){
        let emptyCells = []
        let result = false;
        for(let row=0;row<this.size;row++)
        for(let col=0;col<this.size;col++)
        if(this.board[row][col] == 0) emptyCells.push({x : row,y :col})
        else if(this.board[row][col] >= this.max_to_achieve) result = true;
        return {cell:emptyCells,result:result}
    }
    putRandomNumber(){
        let res = this.getEmptyCells();
        let emptyCells = res.cell
        if(emptyCells.length == 0)  return;
        if(res.result == true){
            return true;
        }
        let idx1 = Math.floor(Math.random()*emptyCells.length);
        this.board[emptyCells[idx1].x][emptyCells[idx1].y] = Math.random() > 0.5 ? 4 : 2
    
        let grid = document.querySelector('.grid')
        let parents = Array.from(grid.children)
        for(let i=0;i<parents.length;i++){
            let parent = parents[i].children;
            for(let j=0;j<parent.length;j++)
            if(i == emptyCells[idx1].x && j == emptyCells[idx1].y)
            parent[j].style.background = "#eee4da"
        }
        this.printBord()
        if(res.result == true){
            document.querySelector('.verdict').innerHTML = 'You Won!'
            // game_own = true;
            return true;
        }
        return false;
    }
    rotate90Clockwise(){
        for(let i=0;i<this.size;i++)
        for(let j=i+1;j<this.size;j++){
            let t = this.board[i][j];
            this.board[i][j] = this.board[j][i]
            this.board[j][i] = t;
        }
        let left = 0 , right = this.size-1;
        while(left < right){
            for(let i = 0 ; i < this.size;i++){
                let t = this.board[i][left]
                this.board[i][left] = this.board[i][right]
                this.board[i][right] = t;
            }
            left += 1 ; right -= 1;
        }
    }
    rotate90AntiClockWise(){
        for(let i=0;i<this.size;i++)
        for(let j=i+1;j<this.size;j++){
            let t = this.board[i][j];
            this.board[i][j] = this.board[j][i]
            this.board[j][i] = t;
        }
        let left = 0 , right = this.size-1;
        while(left < right){
            for(let i = 0 ; i < this.size;i++){
                let t = this.board[left][i]
                this.board[left][i] = this.board[right][i]
                this.board[right][i] = t;
            }
            left += 1 ; right -= 1;
        }
    }
    stateCheck(oldBoard){
        for(let i=0;i<this.size;i++)
        for(let j=0;j<this.size;j++)
        if(this.board[i][j] != oldBoard[i][j]) return true;
        return false;
    }
}

class Game{
    constructor(size,max_score){
        this.size = size;
        this.game_over = false;
        this.game_won = false;
        this.current_score = 0;
        this.max_score = max_score;
        this.board = new Board(size);
        document.querySelector('.verdict').innerHTML=''
        document.querySelector('.verdict').style.backgroundColor = "grey"
        this.board.printBord()
        this.updateScore()
        this.board.putRandomNumber()
        this.board.putRandomNumber()
    }

    makeMove(dir){
        let object = document.querySelector('.verdict')
        if(this.game_won){
            object.innerHTML= 'You have own please start new Game'
            object.style.color = "#e6e6e6"
            object.style.backgroundColor = "#ff471a"
            return;
        }
        if(this.game_over){
            object.style.color = "#e6e6e6"
            object.style.backgroundColor = "#ff471a"
            object.innerHTML = 'Game is Over please start new Game!'
            return ;
        }
        let oldBoard = this.board.copyBoard()
        switch(dir){
            case 'UP' :this.board.rotate90AntiClockWise();this.performOperation();this.board.rotate90Clockwise(); break;
            case 'RIGHT' :this.board.rotate90Clockwise();this.board.rotate90Clockwise();this.performOperation();this.board.rotate90AntiClockWise();this.board.rotate90AntiClockWise(); break;
            case 'DOWN' :this.board.rotate90Clockwise();this.performOperation();this.board.rotate90AntiClockWise(); break;
            case 'LEFT' :this.performOperation(); break;
            default:this.board.printBord();break;
        }
        this.board.printBord()
        if(this.board.stateCheck(oldBoard)){
           this.game_won = this.board.putRandomNumber()
           if(this.game_won){
            document.querySelector('.verdict').innerHTML = 'You Won!'}
        }
        else {
            let emptyCells = this.board.getEmptyCells().cell;
            if(emptyCells.length == 0 && !this.checkForPossibleMove()){
                let object = document.querySelector('.verdict')
                object.style.color = "#e6e6e6"
                object.style.backgroundColor = "#ff471a"
                object.innerHTML = 'Game Over!' 
                this.game_over = true;
            }
        }
    }
    performOperation(){
        for(let i = 0;i<this.size;i++){
            this.board.board[i] = this.performOperationOnRow(i);
        }
        this.updateScore()
    }
    updateScore(){
        document.getElementById('curr').innerHTML = this.current_score;
        document.getElementById('max').innerHTML = this.max_score
    }
    performOperationOnRow(row_idx){
        let board = this.board.board[row_idx];
        let row = this.board.board[row_idx]
        let st =  new Stack();
        for(let i=row.length-1;i>=0;i--)
        if(row[i] > 0) st.push(row[i])
        let newRow = []
        for(let i=row.length-1;i>=0;i--)
        newRow[i] = 0;
        for(let i=0;i<row.length;i++){
            if(st.empty()){
                newRow[i] = 0
            }
            else if(st.size() == 1){
                newRow[i] = st.top();
                st.pop();
            }
            else if(st.size()>=2){
                let a = st.top(); st.pop();
                if(st.top() == a){
                    newRow[i] = 2*a;
                    this.current_score += newRow[i];
                    this.max_score = Math.max(this.current_score,this.max_score)
                    st.pop();
                }
                else newRow[i] = a;
            }
        }
        return newRow;
    }
    checkForPossibleMove(){
        return (this.rowCheck() || this.columnCheck())
    }
    rowCheck(){
        let board = this.board.board;
        for(let row=0;row<this.size;row++){
            let newRow = []
            for(let col=0;col<this.size;col++)
            if(board[row][col] > 0){
                if(newRow.length>=1 && newRow[newRow.length-1] == board[row][col]) return true;
                newRow.push(board[row][col]);
            } 
        }
    }
    columnCheck(){
        let board = this.board.board;
        for(let col = 0 ; col < this.size;col++){
            let newCol = []
            for(let row=0;row<this.size;row++){
                if(board[row][col] > 0){
                    if(newCol.length>=1 && newCol[newCol.length-1] == board[row][col]) return true;
                    newCol.push(board[row][col])
                }
            }
        }
    }
}
class Stack {
    constructor()
    {
        this.items = [];
    }
    push(val){
        this.items.push(val)
    }
    pop(){
        return this.items.pop();
    }
    empty(){
        return this.items.length == 0
    }
    top(){
        return this.items[this.items.length-1];
    }
    size(){
        return this.items.length;
    }
}
class GameManager{
    constructor(size){
        this.size = size;
        this.game = new Game(size,0);
    }
    resetGame(){
        let max_score = game.max_score;
        this.game = new Game(size,max_score);
    }
    quit(){
        this.game = new Game(size,0);
    }
}
// let game ;
function startGame(){
    game = new Game(4,0);
    // let game = new GameManager(3)
    document.onkeyup = function(key){
        switch(key.code){
            case "ArrowUp": game.makeMove('UP');break;
            case "ArrowDown":game.makeMove('DOWN');break;
            case "ArrowRight":game.makeMove('RIGHT');break;
            case "ArrowLeft":game.makeMove('LEFT');break;
        }
    }
}
function resetCurrentScore(){
    let size = document.getElementById('dropdown').value
    // console.log(size,typeof size);
    let max_score = game.max_score;
    game = new Game(+size,max_score);
}
function quit(){
    game = new Game(4,0)
}

