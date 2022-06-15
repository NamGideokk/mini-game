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

loadItems()
  .then((items) => {
    displayItems(items);
  })
  .catch(console.log);
