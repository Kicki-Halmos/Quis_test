class Correct {
    constructor() {

        this.list = [];  //lista med alla frågor, svar och rätta svar
        this.checkedArray = [];  //lista med alla icheckade checkboxar
        
    }

    emptyList() {
        this.list = [];         // nollställer listor
        this.checkedArray = [];
    }

    addToList(new_quiz) {
        this.list.push(new_quiz); //pushar in alla frågor, svar och rätta svar i this.list
    }

    addToCheckedList(checkbox) {

        this.checkedArray.push(checkbox);  //pushar in alla icheckade checkboxar i checkedArray
        console.log(this.checkedArray)

    }


    keepCheckedCheckboxes() {
        let self = this;
        let div = document.getElementById("quiz");
        let current_question_checked = [];  //array som håller icheckade checkboxar per fråga
        let array_to_checkedArray = [];  //array som tar emot icheckade checkboxar och skickar de vidare


        div.addEventListener("click", function (event) {

            if (event.target.tagName == "INPUT") {   //säkerställer att det som klickas är en checkbox
                if (event.target.checked) {   //kollar om checkboxen är iklickad eller inte
                    current_question_checked.push(event.target.id);  //om den är icheckad så ska den pushas in i current_question_checked
                } else {
                    current_question_checked.splice(0, 1, );  //om man ångrar sig och checkar ur sin checkbox så ska den raderas
                }
            }

            array_to_checkedArray.splice(0, 1, current_question_checked);  //raderar värdet i array_to_checkedArray och ersätter det med nytt värde från current_question_checked
            console.log(array_to_checkedArray);                                                               
        });

        this.addToCheckedList(array_to_checkedArray); //skickar vidare värdet till addToCheckedList();
        console.log(array_to_checkedArray);
    }


    printResult(result) { // metod för att skriva ut poängresultatet (result)
        let div_quiz = document.getElementById("quiz");
        //let div_result = document.createElement("div");
        let p_result = document.createElement("h4");
        let user_name = document.getElementById("name").value;
        let btnCorrect = document.getElementById("btnCorrect");
        let btnQuiz = document.getElementById("btnQuiz");
        let select = document.getElementById("select");
        btnQuiz.innerHTML = "Nytt quiz";
        p_result.innerHTML = user_name + " din poäng är: " + result;

        div_quiz.appendChild(p_result);
        btnCorrect.classList.add("hide");
        btnQuiz.classList.remove("hide");
        select.classList.remove("hide")




    }
    compareChecked_Correct() {   // metod för att räkna ut poäng

        let checkedArray = this.checkedArray[0][0];  //hämtar icheckade checkboxar
        console.log(checkedArray[0]);
        let result = 0;
        let id_nr = 1;  //används för att leta efter checkboxarnas idn
        //let checked = 0;
       

        for (let question of this.list) { //loopar igenom alla frågor i this.list
            let correct = []; // en array som ska fyllas med svar och rätt svar "true" eller "false" per fråga
            let checked = []; // en array som används för att testa vilka checkboxar som klickats i per fråga
            let checked_per_question = []; // en array som håller de icheckade checkboxar per fråga

            for (let answer of question.answers) { //loopar igenom alla svar per fråga


                let current_answers = { // skapar ett objekt med id och rätt svar "true" eller "false"
                    id: "checkbox_" + id_nr,  // sätter egenskapen id till värde som ska matcha checkboxarnas id
                    correct: answer.correct
                }

                answer = answer.answer; 
                if (answer != null) {   // säkerställer att vi inte får med några svar som är = null

                    correct.push(current_answers);  // pushar in objektet current_answers i correct arrayen
                    checked = checkedArray[0].includes("checkbox_" + id_nr);  //testar ifall det finns en checkbox med det id vi är på nu i checkedArray

                    if (checked) {
                        checked_per_question.push("checkbox_" + id_nr);  //pushar in checkbox + id till checked_per_question
                        
                    }

                    id_nr++;
                
                }
            }


            let multipleCorrectArray = []; // array som ska fyllas med alla rätta svar
            multipleCorrectArray = correct.filter((value, index, array) => { // lambda-funktion för att hitta alla rätta svar i arrayen correct
                if (value.correct === "true") {
                    return value;
                }
            });




            // kollar ifall det finns flera rätta svar per fråga, ger bara päng ifall alla är ikryssade. om det finns ett rättsvar så får bara ett alternativ vara ikryssat för att få poäng
            if (checked_per_question.length == 2 && multipleCorrectArray.length == 2 && checkedArray[0] == multipleCorrectArray[0].id && checkedArray[1] === multipleCorrectArray[1].id) {
                result++;
                console.log("resultat tvåsvar: " + result);
            } else if (checked_per_question.length == 1 && multipleCorrectArray.length == 1 && checked_per_question[0] == multipleCorrectArray[0].id) {
                result++;

            }

        }

        this.printResult(result); //anropar funktion för att skriva ut hur många poäng användaren fått


    }

}