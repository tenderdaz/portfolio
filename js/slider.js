const slider = document.querySelectorAll(".slide-container");

slider.forEach((slide) => {
  ////////////////// Setting slider//////////////////////////////////////////
  const slideWrap = slide.querySelector(".slide-wrap");
  const itemList = slideWrap.querySelectorAll(".slide-item"); // slide list
  const length = itemList.length; // page length
  const loop = slide.dataset.loop; // loop true or false
  const auto = slide.dataset.auto; // auto play true or false
  const delay = auto ? slide.dataset.delay * 1000 : ""; // auto play delay

  // Navigator
  const navi = slide.querySelector(".navigator");
  const prev = navi.querySelector(".prev");
  const next = navi.querySelector(".next");

  // Pagination
  const pagination = slide.querySelector(".pagination");

  // create "pagination button" element
  for (let i = 0; i < length; i++) {
    pagination
      .appendChild(document.createElement("button"))
      .classList.add("pagination-button");
  }
  // create "control button" element
  pagination
    .appendChild(document.createElement("button"))
    .classList.add("control");

  const buttonList = pagination.querySelectorAll(".pagination-button");
  const control = pagination.querySelector(".control");
  let pause = false;

  //   Page number box on slide
  const pageNum = slide.querySelector(".page-num .num");
  const pageTotal = slide.querySelector(".page-num .total");

  //   Navigator button on/off
  const prevOn = () => {
    // 첫 번째 페이지일 경우 버튼 off
    current == 0 ? prev.classList.remove("on") : prev.classList.add("on");
  };
  const nextOn = () => {
    // 마지막 페이지일 경우 버튼 off(순환 아닐 때)
    if (auto == false) {
      current == length - 1
        ? next.classList.remove("on")
        : next.classList.add("on");
    }
  };

  //   Pagination button on/off
  const paginationMove = () => {
    buttonList.forEach((el, i) => {
      i == current ? el.classList.add("on") : el.classList.remove("on");
    });
  };

  //   Page number box update
  const pageNumView = () => {
    pageNum.innerHTML = current + 1;
    pageTotal.innerHTML = length;
  };

  //   Move page
  const pageMove = () => {
    slideWrap.style.transition = "0.5s";
    slideWidth = slide.clientWidth;
    slideWrap.style.left = `${slideWidth * current * -1}px`;
  };

  const pageLoopMove = () => {
    slideWidth = slide.clientWidth;
    const cloneFirst = itemList[0].cloneNode(true);
    const cloneLast = itemList[length - 1].cloneNode(true);
    if (current == 0) {
      slideWrap.appendChild(cloneFirst);
      slideWrap.style.left = `${slideWidth * length * -1}px`;
      setTimeout(function () {
        slideWrap.style.transition = "0s";
        slideWrap.style.left = 0;
        slideWrap.removeChild(slideWrap.lastElementChild);
      }, 500);
    } else if (current == length - 1) {
      slideWrap.insertBefore(cloneLast, itemList[0]);
      slideWrap.style.left = 0;
      setTimeout(function () {
        slideWrap.style.transition = "0s";
        slideWrap.removeChild(slideWrap.firstElementChild);
        slideWrap.style.left = `${-(slideWidth * length - 1)}px`;
      }, 500);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      current--;
      itemList[current].classList.add("active");
      itemList[current + 1].classList.remove("active");
      if (current == 0) prev.classList.remove("on");
    } else {
      console.log("first page");
    }
    prevOn(current);
    nextOn(current);
    return current;
  };
  const goNext = () => {
    if (current < length - 1) {
      current++;
      itemList[current - 1].classList.remove("active");
      itemList[current].classList.add("active");
    } else if (current == length - 1 && loop) {
      itemList[current].classList.remove("active");
      current = 0;
      itemList[current].classList.add("active");
    }
    prevOn();
    nextOn();
    return current;
  };

  const runSlider = () => {
    pageMove();
    paginationMove();
    pageNumView();
  };

  //////////////////  Run slider  ///////////////////////////////////////
  // Index of active pages
  let current = 0;
  slideWidth = slide.clientWidth;

  window.onload = () => {
    itemList[current].classList.add("active");
    slideWrap.style.transition = ".5s";

    //   navigator button
    //   슬라이드 갯수가 2개 이상이고 현재 페이지가 마지막이 아닐 때
    if (length > 1 && current < length - 1) {
      next.classList.add("on");
    }

    //   pagination button
    paginationMove();
    //   page number box
    pageNumView();
  };

  // autoplay
  if (auto) {
    let autoPlay = setInterval(() => {
      current = goNext();
      runSlider();
    }, delay);

    //   control
    control.onclick = () => {
      console.log(pause);
      if (pause == false) {
        pause = true;
        clearInterval(autoPlay);
        control.classList.add("pause");
      } else {
        pause = false;
        autoPlay = setInterval(() => {
          current = goNext();
          runSlider();
        }, delay);
        control.classList.remove("pause");
      }
    };
  }

  //navigator
  next.onclick = () => {
    current = goNext();
    if (current == 0) {
      pageLoopMove();
    } else {
      pageMove();
    }
    paginationMove();
    pageNumView();
  };

  prev.onclick = () => {
    current = goPrev();
    runSlider();
  };

  //   pagination
  buttonList.forEach((el, i) => {
    el.onclick = () => {
      // buttonList[current].classList.remove("on");
      itemList[current].classList.remove("active");
      // el.classList.add("on");
      current = i;
      itemList[i].classList.add("active");
      nextOn();
      prevOn();
      runSlider();
      pageNumView();
    };
  });
});
