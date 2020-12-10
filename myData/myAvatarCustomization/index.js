(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function () {
      var clientWidth = docEl.clientWidth;

      if (!clientWidth) return;

      if (clientWidth <= 1000) {
        // 整个窗口的宽度大于等于840px的时候，fontSize为100px，

        docEl.style.fontSize = 50 + "px";
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 1920) + "px";
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
var changeValue = function (value) {
  console.log("value", value);
};

(function (doc, win) {
  window.onload = () => {
    initDomFun();
    var slider1 = new Slider("#slider1", {});
    var slider2 = new Slider("#slider2", {});
    var slider3 = new Slider("#slider3", {});
    var slider4 = new Slider("#slider4", {});

    var slider5 = new Slider("#slider5", {});
    var slider6 = new Slider("#slider6", {});
    var slider7 = new Slider("#slider7", {});
    var slider8 = new Slider("#slider8", {});

    var slider9 = new Slider("#slider9", {});
    var slider10 = new Slider("#slider10", {});
    var slider11 = new Slider("#slider11", {});
    var slider12 = new Slider("#slider12", {});
    slider1.on("slide", changeValue);
  };
})(document, window);
// 切换按钮
function initDomFun() {
  let partsDom = document.querySelector(".editavatar-parts");
  if (partsDom) {
    partsDom.addEventListener("click", changeType);
  }
  /*let menuDom = document.querySelector(".all-menu-btns");
  if (menuDom) {
    menuDom.addEventListener("click", changeFunction);
  }*/
}
function changeType(event) {
  let idOne = event.target.id;

  if (idOne) {
    document.querySelectorAll(".createMeeting-content-tab").forEach((item, index) => {
      if (!item.classList.contains("vhide")) {
        item.classList.add("vhide");
      }
    });
    document.querySelectorAll(".createMeeting-tab-item").forEach((item, index) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    if (document.querySelector(`#${idOne}Part`)) {
      document.querySelector(`#${idOne}Part`).classList.remove("vhide");
    }
    if (document.querySelector(`#${idOne}`)) {
      document.querySelector(`#${idOne}`).classList.add("active");
    }
  }
}
function changeFunction(event) {
  let idOne = event.target.id;
  if (idOne) {
    if (idOne == "ambassadors") {
      alert("更换形象");
    } else if (idOne == "cloths") {
      alert("上衣形象");
    } else if (idOne == "heads") {
      alert("头部形象");
    } else if (idOne == "shoes") {
      alert("鞋子形象");
    } else if (idOne == "trouserss") {
      alert("裤子形象");
    } else if (idOne == "hues") {
      alert("切换色调");
    } else if (idOne == "animation") {
      alert("切换动画");
    } else if (idOne == "parameter") {
      alert("随机参数");
    }
  }
}
