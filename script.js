let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//Winning Pattern Array:
let winningPattern = [[0, 1, 2], [0, 3, 6], [2, 5, 8],
[6, 7, 8], [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]];

//player 'X' plays first:
let xTurn = true;
let count = 0;

//disable all button
function disableButtons() {
    btnRef.forEach((element) => (element.Disabled = true));
    //enabled popup
    popupRef.classList.remove("hide");
}

//this function is executed when a player wins
function winFunction(letter) {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }
    else {
        msgRef.innerHTML = "&#x1F389; <br> '0' Wins";
    }
}

//function for draw
function drawFunction() {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
}

//new game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButton();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButton();
})

//win logic:
function winChecker() {
    //loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [btnRef[i[0]].innerText, btnRef[i[1]].innerText,
        btnRef[i[2]].innerText];

        //check if element are filled
        //if 3 empty element are same and would give win as would
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                //if all 3 button have same value then pass the value to win function
                winFunction(element1);

            }

        }
    }
}
//display x/0 on click:
btnRef.forEach(function (element) {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //display x
            element.innerText = 'X';
            element.Disabled = true;
        }
        else {
            xTurn = true;
            //display y
            element.innerText = '0';
            element.Disabled = true;


        }
        //increment count on each click:
        count += 1;
        if (count == 9) {
            drawFunction();

        }

        //check for win on every click:
        winChecker();
    });
});

//enable button and disable popup on page load
window.onload = enableButton;