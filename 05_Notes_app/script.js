const notesContainer = document.querySelector(".notes-container");
const createNoteBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function updateNote() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function getNotes() {
  let notes = localStorage.getItem("notes");
  if (notes) {
    notesContainer.innerHTML = notes;
  }
}

getNotes();

createNoteBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  img.src = "images/delete.png";
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", true);
  notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentNode.remove();
    updateNote();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((note) => {
      note.onkeyup = function () {
        updateNote();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
