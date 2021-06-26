
// *设置localstorage
// localStorage.setItem("test", "测试文字");
// *读取localStorage
// console.log(localStorage.getItem("test"));
// *删除指定localStorage
// localStorage.removeItem("test");
// *清除所有localStorage
// localStorage.clear();
// *设置cookie
// document.cookie = "test=test;Max-Age=3600";

window.onload = function () {
  let colorArr = ["white", "rgb(204,232,207", "rgb(200,200,167)", "rgb(215, 179, 170)"];
  let key = 0;
  if (getCookie("key")) {
    key = getCookie("key");
  }
  document.body.style.background = colorArr[key];
  let changeSkin = document.querySelector(".changeSkin");
  changeSkin.onclick = function () {
    key++;
    key = key > 3 ? 0 : key;
    setCookie("key", key, {
      "Max-Age": 3600 * 24
    });
    document.body.style.background = colorArr[key];
  }
}

// *设置cookie
function setCookie(name, value, options = {}) {
  let cookieData = `${name}=${value}`;
  for (let key in options) {
    let str = `${key}=${options[key]}`;
    cookieData += str;
  }
  document.cookie = cookieData;
}

// *获取cookie
function getCookie(name) {
  let arr = document.cookie.split("; ");
  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split("=");
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
}

function showDetail(musicData) {
  if (localStorage.getItem("musicData")) {
    let localData = JSON.parse(localStorage.getItem("musicData"));
    if (!localData.find(v => v.id == musicData.id)) {
      localData.push(musicData);
      localStorage.setItem("musicData", JSON.stringify(localData));
    }
  } else {
    localStorage.setItem("musicData", JSON.stringify([musicData]));
  }
  console.log(musicData);
  if (!localStorage.getItem("isOpen")) {
    window.open("/detail");
  }
}