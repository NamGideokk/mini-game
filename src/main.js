"use strict";

// fetch를 통해 데이터 불러오기
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// 불러온 데이터 출력하기
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 데이터를 <li> 태그에 담기
function createHTMLString(item) {
  return `
    <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
    `;
}

// 특정 item만 불러오기 버튼
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  updateItems(items, key, value);

  // const filtered = items.filter((item) => item[key] === value);
  // displayItems(filtered);
}

// 특정 item 보이고, 사라지게 하기
function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] == value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  // 이벤트 위임 - button들이 들어있는 container를 등록해서 한곳에서 자식 button 들을 모두 이벤트 처리 한다.
  const buttons = document.querySelector(".buttons");

  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
