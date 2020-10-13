document.addEventListener("DOMContentLoaded", function (e) {
    let quizList = new QuizList();
    let correct = new Correct();

    let btnQuiz = document.getElementById("btnQuiz"); //knapp för att generera quiz;
    let btnSubmit = document.getElementById("btnSubmit"); // knapp för att lägga till användar_namn
    let div_hide = document.getElementById("hide")
    let div_input = document.getElementById("input");
    let btnCorrect = document.getElementById("btnCorrect"); //knapp för att rätta quiz
    let btnNext = document.getElementById("btnNext"); // knapp för att trycka fram en fråga i taget



    btnSubmit.addEventListener("click", async function (event) { //eventlyssnare som lägger till användarnamn 

        div_input.classList.add("hide");
        div_hide.classList.remove("hide");
        btnNext.classList.add("hide");

    });

    btnQuiz.addEventListener("click", async function (e) {
        quizList.correct.emptyList();
        quizList.emptyList(); // tömmer listor i klassen correct och quizlist
        correct.emptyList();

        let select = document.getElementById("select"); //selectruta för att välja hur många frågor (5-10)

        for (let i = 0; i < select.options.length; i++) {

            let opt = select.options[i];

            if (opt.selected) { // kollar vilket val som gjorts och hämtar så många frågor som valts från quizapi

                await fetch("https://quizapi.io/api/v1/questions?apiKey=GNvppRgmDcLZEoI0NZxmrPhuP0hjrzbICmWeZGve&category=code&difficulty=Easy&limit=10&tags=JavaScript")
                    .then(response => response.json())
                    .then(data => {
                        for (let j = 0; j < i + 5; j++) {

                            let answers_and_correct = [ // object med svar och rätta svar
                                {
                                    answer: data[j].answers.answer_a,
                                    correct: data[j].correct_answers.answer_a_correct
                                },
                                {
                                    answer: data[j].answers.answer_b,
                                    correct: data[j].correct_answers.answer_b_correct
                                },
                                {
                                    answer: data[j].answers.answer_c,
                                    correct: data[j].correct_answers.answer_c_correct
                                },
                                {
                                    answer: data[j].answers.answer_d,
                                    correct: data[j].correct_answers.answer_d_correct
                                }
                            ];

                            let new_quiz = new Quiz(data[j].question, answers_and_correct); //sparar frågor, svar och rätta svar i variabeln new_quiz
                            quizList.addToList(new_quiz); // pushar in frågor och svar i en array i klassen Quizlist och klassen Correct
                            correct.addToList(new_quiz);

                        }

                    });

            }
        }

        btnNext.value = quizList.list.length; // sätter värdet på bntNext till så många frågor som valts
        btnQuiz.classList.add("hide");
        select.classList.add("hide");
        btnNext.classList.remove("hide");

        quizList.setNextQuestion(); // kallar på en funktion som ska visa nästa fråga
    });

    btnNext.addEventListener("click", function (event) {

        btnQuiz.classList.add("hide");

        quizList.setNextQuestion(); //kallar på en funktions om ska visa nästa fråga

    });

    btnCorrect.addEventListener("click", function (e) { //eventlyssnare som triggar funktion som rättar quiz

        let checkedArray = quizList.correct.checkedArray; //hämtar checkedArray från objektet quizList.correct
        correct.addToCheckedList(checkedArray); // pushar in den checkedArray till klassen Correct
        correct.compareChecked_Correct();


    });

});