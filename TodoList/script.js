const input = document.querySelector(".input");
const input_submit = document.querySelector(".submit-btn");
const form = document.querySelector(".form");
const workList = document.querySelector(".work-list");
const workArray = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const work = { text, completed: false };
  //   console.log(work);
  workArray.push(work);
  renderWork(work);
  setLocalStorage(workArray);
  input.value = "";
});
const renderWork = function (work) {
  let html = `
  <li class="work ${work.completed ? "completed--true" : "completed--false"}">
    <span>${work.text}</span>
    <button type="button" class="toggle-btn">完成</button>
    <button type="button" class="delete-btn">🗑</button>
  </li>`;
  workList.insertAdjacentHTML("beforeend", html);
};
workList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const index = [...workList.children].indexOf(li);
  if (!li) return;
  if (e.target.classList.contains("toggle-btn")) {
    toggleState(li, index);
  }
  if (e.target.classList.contains("delete-btn")) {
    deleteWork(li, index);
  }
});
const toggleState = function (work, index) {
  work.classList.toggle("completed--true");
  work.classList.toggle("completed--false");
  workArray[index].completed = !workArray[index].completed;
  setLocalStorage(workArray);
};
const deleteWork = function (work, index) {
  work.remove();
  workArray.splice(index, 1);
  setLocalStorage(workArray);
};
const setLocalStorage = function (workListArray) {
  localStorage.setItem("todoList", JSON.stringify(workListArray));
};
const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("todoList"));
  if (!data) return;
  return data;
};
window.addEventListener("load", () => {
  const data = getLocalStorage();
  if (!data) return;
  data.forEach((work) => {
    workArray.push(work);
    renderWork(work);
  });
});
