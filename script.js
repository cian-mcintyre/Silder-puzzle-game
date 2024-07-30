const container = document.getElementById('puzzle-container');
let tiles = [];
let blankTile = 8; // Index of the blank tile

function startGame() {
    do {
        tiles = [...Array(9).keys()].sort(() => Math.random() - 0.5);
        blankTile = tiles.indexOf(8);
    } while (!isSolvable(tiles));
    drawTiles();
    updateSolvabilityIndicator(true);
}

function updateSolvabilityIndicator(isSolvable) {
    const indicator = document.getElementById('status-indicator');
    if (isSolvable) {
        indicator.textContent = "Current configuration: solvable";
        indicator.className = 'solvable';
    } else {
        indicator.textContent = "Current configuration: not solvable";
        indicator.className = 'unsolvable';
    }
}







function isValidMove(pos) {
    const row = Math.floor(pos / 3);
    const col = pos % 3;
    const blankRow = Math.floor(blankTile / 3);
    const blankCol = blankTile % 3;
    const dist = Math.abs(blankRow - row) + Math.abs(blankCol - col);
    return dist === 1;
}

function moveTile(pos) {
    tiles[blankTile] = tiles[pos];
    tiles[pos] = 8;
    blankTile = pos; // Update the blank position
    drawTiles();
    if (isSolved()) {
        container.classList.add('completed');
        alert('Congratulations! You solved the puzzle!');
    }
}

function isSolvable(tiles) {
    let inversions = 0;
    let gridWithoutBlank = tiles.filter(val => val !== 8); // Assuming '8' is the blank

    for (let i = 0; i < gridWithoutBlank.length; i++) {
        for (let j = i + 1; j < gridWithoutBlank.length; j++) {
            if (gridWithoutBlank[i] > gridWithoutBlank[j]) {
                inversions++;
            }
        }
    }
    console.log("Inversions: " + inversions, "Solvability: " + (inversions % 2 === 0));

    // If the number of inversions is even, the puzzle is solvable
    return inversions % 2 === 0;
}


function drawTiles() {
    const solved = isSolved(); // Check if the puzzle is solved
    container.innerHTML = '';
    tiles.forEach((index, pos) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        // Ensure the last tile is also displayed if the puzzle is solved
        if (index !== 8 || solved) { 
            tile.style.backgroundImage = `url('tile-${index}.jpg')`;
        } else {
            tile.style.backgroundImage = 'none';  // Hide the last tile if not solved
        }
        tile.addEventListener('click', () => {
            if (!solved && isValidMove(pos)) {  // Only allow moves if not solved
                moveTile(pos);
            }
        });
        container.appendChild(tile);
    });
    if (solved) {
        displaySolvedMessage(); // Show the solved message if solved
    }
}

function moveTile(pos) {
    tiles[blankTile] = tiles[pos];
    tiles[pos] = 8;
    blankTile = pos; // Update the blank position
    drawTiles(); // Redraw tiles with the new positions
}


function displaySolvedMessage() {
    const message = document.getElementById('solved-message');
    message.style.display = 'block'; // Show the message
    setTimeout(() => {
        message.style.display = 'none'; // Optionally hide it after some time
    }, 4000); // Message shows for 4 seconds
}

function isSolved() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== i) return false;  // Each tile must match its index
    }
    return true;
}







startGame(); // Initial start
