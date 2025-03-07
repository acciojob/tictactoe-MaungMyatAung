//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function() {
            const submitButton = document.getElementById("submit");
            const player1Input = document.getElementById("player-1");
            const player2Input = document.getElementById("player-2");
            const messageDiv = document.querySelector(".message");
            const container = document.querySelector(".container");
            let currentPlayer;
            let players = {};
            let board = [["", "", ""], ["", "", ""], ["", "", ""]];
            
            submitButton.addEventListener("click", function() {
                const player1 = player1Input.value.trim();
                const player2 = player2Input.value.trim();
                
                if (player1 && player2) {
                    players = { X: player1, O: player2 };
                    currentPlayer = "X";
                    messageDiv.textContent = `${players[currentPlayer]}, you're up!`;
                    document.querySelector(".input-container").style.display = "none";
                    createBoard();
                }
            });
            
            function createBoard() {
                const boardDiv = document.createElement("div");
                boardDiv.classList.add("board");
                
                for (let i = 0; i < 9; i++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.id = i;
                    cell.addEventListener("click", handleMove, { once: true });
                    boardDiv.appendChild(cell);
                }
                container.appendChild(boardDiv);
            }
            
            function handleMove(event) {
                const cell = event.target;
                const index = parseInt(cell.id);
                const row = Math.floor(index / 3);
                const col = index % 3;
                
                board[row][col] = currentPlayer;
                cell.textContent = currentPlayer;
                
                if (checkWin()) {
                    messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
                    document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleMove));
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    messageDiv.textContent = `${players[currentPlayer]}, you're up!`;
                }
            }
            
            function checkWin() {
                const winPatterns = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                    [0, 4, 8], [2, 4, 6]             // Diagonals
                ];
                
                return winPatterns.some(pattern => {
                    const [a, b, c] = pattern;
                    return board[Math.floor(a / 3)][a % 3] !== "" &&
                           board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
                           board[Math.floor(a / 3)][a % 3] === board[Math.floor(c / 3)][c % 3];
                });
            }
        });
