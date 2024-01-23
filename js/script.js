// Page Title
let pageTitle = document.getElementsByTagName("title");
pageTitle[0].innerHTML = "바닐라 자바스크립트";

// Header & Navigation
const header = document.getElementById("header");
const nav = document.getElementById("nav");

let prevScrollY = this.scrollY; // 스크롤 이벤트 발생 전 스크롤 위치를 저장

window.addEventListener("scroll", (e) => {
  const block = header.classList.contains("block");

  if (this.scrollY < prevScrollY && block == false) {
    // 스크롤을 올리면 sticky header 내려옴
    console.log("block");
    header.classList.add("block");
    nav.classList.add("top");
  } else if (this.scrollY > prevScrollY && block == true) {
    // 스크롤을 내리면 sticky header 올라감
    console.log("hidden");
    header.classList.remove("block");
    nav.classList.remove("top");
  }
  prevScrollY = this.scrollY; // 변경된 스크롤 위치를 다시 prevScrollY에 저장
});

// nav - scroll move
const scrollMove = (id) => {
  let height = document.getElementById(id).offsetTop - nav.offsetHeight;
  window.scrollTo({ top: height, behavior: "smooth" });
};

// wheel event
const wheelEvtWrap = document.querySelector(".wheel-event-wrap");
const wheelItemList = wheelEvtWrap.querySelectorAll("div h2");
let page = 1;
const length = wheelItemList.length;

wheelEvtWrap.onwheel = (event) => {
  const prevented = () => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (event.deltaY > 0 && page < length + 1) {
    console.log("down");

    if (window.scrollY != wheelEvtWrap.offsetTop) {
      window.scrollTo({ top: wheelEvtWrap.offsetTop, behavior: "smooth" });
    }
    prevented();
    page++;
    if (page == length + 1) {
      event.defaultPrevented = false;
      return;
    }
    wheelItemList.forEach((item, i) => {
      i == page - 1 ? item.classList.add("on") : item.classList.remove("on");
    });
  } else if (event.deltaY < 0 && page > 0) {
    console.log("up");

    if (window.scrollY != wheelEvtWrap.offsetTop) {
      window.scrollTo({ top: wheelEvtWrap.offsetTop, behavior: "smooth" });
    }
    prevented();
    page--;
    if (page == 0) {
      event.defaultPrevented = false;
      return;
    }
    wheelItemList.forEach((item, i) => {
      i == page - 1 ? item.classList.add("on") : item.classList.remove("on");
    });
  }

  console.log(page);
};
