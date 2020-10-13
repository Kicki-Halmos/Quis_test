class QuizList {
    constructor() {

        this.list = []; // lista med frågor, svar och rätta svar
        this.currentQuestion = 0;
        this.number = 1; // nr som ska visa vilken fråga vi är på 
        this.id_nr = 1; // id nr som ger checkboxar individuella id:n
        this.correct = new Correct(); // skapar ett nytt objekt av klassen Correct

        //let self = this;

    }
    addToList(new_quiz) {
        this.list.push(new_quiz); //pushar frågor svar och rätta svar till this.list
    }

    emptyList() {
        this.list = []; // återställer variabler till utgångsläge
        this.number = 1;
        this.id_nr = 1;
        this.currentQuestion = 0;

    }
    

    setNextQuestion() {
        this.updateQuiz(this.list[this.currentQuestion]); //loopar igenom this.list och skickar en fråga i taget till funktionen updateQuis()

        this.currentQuestion++;

        this.correct.keepCheckedCheckboxes(); // kallar på en funktion för att hämta icheckade checkboxar

        let btnNext = document.getElementById("btnNext")

        if (btnNext.value > 0) { // minkar btnNext så att den försvinner vid sista frågan och ersätts av btnCorrect
            btnNext.value--;
        }
        if (btnNext.value == 0) {
            btnNext.classList.add("hide");
            btnCorrect.classList.remove("hide");
        }

    }

    updateQuiz(question) { //metod som tar emot en parameter från setNextQuestion, en fråga i taget med svar

        let div = document.getElementById("quiz");
        div.innerHTML = "";

        let h = document.createElement("h4");
        h.textContent = "Fråga " + this.number + "/" + this.list.length + ": " + question.question; //skriver ut frågan och vilket nr vi är på
        div.appendChild(h);

        let p_a = document.createElement("p");
        p_a.innerHTML = "Svarsalternativ: ";
        div.appendChild(p_a);

        question.answers.forEach(answer => { //loopar igenom alla möjliga svar
            let checkbox = document.createElement("input"); //skapar checkbox
            checkbox.setAttribute("type", "checkbox");

            //checkbox.setAttribute("class", "checkbox");


            let answer_printout = document.createElement("span");
            answer_printout.textContent = answer.answer; //tar fram svar
            if (answer_printout.innerHTML !== "") { //om svaret inte är tomt så skrivs det ut
                checkbox.setAttribute("id", "checkbox_" + this.id_nr); //ger checkboxen ett individuellt id
                div.appendChild(checkbox);
                div.appendChild(answer_printout);
                this.id_nr++; //plussar på id_nr 

            }

            let br = document.createElement("br");
            div.appendChild(br);

        });

        this.number++; //plussar på frågenummer

    }

}