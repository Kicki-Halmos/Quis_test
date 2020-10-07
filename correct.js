class Correct {
    constructor() {
        /*this.list = [
            {
            question: "What is your favourite color?",
            answers: [
                {answer: "red", correct: "true"},
                {answer: "blue", correct: "true"}
            ]
        },
        {
            question: "What is your favorite fruit?",
            answers: [
                {answer: "banana", correct: "false"},
                {answer: "kiwi", correct: "true"}
            ]
        },
        {
            question: "What is your favorite candy?",
            answers: [
                {answer: "licorice", correct: "true"},
                {answer: "chewing-gum", correct: "false"}
            ]
        },
        {
            question: "What is your favorite language?",
            answers: [
                {answer: "javascript", correct: "true"},
                {answer: "c#", correct: "true"}
            ]
        }
    ]*/
        this.list = [];
    }

    emptyList() {
        this.list = [];
    }

    addToList(new_quiz) {
        this.list.push(new_quiz);   //pushar in alla frågor, svar och rätta svar i this.list
    }
    printResult(result){           // metod för att skriva ut poängresultatet (result)
        let div_quiz= document.getElementById("quiz");
        let div_result = document.createElement("div");
        let p_result = document.createElement("h4");
        let user_name = document.getElementById("name").value;
        let btnCorrect = document.getElementById("btnCorrect");
        let btnQuiz = document.getElementById("btnQuiz");
        btnQuiz.innerHTML = "Nytt quiz";
        p_result.innerHTML = user_name + " din poäng är: " + result;
        
        div_quiz.appendChild(p_result);
        btnCorrect.classList.add("hide");
        btnQuiz.classList.remove("hide");




    }
    compareChecked_Correct() {      // metod för att räkna ut poäng

        let result = 0;
        let id_nr = 0;
        let checkbox;

        for (let question of this.list) {  //loopar igenom alla frågor i this.list
            let correct = [];  // en array som ska fyllas med svar och rätt svar "true" eller "false"
            let checkedArray = []; // en array som ska fyllas med icheckade checkboxar

            for (let answer of question.answers) {  //loopar igenom alla svar per fråga

                let current_answers = {            // skapar ett objekt med svar och rätt svar "true" eller "false"
                    answer: answer.answer,
                    correct: answer.correct
                }

                correct.push(current_answers);    // pushar in objektet i correct arrayen

                answer = answer.answer;           // säkerställer att vi inte får med några svar som är = null
                if (answer != null) {               
                    id_nr++;
                    checkbox = document.getElementById("checkbox_" + id_nr);   //letar reda på checkbox som är kopplat till den specifika frågan vi är på i loopen
                    if (checkbox.checked) {                                    // pushar in den i checkedArray om den är icheckad
                        checkedArray.push(checkbox);

                    }

                }
            }

            let multipleCorrectArray = [];                                  // array som ska fyllas med alla rätta svar
            multipleCorrectArray = correct.filter((value, index, array) => {  // lambda-funktion för att hitta alla rätta svar i arrayen correct
                if (value.correct === "true") {
                    return value;
                }
            });
            //console.log(multipleCorrectArray[0]);

            //console.log(multipleCorrectArray);
            //console.log(checkedArray);


            // kollar ifall det finns flera rätta svar per fråga, ger bara päng ifall alla är ikryssade. om det finns ett rättsvar så får bara ett alternativ vara ikryssat för att få poäng
            if (checkedArray.length == 2 && multipleCorrectArray.length == 2 && checkedArray[0].nextElementSibling.textContent == multipleCorrectArray[0].answer && checkedArray[1].nextElementSibling.textContent === multipleCorrectArray[1].answer) {
                result++;
                console.log("resultat tvåsvar: " + result);
            } 
            else if (checkedArray.length == 1 && multipleCorrectArray.length == 1 && checkedArray[0].nextElementSibling.textContent == multipleCorrectArray[0].answer) {
                result++;
                
            }
            //console.log(checkedArray[0].nextElementSibling.textContent + " ---- " + multipleCorrectArray[0].answer);
        }
        
        this.printResult(result); //anropar funktion för att skriva ut hur många poäng användaren fått
        

    }
}

