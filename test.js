let elements = [];
let element = {
    id: "element_1",
    tag: "p",
    innerHTML: "Lorem ipsum 1"
}
elements.push(element);
element = {
    id: "element_2",
    tag: "p",
    innerHTML: "Lorem ipsum 2"
}
elements.push(element);
element = {
    id: "element_3",
    tag: "p",
    innerHTML: "Lorem ipsum 3"
}
elements.push(element);
element = {
    id: "element_4",
    tag: "p",
    innerHTML: "Lorem ipsum 4"
}
elements.push(element);
//let el3 = document.getElementById("element_3");
//let el3 = elements[2];
console.log(elements);
/*
let new_array = [1,2,3,4].map(current_value => { current_value * 2})
console.log(new_array); // [2, 4, 6, 8]
*/
let new_elements = elements.map(current_element => { 
    return { id: current_element.id }
});
console.log(new_elements);