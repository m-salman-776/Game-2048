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
        else if(this.board[row][col] >= 128) result = true;
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
let game ;
function startGame(){
    game = new Game(3,0);
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
    let max_score = game.max_score;
    game = new Game(3,max_score);
}
function quit(){
    game = new Game(3,0)
}