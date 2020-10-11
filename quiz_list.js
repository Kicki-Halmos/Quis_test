class QuizList {
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
        this.currentQuestion = 0;
        this.number = 1;
        this.id_nr = 1;
        this.correct = new Correct();
        //console.log(this.correct);
        let self = this;


        //this.correct.addToCheckedList(this.checked);
        //this.addEventListener("click", this);


    }

    /*getSelectedOption() {
            let select = document.getElementById("select");
            let opt;

            for (let i = 1; i <= select.options.length; i++) {
                opt = select.options[i];
                if (opt.selected) {

                    fetch("https://quizapi.io/api/v1/questions?apiKey=GNvppRgmDcLZEoI0NZxmrPhuP0hjrzbICmWeZGve&category=code&difficulty=Easy&limit=10&tags=JavaScript")
                        .then(response => response.json())
                        .then(data => {
                                for (let j = 0; j < i; j++) {

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
                                    this.addToList(new_quiz); // pushar in frågor och svar i en array i klassen Quizlist och klassen Correct
                                    //correct.addToList(new_quiz);
                                }

                            }
                        }
                }
            }*/
            



                addToList(new_quiz) {
                    this.list.push(new_quiz); //pushar frågor svar och rätta svar till this.list
                }

                emptyList() {
                    this.list = []; //tömmer this.list

                }

                setNextQuestion() {
                    this.updateQuiz(this.list[this.currentQuestion]);

                    this.currentQuestion++;

                   this.correct.keepCheckedCheckboxes();

                    let btnNext = document.getElementById("btnNext")
                   
                    //console.log("hej "+btnNext.value)
                    
                    if (btnNext.value > 0 ) {
                        btnNext.value--;
                        //console.log("ho " + btnNext.value);
                    }
                    if (btnNext.value == 0) {
                        btnNext.classList.add("hide");
                        btnCorrect.classList.remove("hide");
                    }


                }



                updateQuiz(question) { //metod för att skriva ut frågor och svar som finns i this.list

                    let div = document.getElementById("quiz");
                    div.innerHTML = "";



                    //loopar igenom varje index i this.list

                    let h = document.createElement("h4");
                    h.textContent = "Fråga: " + this.number + "/" + this.list.length + " " + question.question; //tar fram och skriver ut frågor från varje index
                    div.appendChild(h);

                    let p_a = document.createElement("p");
                    p_a.innerHTML = "Svarsalternativ: ";
                    div.appendChild(p_a);

                    question.answers.forEach(answer => {
                        let no = 1;
                        let checkbox = document.createElement("input");
                        checkbox.setAttribute("type", "checkbox");

                        checkbox.setAttribute("class", "checkbox");
                        checkbox.setAttribute("name", "checkbox_" + no);

                        let answer_printout = document.createElement("span");
                        answer_printout.textContent = answer.answer; //tar fram svar
                        if (answer_printout.innerHTML !== "") { //om svaret inte är tomt så skrivs det ut
                            checkbox.setAttribute("id", "checkbox_" + this.id_nr); // ger checkboxen ett individuellt id
                            div.appendChild(checkbox);
                            div.appendChild(answer_printout);
                            this.id_nr++; // plussar på id_nr 
                            no++;
                        }

                        let br = document.createElement("br");
                        div.appendChild(br);



                    });

                    /*let checked = document.getElementById("checkbox_" + this.id_nr)
                    console.log(checked);
                    for (let i=0; i < 40; i++)
                    {
                        if (checked.checked){
                            this.correct.checkedArray.push(checked);
                        }
                        this.id_nr++
                    }*/





                    this.number++; // plussar på nummer


                }

            }