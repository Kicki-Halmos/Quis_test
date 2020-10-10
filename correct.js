class Correct {
    constructor(){
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
        this.checkedArray = [];
        //this.quiz_list = new QuizList();
        
        
    }

    emptyList() {
        this.list = [];
    }

    addToList(new_quiz) {
        this.list.push(new_quiz);   //pushar in alla frågor, svar och rätta svar i this.list
    }

    addToCheckedList(checkbox){
        
        this.checkedArray.push(checkbox);
        //console.log(this.checkedArray);
        
       //this.compareChecked_Correct(this.checked);
        
    }
    

    keepCheckedCheckboxes(){
        let self = this;
        let div = document.getElementById("quiz");
        let checked = document.getElementsByClassName("checkbox");
        console.log(div);
        
       
        let btnNext = document.getElementById("btnNext");
        for (let item of checked){
           
            let each_question = [];
            item.addEventListener('click', function (){
                console.log("click");
            if (item.checked){
                
                
                self.addToCheckedList(item.id);
                
                //each_question.push(item.nextElementSibling.textContent);
                
            }
            //console.log(each_question);
            //self.check.push(each_question);
            //self.addToCheckedList(self.check);
            //console.log(check);
           
            });
           
   

        }
        
        //console.log(each_question);
        

    }

    printResult(result){           // metod för att skriva ut poängresultatet (result)
        let div_quiz= document.getElementById("quiz");
        let div_result = document.createElement("div");
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
        select.classList.remove("hide");




    }
    compareChecked_Correct() { 

       
        
        // metod för att räkna ut poäng
        let checkedArray = this.checkedArray;
        //console.log(checkedArray)
        
       
        //console.log(checkedArray);
        let result = 0;
        let id_nr = 1;
        let checked = 0;
        //let checkbox;
        //console.log(this.checkedArray.includes("checkbox_1"));
        for (let question of this.list) {  //loopar igenom alla frågor i this.list
            let correct = [];  // en array som ska fyllas med svar och rätt svar "true" eller "false"
            let checked = []; // en array som ska fyllas med icheckade checkboxar
            let checked_per_question = [];
           
            for (let answer of question.answers) {  //loopar igenom alla svar per fråga

              
                let current_answers = {            // skapar ett objekt med svar och rätt svar "true" eller "false"
                id: "checkbox_" + id_nr,
                correct: answer.correct
            }   
                
                   // pushar in objektet i correct arrayen

                answer = answer.answer;           // säkerställer att vi inte får med några svar som är = null
                if (answer != null) {  
                    
                    correct.push(current_answers);
                    checked = checkedArray[0].includes("checkbox_" + id_nr);
                    if (checked){
                        checked_per_question.push("checkbox_" + id_nr);
                        console.log("det funka! checkbox_" + id_nr);
                    }

                    id_nr++;
                    //let checkbox = checkedArray.includes("checkbox_");
                    //if (checkbox){
                        //document.getElementById("ckeckbox_" + id_nr)
                   // console.log("true");  //letar reda på checkbox som är kopplat till den specifika frågan vi är på i loopen
                    /*if (checkbox.checked) {                                    // pushar in den i checkedArray om den är icheckad
                        checkedArray.push(checkbox);

                    }*/
                  
                }
                }
            

        let multipleCorrectArray = [];                                  // array som ska fyllas med alla rätta svar
            multipleCorrectArray = correct.filter((value, index, array) => {  // lambda-funktion för att hitta alla rätta svar i arrayen correct
                if (value.correct === "true") {
                    return value;
                }
            });

            //console.log(checked_per_question);
            //console.log(multipleCorrectArray);
        
          
            // kollar ifall det finns flera rätta svar per fråga, ger bara päng ifall alla är ikryssade. om det finns ett rättsvar så får bara ett alternativ vara ikryssat för att få poäng
            if (checked_per_question.length == 2 && multipleCorrectArray.length == 2 && checkedArray[0] == multipleCorrectArray[0].id && checkedArray[1] === multipleCorrectArray[1].id) {
                result++;
                console.log("resultat tvåsvar: " + result);
            } 
            else if (checked_per_question.length == 1 && multipleCorrectArray.length == 1 && checked_per_question[0] == multipleCorrectArray[0].id) {
                result++;
                
            }
            //console.log(result);
        }
        
        this.printResult(result); //anropar funktion för att skriva ut hur många poäng användaren fått
        

    }

        }




