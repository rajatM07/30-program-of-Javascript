const task = $('#input-box');
const listContainer = $("#list-container");

function addTask() {
    if (task.val()) {
        let li = $(`<li>${task.val()}</li>`);
        listContainer.append(li);
        li.append(`<span>\u00d7</span>`);
        task.val("");
        saveToLocalStorage();
    } else {
        alert("Please enter a task");
    }
}

listContainer.on("click", function (event) {
    var targetElement = event.target;

    if (targetElement.tagName === "LI") {
        // Toggle "checked" class on the LI element itself
        targetElement.classList.toggle("checked");
        saveToLocalStorage();
    }
    else if (targetElement.tagName === "SPAN") {
        // Remove the parent LI element if a SPAN is clicked
        targetElement.parentElement.remove();
        saveToLocalStorage();
    }
});

// listContainer.on("click", function (event) {
//     var targetElement = $(event.target); // Wrap the target in jQuery

//     if (targetElement.prop("tagName") === "LI") {
//         // Use plain JavaScript to toggle class using the raw DOM element
//         targetElement[0].classList.toggle("checked");
//     } 
//     else if (targetElement.prop("tagName") === "SPAN") {
//         // Remove the parent LI element using jQuery
//         targetElement.parent().remove();
//     }
// });

function saveToLocalStorage() {
    localStorage.setItem("data", listContainer.html());
}

function loadFromLocalStorage() {
    let data = localStorage.getItem("data");
    console.log(data);
    if (data) {
        listContainer.html(data);
    }
}

loadFromLocalStorage();



