// Page Title
let pageTitle = document.getElementsByTagName("title");
pageTitle[0].innerHTML = "오늘의집";

// Header & Navigation
const header = document.querySelector(".sticky-header");
const nav = document.getElementById("navi-bar");

let prevScrollY = window.scrollY; // 스크롤 이벤트 발생 전 스크롤 위치를 저장

window.addEventListener("scroll", (e) => {
  const navHidden = nav.classList.contains("hidden");

  if (window.scrollY < prevScrollY && navHidden) {
    // 스크롤을 올리면 navi bar 내려옴
    nav.classList.remove("hidden");
  } else if (window.scrollY > prevScrollY && navHidden == false) {
    // 스크롤을 내리면 navi bar 올라감
    nav.classList.add("hidden");
  }
  prevScrollY = window.scrollY; // 변경된 스크롤 위치를 다시 prevScrollY에 저장
});

// Top Fix bar
const topFixBar = document.querySelector(".top-fix-bar");
const topCloseBtn = topFixBar.querySelector(".btn-close");

topCloseBtn.onclick = () => {
  topFixBar.style.display = "none";
};

//Header Input
const headerSearch = document.querySelector(".header-search");
const headerSearchInput = headerSearch.querySelector("input");

headerSearchInput.onfocus = (e) => {
  e.target.parentNode.classList.add("focus");
};
headerSearchInput.onblur = (e) => {
  e.target.parentNode.classList.remove("focus");
};

// Hot Keyword
const KEYWORD = [
  { name: "이케아 책상", status: "up" },
  { name: "발뮤다 토스터기", status: "up" },
  { name: "배수구거름망", status: "new" },
  { name: "호텔 수건", status: "new" },
  { name: "선반장", status: "new" },
  { name: "홈카페장", status: "down" },
  { name: "확장형테이블", status: "up" },
  { name: "미드센츄리모던", status: "up" },
  { name: "아이르", status: "new" },
  { name: "샤오미", status: "new" },
];

const rollingKeyword = document.getElementById("keywordBox");

const createRollingList = () => {
  KEYWORD.forEach((item, i) => {
    const listItem = rollingKeyword.appendChild(document.createElement("p"));

    createEl(i + 1, "num");
    createEl(item.status, "status");
    createEl(item.name, "name");

    function createEl(v, className) {
      const el = listItem.appendChild(document.createElement("span"));
      el.classList.add(className);
      className == "status"
        ? el.classList.add(item.status)
        : (el.innerHTML = v);
    }
  });
};

createRollingList();

const rollingList = rollingKeyword.querySelectorAll("p");
const keywordPop = document.querySelector(".keyword-popup");

rollingList.forEach((item, i) => {
  const cloneItem = item.cloneNode(true);
  keywordPop.appendChild(cloneItem);
});

const keywordBoxHeight = rollingKeyword.offsetHeight;

const rollUp = { top: `${-keywordBoxHeight}rem` };
const rollDown = { top: `${keywordBoxHeight}rem` };
const rollOn = { top: 0 };
const onFix = { duration: 400, fill: "forwards" };
const downFix = { duration: 400, fill: "forwards", delay: 800 };
const reset = { duration: 400, fill: "backwards" };

let keywordIdx = 0;

setInterval(() => {
  rollingList.forEach((item, i) => {
    if (i == keywordIdx) {
      if (i > 0) {
        rollingList[i - 1].animate(rollUp, reset);
      } else if (i == 0) {
        rollingList[KEYWORD.length - 1].animate(rollUp, reset);
      }
      item.style.zIndex = "99";
      item.animate(rollOn, onFix);
    } else {
      item.style.zIndex = "0";
      item.animate(rollDown, downFix);
    }
  });

  keywordIdx++;
  keywordIdx > KEYWORD.length - 1 ? (keywordIdx = 0) : "";
}, 2000);

// common function
function createEl(parent, el, className) {
  const item = parent.appendChild(document.createElement(el));
  if (className !== undefined) {
    item.classList.add(className);
  }
  return item;
}

//
(function () {
  var ohouseScript = {
    setLogo: function () {
      const logoArea = document.querySelector("header .ohouse-logo");
      const OHOUSELOGO =
        '<svg class="logo-image" width="74" height="30" viewBox="0 0 74 30" preserveAspectRatio="xMidYMid meet"><g fill="none" fill-rule="evenodd"><path fill="#000" d="M14.2 25.17H9.28V20.7a1.45 1.45 0 0 0-2.9 0v4.47H1.44a1.45 1.45 0 1 0 0 2.9H14.2a1.45 1.45 0 0 0 0-2.9M4.5 9.15c0-4.6 2.08-5.28 3.33-5.28 1.24 0 3.33.69 3.33 5.28v.36c0 4.6-2.09 5.28-3.33 5.28-1.25 0-3.34-.69-3.34-5.28v-.36zm3.33 8.54c3.84 0 6.23-3.13 6.23-8.18v-.36c0-5.05-2.39-8.18-6.23-8.18-3.85 0-6.24 3.13-6.24 8.18v.36c0 5.05 2.39 8.19 6.24 8.19zm25.54-7.34H17.81a1.45 1.45 0 0 0 0 2.9h15.56a1.45 1.45 0 1 0 0-2.9m-1.55 15.5c-7.08 1.83-9.45.79-10.14.25-.45-.35-.65-.8-.65-1.48v-.87h10.25c.8 0 1.46-.65 1.46-1.45v-5.08c0-.8-.66-1.45-1.46-1.45h-11.7a1.45 1.45 0 1 0 0 2.9h10.25v2.18H19.57c-.8 0-1.45.65-1.45 1.45v2.32a4.6 4.6 0 0 0 1.78 3.78c1.2.93 2.94 1.39 5.21 1.39 2.05 0 4.54-.38 7.44-1.13a1.45 1.45 0 1 0-.73-2.82M20.3 7.83h10.8a1.45 1.45 0 1 0 0-2.9h-9.35V1.45a1.45 1.45 0 1 0-2.9 0v4.93c0 .8.65 1.45 1.45 1.45"></path><rect width="3" height="15" x="70" fill="#000" rx="1.5"></rect><path fill="#000" d="M64.5 13.28a1.45 1.45 0 0 0 2.73-1c-.05-.13-1-2.68-3.38-4.5l3.7-4.1a1.45 1.45 0 0 0-1.09-2.42h-9.05a1.45 1.45 0 1 0 0 2.9h5.8l-6.88 7.64a1.45 1.45 0 1 0 2.16 1.95l3.41-3.8a8 8 0 0 1 2.6 3.33M69.56 26.52h-7.01a.82.82 0 0 1-.82-.82v-1.95h8.65v1.95c0 .45-.37.82-.82.82m2.27-9.37c-.8 0-1.45.65-1.45 1.45v2.25h-8.65V18.6a1.45 1.45 0 1 0-2.9 0v7.1a3.73 3.73 0 0 0 3.72 3.72h7.01a3.73 3.73 0 0 0 3.72-3.72v-7.1c0-.8-.65-1.45-1.45-1.45M42.46 3.87c2.22 0 2.33 4.24 2.33 5.08 0 .85-.11 5.09-2.33 5.09-2.21 0-2.32-4.24-2.32-5.08 0-.86.11-5.09 2.32-5.09m0 13.07c1.76 0 3.23-.93 4.14-2.62.71-1.34 1.1-3.2 1.1-5.36s-.39-4.02-1.1-5.37A4.6 4.6 0 0 0 42.46.97c-1.76 0-3.22.93-4.13 2.62-.72 1.35-1.1 3.2-1.1 5.37s.38 4.01 1.1 5.36a4.59 4.59 0 0 0 4.13 2.62"></path><path fill="#000" d="M51.4.49c-.8 0-1.45.65-1.45 1.45v17.78c-1.93.6-5.75 1.13-10.38 1.13h-2.2a1.45 1.45 0 0 0 0 2.9h2.2c2.64 0 7.21-.23 10.38-1.02v4.84a1.45 1.45 0 0 0 2.9 0V1.94c0-.8-.65-1.45-1.45-1.45"></path></g></svg>';
      logoArea.innerHTML = OHOUSELOGO;
    },
    keywordEvt: function () {
      const btnOpen = rollingKeyword.querySelector(".btn-down");
      const btnClose = keywordPop.querySelector(".btn-up");

      btnOpen.onmouseover = () => {
        openPop(".keyword-popup");
      };

      keywordPop.onmouseleave = () => {
        closePopDelay(".keyword-popup", 500);
      };

      btnClose.onclick = () => {
        closePop(".keyword-popup");
      };

      function openPop(el) {
        const target = document.querySelector(`${el}`);
        target.classList.remove("closed");
      }
      const closePop = (el) => {
        const target = document.querySelector(`${el}`);
        target.classList.add("closed");
      };
      const closePopDelay = (el, time) => {
        setTimeout(() => {
          closePop(el);
        }, time);
      };
    },

    init: function () {
      this.keywordEvt();
      this.setLogo();
    },
  };

  ohouseScript.init();
})();
