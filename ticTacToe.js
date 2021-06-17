let stepCounter = 0;
let arrayGame, firstPlayer, secondPlayer;
let boardLength, sequenceLength;
let isThereWin = false;


sendDataToLogService = async (urlParam, data) => {
    data = JSON.stringify(data);
    // let url = urlParam | 'https://webhook.site/1532b7e5-dee2-4f66-a68c-7010713b8f77';
    try {
        const response = await fetch(urlParam, {
            method: 'POST',
            body: data,
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
            }
        });


        const res = await response;
        if (res.status === 0)
            alert('result logged successfully!');

        else
            alert('an error occured, the results were not logged');
    }
    catch {
        alert('an error occured, the results were not logged');
    }

}


isFirstPlayer = (() => stepCounter % 2 !== 0);

handleLogging = (winnerNumber) => {
    let isLog = confirm("would you like to log your results?");
    let url;
    if (isLog == true) {
        url = prompt('enter url of a server to log to');
        let winner = winnerNumber === 0 ? firstPlayer : winnerNumber === 1 ? secondPlayer : 'tic';
        let jsonObject = {};
        jsonObject['winnerName'] = winner;
        sendDataToLogService(url, jsonObject);
    }
}

handleWin = (winnerNumber) => {
    isThereWin = true;
    displayWinMessage(winnerNumber);
    const mainDiv = document.getElementsByClassName('main')[0];
    mainDiv.classList.add('disabled');
    handleLogging(winnerNumber);

}
displayWinMessage = (winnerNumber) => {
    let winMessage = ` player won!!!`;
    winnerNumber === 0 ?
        winMessage = firstPlayer + winMessage :
        winnerNumber === 1 ? winMessage = secondPlayer + winMessage : winMessage = 'tic!';
    alert(winMessage);

}

checkWin = () => {
    let count1 = 0, count2 = 0;
    if (isFirstPlayer()) {
        arrayGame.forEach((item) => {
            if (item === 0) {
                count1++;
                if (count1 === sequenceLength) {
                    handleWin(0);
                    return;
                }
            }
            else
                count1 = 0;
        });
    }
    else {
        arrayGame.forEach((item) => {
            if (item === 1) {
                count2++;
                if (count2 === sequenceLength) {
                    handleWin(1);
                    return;
                }
            }
            else {
                count2 = 0;
            }
        });
    }
    if (stepCounter === boardLength && !isThereWin) {
        handleWin(2);
    }
}

clickOnBoard = (cellNumber) => {
    stepCounter++;
    const element = document.getElementById(cellNumber);
    const turnElement = document.getElementById("turn");
    if (isFirstPlayer()) {
        arrayGame[cellNumber] = 0;
        // element.textContent='X';
        element.value = 'X';
        turnElement.textContent = secondPlayer;
    }
    else {
        arrayGame[cellNumber] = 1;
        element.value = 'O';
        turnElement.textContent = firstPlayer;
    }

    checkWin();
};


window.onload = () => {
    boardLength = Number(prompt('Type board length:'));
    const isInteger = /^(\d)+$/g;

    while (!isInteger.test(boardLength)) {
        alert('board length should be a number!');
        boardLength = Number(prompt('Type board length:'));
    }

    sequenceLength = Number(prompt('Type sequence length:'));
    while (!isInteger.test(boardLength)) {
        alert('sequence length should be a number!');
        boardLength = Number(prompt('Type sequence length:'));
    }
    firstPlayer = (prompt('Type first player name:'));
    secondPlayer = (prompt('Type second player name:'));
    arrayGame = new Array(boardLength).fill(-1);
    const mainDiv = document.getElementsByClassName('main')[0];
    for (let i = 0; i < boardLength; i++) {
        let element = document.createElement("input");
        element.type = "button";
        element.id = i;
        element.setAttribute('onclick', 'clickOnBoard(id)');
        mainDiv.appendChild(element);
        const turnElement = document.getElementById("turn");
        turnElement.textContent = firstPlayer;
    }
};

