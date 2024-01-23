// Tab
const tabContainer = document.querySelectorAll(".tab-container");

tabContainer.forEach((tab) => {
  // dataset으로 탭 개수, 이름, 활성 탭 받아오기
  const tabNum = tab.dataset.tabNum;
  const tabName = tab.dataset.tabName.split(",");
  const activeTab = tab.dataset.active - 1;

  // tab button 생성
  const div = document.createElement("div");
  tab.insertBefore(div, tab.firstChild).classList.add("btn-wrap");
  const btnWrap = tab.querySelector(".btn-wrap");

  let i = 0;
  while (i < tabNum) {
    btnWrap.appendChild(document.createElement("a")).classList.add("btn");
    let btn = btnWrap.children[i];
    btn.setAttribute("href", "javascript:;");
    btn.innerHTML = tabName[i];

    i++;
  }

  // tab 기능 구현
  const btnList = [...btnWrap.children];
  const contentList = tab.querySelectorAll(".content");

  btnList.forEach((el, i) => {
    if (i == activeTab) {
      el.classList.add("active");
      contentList[i].classList.add("active");
    }
    el.onclick = () => {
      btnList.forEach((el2, i2) => {
        if (i == i2) {
          el2.classList.add("active");
          contentList[i2].classList.add("active");
        } else {
          el2.classList.remove("active");
          contentList[i2].classList.remove("active");
        }
      });
    };
  });
});
