let board = [[0,0,0],[0,0,0],[0,0,0]]
let colorMap = ['#ffb3b3','#ff9999','#ff8080','#ff6666','#ff5050','#ff4d4d','#ff3333','#ff1a1a','#ff0000','#e60000',]
let game_own = false;
let game_over = false;
let current_score = 0;
let max_score = 0;
let move_count = 0;

function fun(){
    printBord()
    updateScore()
    putRandomNumber();
    putRandomNumber();
}

function updateScore(){
    document.getElementById('curr').innerHTML = current_score;
    document.getElementById('max').innerHTML = max_score
}
function printBord(){
    let grid = document.querySelector('.grid')
    let parents = Array.from(grid.children)
    for(let i=0;i<parents.length;i++){
        let parent = parents[i].children;
        for(let j=0;j<parent.length;j++)
        {
            parent[j].innerHTML = board[i][j]>0 ? board[i][j] : ''
            if(board[i][j]>0)
            parent[j].style.background = colorMap[Math.log2(board[i][j])-1];
            else parent[j].style.background = "#cdc1b4";

        }
    }
}
function getEmptyCells(){
    let emptyCells = []
    let result = false;
    for(let i=0;i<board.length;i++)
    for(let j=0;j<board[i].length;j++)
    if(board[i][j] == 0) emptyCells.push({x :i,y :j})
    else if(board[i][j] >= 128) result = true;
    return {cell:emptyCells,result : result}
}


function putRandomNumber(){
    if(game_own == true) return;
    let res = getEmptyCells();
    let emptyCells = res.cell
    if(emptyCells.length == 0) {
        move_count  += 1;
        console.log(move_count,'ff')
        return;
    }
    let idx1 = Math.floor(Math.random()*emptyCells.length);
    board[emptyCells[idx1].x][emptyCells[idx1].y] = Math.random() > 0.5 ? 4 : 2

    let grid = document.querySelector('.grid')
    let parents = Array.from(grid.children)
    for(let i=0;i<parents.length;i++){
        let parent = parents[i].children;
        for(let j=0;j<parent.length;j++)
        if(i == emptyCells[idx1].x && j == emptyCells[idx1].y)
        parent[j].style.background = "#eee4da"
    }
    printBord()
    if(res.result == true){
        document.querySelector('.verdict').innerHTML = 'You Won!'
        game_own = true;
    }
}
function rotate90Clockwise(){
    for(let i=0;i<board.length;i++)
    for(let j=i+1;j<board[i].length;j++){
        let t = board[i][j];
        board[i][j] = board[j][i]
        board[j][i] = t;
    }
    let left = 0 , right = board.length-1;
    while(left < right){
        for(let i = 0 ; i < board.length;i++){
            let t = board[i][left]
            board[i][left] = board[i][right]
            board[i][right] = t;
        }
        left += 1 ; right -= 1;
    }
}
function rotate90AntiClockWise(){
    for(let i=0;i<board.length;i++)
    for(let j=i+1;j<board[i].length;j++){
        let t = board[i][j];
        board[i][j] = board[j][i]
        board[j][i] = t;
    }
    let left = 0 , right = board.length-1;
    while(left < right){
        for(let i = 0 ; i < board.length;i++){
            let t = board[left][i]
            board[left][i] = board[right][i]
            board[right][i] = t;
        }
        left += 1 ; right -= 1;
    }
}

function makeMove(dir){
    let object = document.querySelector('.verdict')
    if(game_own){
        object.innerHTML= 'You have own please start new Game'
        object.style.color = "#e6e6e6"
        object.style.backgroundColor = "#ff471a"
        return;
    }
    if(game_over){
        object.style.color = "#e6e6e6"
        object.style.backgroundColor = "#ff471a"
        object.innerHTML = 'Game is Over please start new Game!'
        return ;
    }
    let oldBoard = copyBoard()
    if(dir == 'UP'){
        rotate90AntiClockWise()
        // printBoardOnColsole()
        performOperation()
        rotate90Clockwise()
        console.log('UP')
    }
    else if(dir == 'RIGHT'){
        rotate90Clockwise()
        rotate90Clockwise()
        performOperation()
        rotate90AntiClockWise()
        rotate90AntiClockWise()
        console.log('RIGHT')
    }
    else if(dir == 'DOWN'){
        rotate90Clockwise()
        // printBoardOnColsole()
        performOperation()
        rotate90AntiClockWise()
        console.log('DOWN')
    }
    else {
        performOperation()
        console.log('LEFT')
    }
    printBord()

    if(stateCheck(oldBoard)){
        putRandomNumber()
        move_count = 0;
    }
    else {
        let emptyCells = getEmptyCells().cell;
        move_count += 1;
        console.log(move_count)
        if(emptyCells.length == 0 && move_count>=4){
            let object = document.querySelector('.verdict')
            object.style.color = "#e6e6e6"
            object.style.backgroundColor = "#ff471a"
            object.innerHTML = 'Game Over!' 
            game_over = true;
        }
    }
}

function performOperation(){
    for(let i = 0;i<board.length;i++){
        board[i] = performOperationOnRow(i);
    }
    updateScore()
}

function printBoardOnColsole(){
    for(let i=0;i<board.length;i++){
        let line = ''
        for(let j = 0;j < board.length;j++)
        line += board[i][j] + ' ';
        console.log(line + '\n')
    }
}

function performOperationOnRow(row_idx){
    let row = board[row_idx]
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
                current_score += newRow[i];
                max_score = Math.max(current_score,max_score)
                st.pop();
            }
            else newRow[i] = a;
        }
    }
    // let pp = ''
    // for(let i = 0 ;i < newRow.length;i++)
    // pp = pp + newRow[i] + ' ';
    // console.log(pp)
    return newRow;
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

function copyBoard(){
    let oldBoard = new Array(board.length)
    for(let i=0;i<board.length;i++){
        oldBoard[i] = new Array(board[i].length)
        for(let j=0;j<board[i].length;j++)
        oldBoard[i][j] = board[i][j]
    }
    return oldBoard;
}

function stateCheck(oldBoard){
    for(let i=0;i<board.length;i++)
    for(let j=0;j<board[i].length;j++)
    if(board[i][j] != oldBoard[i][j]) return true;
    return false;
}

document.onkeyup = function(key){
    switch(key.code){
        case "ArrowUp": makeMove('UP');break;
        case "ArrowDown":makeMove('DOWN');break;
        case "ArrowRight":makeMove('RIGHT');break;
        case "ArrowLeft":makeMove('LEFT');break;
    }
}

function resetCurrentScore(){
    current_score = 0;
    document.querySelector('.verdict').innerHTML=''
    document.querySelector('.verdict').style.backgroundColor = "grey"
    game_own = false;
    game_over = false
    for(let i=0;i<board.length;i++)
    for(let j=0;j<board[i].length;j++)
    board[i][j] = 0;
    move_count = 0;
    fun()
}