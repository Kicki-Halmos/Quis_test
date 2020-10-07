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
        let currentQuestion = 0;
        

    }
    addToList(new_quiz) {
        this.list.push(new_quiz);   //pushar frågor svar och rätta svar till this.list
    }

    emptyList() {
        this.list = [];     //tömmer this.list
        
    }

    setNextQuestion(){
        this.updateQuiz(this.list[currentQuestion]);

        currentQuestion++;

    }

    updateQuiz(question) {   //metod för att skriva ut frågor och svar som finns i this.list
        
        let div = document.getElementById("quiz");
        div.innerHTML = "";
        let number = 1;  //nummer för fråga 1-10
        let id_nr = 1;   // id för checkboxar


        for (let item of this.list) {     //loopar igenom varje index i this.list

            let h = document.createElement("h4");
            h.textContent = "Fråga: " + number + " " + item.question;    //tar fram och skriver ut frågor från varje index
            div.appendChild(h);

            let p_a = document.createElement("p");
            p_a.innerHTML = "Svarsalternativ: ";
            div.appendChild(p_a);

            for (let element in item.answers) {       //loopar igenom alla svarsalternativ för varje fråga


                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");

                //checkbox.setAttribute("class", "checked");
                //checkbox.setAttribute("name", "answer");

                let answer = document.createElement("span");
                answer.textContent = item.answers[element].answer;   //tar fram svar
                if (answer.innerHTML !== "") {                       //om svaret inte är tomt så skrivs det ut
                    checkbox.setAttribute("id", "checkbox_" + id_nr);  // ger checkboxen ett individuellt id
                    div.appendChild(checkbox);
                    div.appendChild(answer);
                    id_nr++;                                           // plussar på id_nr 
                }

                let br = document.createElement("br");
                div.appendChild(br);

            }

            number++;                                                   // plussar på nummer
        }

    }

}