document.addEventListener("DOMContentLoaded", function (e) {
    let quizList = new QuizList();  
    let correct = new Correct();    

    let btnQuiz = document.getElementById("btnQuiz");  //knapp för att generera quiz;
    let btnSubmit = document.getElementById("btnSubmit"); // knapp för att lägga till användar_namn
    let div_hide = document.getElementById("hide")
    let div_input = document.getElementById("input");
    let btnCorrect = document.getElementById("btnCorrect"); //knapp för att rätta quiz

    btnSubmit.addEventListener("click", function(event){ //eventlyssnare som lägger till användarnamn 
        
        div_input.classList.add("hide");
        div_hide.classList.remove("hide");
    });

    btnQuiz.addEventListener("click", function (event) {

        quizList.emptyList();  
        correct.emptyList();

        // hämtar nytt quiz från quizapi
        fetch("https://quizapi.io/api/v1/questions?apiKey=GNvppRgmDcLZEoI0NZxmrPhuP0hjrzbICmWeZGve&category=code&difficulty=Easy&limit=10&tags=JavaScript")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < 10; i++) {

                    let answers_and_correct = [
                       {answer: data[i].answers.answer_a, correct: data[i].correct_answers.answer_a_correct},
                       {answer: data[i].answers.answer_b, correct: data[i].correct_answers.answer_b_correct},
                       {answer: data[i].answers.answer_c, correct: data[i].correct_answers.answer_c_correct},
                       {answer: data[i].answers.answer_d, correct: data[i].correct_answers.answer_d_correct}
                    ];
                   
                    let new_quiz = new Quiz(data[i].question, answers_and_correct);  //sparar frågor, svar och rätta svar i variabeln new_quiz


                    quizList.addToList(new_quiz); // pushar in frågor och svar i en array i klassen Quizlist och klassen Correct
                    correct.addToList(new_quiz);  

                    quizList.updateQuiz();      // skriver ut frågor + svar
 
                }
                btnQuiz.classList.add("hide");
                btnCorrect.classList.remove("hide");
                
            });

    });
    
    
    btnCorrect.addEventListener("click", function(e){  //eventlyssnare som triggar funktion som rättar quiz
        correct.compareChecked_Correct();

    })
});