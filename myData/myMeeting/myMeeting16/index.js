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
    initColorFun();
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
  let menuDom = document.querySelector(".all-menu-btns");
  if (menuDom) {
    menuDom.addEventListener("click", changeFunction);
  }
}
function initColorFun() {
  document.querySelectorAll(".color-picker-item").forEach((item, index) => {
    if (item) {
      let id=item.id
      item.addEventListener("click", ()=>alert(id));
    }
  });
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
function showColor(isshow) {
  let partsDom = document.querySelector(".color-picker-all");
  if (isshow == true) {
    if (partsDom) {
      partsDom.classList.remove("chide");
    }
  } else {
    if (partsDom) {
      partsDom.classList.add("chide");
    }
  }
}
function changeFunction(event) {
  let idOne = event.target.id;
  if (idOne) {
    if (idOne == "ambassadors") {
      showColor(false)
    } else if (idOne == "cloths") {
      showColor(true)
    } else if (idOne == "heads") {
      showColor(true)
    } else if (idOne == "shoes") {
      showColor(true)
    } else if (idOne == "trouserss") {
      showColor(true)
    } else if (idOne == "hues") {
      showColor(false)
    } else if (idOne == "animation") {
      showColor(false)
    } else if (idOne == "parameter") {
      showColor(false)
    }
  }
}
