const addText = document.querySelector("input.add-text");
const addButt = document.querySelector(".btn");
const ul = document.querySelector("ul");

addButt.addEventListener("click", function (e) {
  const li = document.createElement("li");

  const inputCircle = document.createElement("input");
  inputCircle.className = "circle";
  inputCircle.type = "checkbox";

  const spanDesc = document.createElement("span");
  spanDesc.className = "description";
  spanDesc.textContent = addText.value;

  const buttonDelete = document.createElement("button");
  buttonDelete.className = "delete";
  buttonDelete.textContent = `x`;

  li.appendChild(inputCircle);
  li.appendChild(spanDesc);
  li.appendChild(buttonDelete);

  ul.appendChild(li);

  storeToLocalStorage(addText.value);

  addText.value = "";

  e.preventDefault();
});

ul.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.children[1].textContent);
  }
});

function storeToLocalStorage(add) {
  let newText;
  if (localStorage.getItem("toDoList") === null) {
    newText = [];
  } else {
    newText = localStorage.getItem("toDoList").split(",");
  }

  newText.push(add);

  localStorage.setItem("toDoList", newText);
}

document.addEventListener("DOMContentLoaded", function (e) {
  let newText;
  if (localStorage.getItem("toDoList") === null) {
    newText = [];
  } else {
    newText = localStorage.getItem("toDoList").split(",");
  }

  for (let item of newText) {
    const li = document.createElement("li");

    const inputCircle = document.createElement("input");
    inputCircle.className = "circle";
    inputCircle.type = "checkbox";

    const spanDesc = document.createElement("span");
    spanDesc.className = "description";
    spanDesc.textContent = item;

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "delete";
    buttonDelete.textContent = `x`;

    li.appendChild(inputCircle);
    li.appendChild(spanDesc);
    li.appendChild(buttonDelete);

    ul.appendChild(li);
  }
});


function removeFromLocalStorage(add) {
  let newText;
  if (localStorage.getItem("toDoList") === null) {
    newText = [];
  } else {
    newText = localStorage.getItem("toDoList").split(",");
  }

  for (let i = 0; i < newText.length; i++) {
    if (newText[i] === add) {
      newText.splice(i, 1);
    }
    if (newText.length === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem("toDoList", newText);
    }
  }
}

const searchBox = document.querySelector("input.search");

searchBox.addEventListener("keyup", function () {
  for (let search of ul.children) {
    if (search.textContent.indexOf(searchBox.value) !== -1) {
      search.style.display = "block";
    } else {
      search.style.display = "none";
    }
  }
});