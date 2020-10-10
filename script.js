document.addEventListener("DOMContentLoaded", function (e) {
    let quizList = new QuizList();
    let correct = new Correct();

    let btnQuiz = document.getElementById("btnQuiz"); //knapp för att generera quiz;
    let btnSubmit = document.getElementById("btnSubmit"); // knapp för att lägga till användar_namn
    let div_hide = document.getElementById("hide")
    let div_input = document.getElementById("input");
    let btnCorrect = document.getElementById("btnCorrect"); //knapp för att rätta quiz
    let btnNext = document.getElementById("btnNext"); // knapp för att trycka fram en fråga i taget
    let select = document.getElementById("select");
    /*   fetch("https://quizapi.io/api/v1/questions?apiKey=GNvppRgmDcLZEoI0NZxmrPhuP0hjrzbICmWeZGve&category=code&difficulty=Easy&limit=10&tags=JavaScript")
           .then(response => response.json())
           .then(data => {
               for (let i = 0; i < 10; i++) {

                   let answers_and_correct = [{
                           answer: data[i].answers.answer_a,
                           correct: data[i].correct_answers.answer_a_correct
                       },
                       {
                           answer: data[i].answers.answer_b,
                           correct: data[i].correct_answers.answer_b_correct
                       },
                       {
                           answer: data[i].answers.answer_c,
                           correct: data[i].correct_answers.answer_c_correct
                       },
                       {
                           answer: data[i].answers.answer_d,
                           correct: data[i].correct_answers.answer_d_correct
                       }
                   ];

                   let new_quiz = new Quiz(data[i].question, answers_and_correct);
                   quizList.addToList(new_quiz); // pushar in frågor och svar i en array i klassen Quizlist och klassen Correct
                   correct.addToList(new_quiz);
               }*/


    btnSubmit.addEventListener("click", async function (event) { //eventlyssnare som lägger till användarnamn 

        div_input.classList.add("hide");
        div_hide.classList.remove("hide");
        btnNext.classList.add("hide");

    });

    btnQuiz.addEventListener("click", async function (e) {
       
        
        let select = document.getElementById("select");
        

        for (let i = 0; i < select.options.length; i++) {

            let opt = select.options[i];
           
            if (opt.selected) {

                

               await fetch("https://quizapi.io/api/v1/questions?apiKey=GNvppRgmDcLZEoI0NZxmrPhuP0hjrzbICmWeZGve&category=code&difficulty=Easy&limit=10&tags=JavaScript")
                    .then (response => response.json())
                    .then(data => { 
                            for (let j = 0; j < i + 5; j++) {
                                console.log("hej");

                                let answers_and_correct = [
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
                               
                                let new_quiz = new Quiz(data[j].question, answers_and_correct);
                                quizList.addToList(new_quiz); // pushar in frågor och svar i en array i klassen Quizlist och klassen Correct
                                correct.addToList(new_quiz);
                                //console.log(quizList.list);
                            }
                            

                        });
                    
            }
        }
        btnNext.value = quizList.list.length; 
        btnQuiz.classList.add("hide");
        select.classList.add("hide");
        btnNext.classList.remove("hide");
        
        quizList.setNextQuestion();
    });

    btnNext.addEventListener("click", function (event) {

        // hämtar nytt quiz från quizapi
        //sparar frågor, svar och rätta svar i variabeln new_quiz


        btnQuiz.classList.add("hide");

        quizList.setNextQuestion(); // skriver ut frågor + svar


        


        /* let checkbox = document.getElementById("checkbox_1");
         console.log(checkbox);

         if (checkbox.checked){
             console.log("checked");
         }*/


    });




let checkedArray = quizList.correct.checkedArray;
correct.addToCheckedList(checkedArray);

for (i = 0; i < 10; i++) {


}

btnCorrect.addEventListener("click", function (e) { //eventlyssnare som triggar funktion som rättar quiz
correct.compareChecked_Correct();
});

//btnNext.classList.add("hide");



//console.log(quizList.correct.checkedArray);

});