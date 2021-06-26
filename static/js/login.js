//  !AJAX
window.onload = function () {
  let inputStyle = document.querySelector(".inputStyle");
  let exchange = document.querySelector(".exchange");

  inputStyle.onblur = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `/checkUserName?username=${this.value}`, true);
    xhr.onload = function () {
      let obj = JSON.parse(xhr.responseText);
      exchange.innerHTML = obj.info;
      if (obj.status === 1) {
        exchange.style.color = "green";
      } else {
        exchange.style.color = "red";
      }
    }
    xhr.send();
  }
}
