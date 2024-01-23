// common function
function createEl(parent, el, className) {
  const item = parent.appendChild(document.createElement(el));
  if (className !== undefined) {
    item.classList.add(className);
  }
  return item;
}

// content
(function () {
  var ohouseContent = {
    swiperEvt: function () {
      const itemList = [
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/167964371098559223.png?w=850",
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/168387762823879187.png?w=850",
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/168179457024772546.png?w=850",
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/168016842438804733.png?w=850",
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/166694889965027078.jpg?w=850",
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/168387789709017524.png?w=850",
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/168268331524564933.png?w=850",
      ];

      const mainSwiperContainer = document.querySelector(".main-swiper");
      const swiperWrapper = document.querySelector(
        ".main-swiper .swiper-wrapper"
      );

      itemList.forEach((item, i) => {
        const swiperSlide = swiperWrapper.appendChild(
          document.createElement("a")
        );
        swiperSlide.setAttribute("href", "#");
        swiperSlide.classList.add("swiper-slide");
        const img = swiperSlide.appendChild(document.createElement("img"));
        img.setAttribute("src", item);
      });

      const mainSwiper = new Swiper(".main-swiper", {
        // Optional parameters
        loop: true,
        autoplay: {
          delay: 5000,
        },
        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          // hiddenClass: ".hidden",
        },

        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });

      const prev = document.querySelector(".main-swiper .swiper-button-prev");
      const next = document.querySelector(".main-swiper .swiper-button-next");

      prev.classList.add("swiper-button-hidden");
      next.classList.add("swiper-button-hidden");

      mainSwiper.el.onmouseenter = () => {
        console.log("block");
        prev.classList.remove("swiper-button-hidden");
        next.classList.remove("swiper-button-hidden");
      };

      mainSwiper.el.onmouseleave = (e) => {
        console.log("hidden");
        prev.classList.add("swiper-button-hidden");
        next.classList.add("swiper-button-hidden");
      };
    },

    setShortcut: function () {
      const SHORTCUT_ICON = [
        {
          name: "쇼핑하기",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167262690767101882.png?w=256",
          link: "#",
        },
        {
          name: "초여름특가",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/168347149250905476.png?w=256",
          link: "#",
        },
        {
          name: "오늘의딜",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198007152582471.png?w=256",
          link: "#",
        },
        {
          name: "취향의발견",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167505411234148010.png?w=256",
          link: "#",
        },
        {
          name: "장보기",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198009533480922.png?w=256",
          link: "#",
        },
        {
          name: "집들이",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198010271968429.png?w=256",
          link: "#",
        },
        {
          name: "꿀잼시리즈",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198011151662026.png?w=256",
          link: "#",
        },
        {
          name: "빠른배송",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198012024333402.png?w=256",
          link: "#",
        },
        {
          name: "쉬운이사",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198021046015480.png?w=256",
          link: "#",
        },
        {
          name: "리모델링",
          img: "https://image.ohou.se/i/bucketplace-v2-development/uploads/shortcut/home_feed_shortcut_sets/167198022841390557.png?w=256",
          link: "#",
        },
      ];
      const secShortcut = document.querySelector(".shortcut-area");
      SHORTCUT_ICON.forEach((item, i) => {
        const listItem = createEl(secShortcut, "a", "item");
        listItem.setAttribute("href", item.link);
        const img = createEl(listItem, "img");
        img.setAttribute("src", item.img);
        img.setAttribute("alt", item.name);
        const name = createEl(listItem, "span", "name");
        name.innerHTML = item.name;
      });
    },

    todayDeal: function () {
      $(function () {
        $.ajax({
          url: "/data/data.json",
          type: "get",
          dataType: "json",
          success: function (data) {
            console.log("success");
            // 데이터 받아오기
            let todaysDealList = data[0].TODAYS_DEAL;
            // 데이터 생성할 엘리먼트
            const todaysDeal = document.querySelector(
              ".content.todays-deal .item-list"
            );
            const ICONPATH = `
                  <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M12 19.72l-5.677 2.405c-.76.322-1.318-.094-1.247-.906l.533-6.142-4.042-4.656c-.54-.624-.317-1.283.477-1.467l6.006-1.39L11.23 2.28c.426-.707 1.122-.699 1.542 0l3.179 5.282 6.006 1.391c.805.187 1.011.851.477 1.467l-4.042 4.656.533 6.142c.072.822-.497 1.224-1.247.906L12 19.72z"
                    ></path>    
                  </svg>`;

            const BOOKMARKPATH = {
              default: `<svg
                    class="bookmark"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_15409_67579)">
                      <g filter="url(#filter0_d_15409_67579)">
                        <path
                          d="M4.3 4.05V19.4992L10.9309 16.018C11.6003 15.6666 12.3997 15.6666 13.0691 16.018L19.7 19.4992V4.05H4.3ZM4 2.75H20C20.5523 2.75 21 3.19772 21 3.75V20.8228C21 21.1988 20.6005 21.4403 20.2676 21.2655L12.4648 17.169C12.1738 17.0162 11.8262 17.0162 11.5352 17.169L3.73242 21.2655C3.39948 21.4403 3 21.1988 3 20.8228V3.75C3 3.19771 3.44772 2.75 4 2.75Z"
                          fill="white"
                        ></path>
                        <path
                          d="M4.3 4.05V19.4992L10.9309 16.018C11.6003 15.6666 12.3997 15.6666 13.0691 16.018L19.7 19.4992V4.05H4.3Z"
                          fill="white"
                          fill-opacity="0.5"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_15409_67579"
                        x="-2"
                        y="-0.25"
                        width="28"
                        height="28.5735"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dy="2"></feOffset>
                        <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.247059 0 0 0 0 0.278431 0 0 0 0 0.301961 0 0 0 0.15 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_15409_67579"
                        ></feBlend>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_15409_67579"
                          result="shape"
                        ></feBlend>
                      </filter>
                      <clipPath id="clip0_15409_67579">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>`,

              active: `<svg
                  class="bookmark-active"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    fill="#35C5F0"
                    fill-rule="nonzero"
                    d="M12.472 17.07a.999.999 0 0 0-.944 0l-7.056 3.811A.999.999 0 0 1 3 19.998V4.502C3 3.672 3.672 3 4.5 3h15c.828 0 1.5.673 1.5 1.502v15.496a1 1 0 0 1-1.472.883l-7.056-3.811z"
                  ></path>
                </svg>`,
            };

            todaysDealList.forEach((item, i) => {
              // 데이터 갯수만큼 article과 오버레이 해줄 a 태그 생성 후 href 속성에 이동할 링크 넣어줌
              const listItem = createEl(todaysDeal, "article", "item");
              const linkOverlay = createEl(listItem, "a", "item-link");
              linkOverlay.setAttribute("href", item.link);

              // 생성한 element에 이미지를 넣을 div와 텍스트를 넣을 div 각각 생성
              const imgBox = createEl(listItem, "div", "img-box");
              const textBox = createEl(listItem, "div", "text-box");

              // div.img-box에 img 태그와 속성 생성, 데이터 넣어줌, 북마크 아이콘 생성
              const img = createEl(imgBox, "img");
              img.setAttribute("src", item.img);
              img.setAttribute("alt", item.alt);
              const bookmarkBtn = createEl(imgBox, "button");
              bookmarkBtn.classList.add("btn-bookmark");
              bookmarkBtn.innerHTML =
                BOOKMARKPATH.default + BOOKMARKPATH.active;
              // const bookmarkActive = bookmarkBtn.querySelector('.bookmark-active');
              bookmarkBtn.onclick = (e) => {
                e.bubbles = false;
                console.log(e.bubbles);
                bookmarkBtn.classList.toggle("active");
              };

              // div.text-box에 각각 element 생성 후 데이터 넣어주기
              const brand = createEl(textBox, "span", "brand");
              const name = createEl(textBox, "p", "name");
              // 가격: [할인율, 가격]
              const priceLine = createEl(textBox, "div", "line");
              const rate = createEl(priceLine, "span", "rate");
              const price = createEl(priceLine, "span", "price");
              // 리뷰: [별점, 리뷰수]
              const reviewLine = createEl(textBox, "div", "line");
              const icon = createEl(reviewLine, "i", "icon");
              const avg = createEl(reviewLine, "span", "avg");
              const review = createEl(reviewLine, "span", "review");
              // 컬러박스 태그: [무료배송, 특가]
              const tagLine = createEl(textBox, "div", "line");
              brand.innerHTML = item.brand;
              name.innerHTML = item.name;
              rate.innerHTML = `${item.rate}%`;
              price.innerHTML = item.price;
              icon.innerHTML = ICONPATH;
              avg.innerHTML = item.avg;
              review.innerHTML = `리뷰 ${item.review}`;
            });
            const lastSlide = createEl(todaysDeal, "div", "swiper-slide");
            const callToAction = createEl(lastSlide, "a", "btn-cta-more");
            callToAction.setAttribute("href", "#");
            const arrowIcon = createEl(callToAction, "i");
            const text = createEl(callToAction, "span");
            text.innerHTML = "더보기";

            const todayDealSwiper = new Swiper(".todays-deal-swiper", {
              slidesPerView: 2.3,
              slidesPerGroup: 1,
              spaceBetween: 16,
              breakpoints: {
                768: {
                  spaceBetween: 16,
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                1024: {
                  spaceBetween: 20,
                },
              },
              loop: false,
              // autoplay: {
              //   delay: 5000,
              // },

              // Navigation arrows
              navigation: {
                nextEl: ".todays-deal .swiper-button-next",
                prevEl: ".todays-deal .swiper-button-prev",
                hiddenClass: ".hidden",
              },
            });
            const swiperSlide = document.querySelectorAll(
              ".todays-deal-swiper .item"
            );
            swiperSlide.forEach((item) => {
              item.classList.add("swiper-slide");
            });
          },
          error: function () {
            console.log("error");
          },
        });
      });
    },

    setMainData: function () {
      const BOOKMARKPATH = {
        default: `<svg
              class="bookmark"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_15409_67579)">
                <g filter="url(#filter0_d_15409_67579)">
                  <path
                    d="M4.3 4.05V19.4992L10.9309 16.018C11.6003 15.6666 12.3997 15.6666 13.0691 16.018L19.7 19.4992V4.05H4.3ZM4 2.75H20C20.5523 2.75 21 3.19772 21 3.75V20.8228C21 21.1988 20.6005 21.4403 20.2676 21.2655L12.4648 17.169C12.1738 17.0162 11.8262 17.0162 11.5352 17.169L3.73242 21.2655C3.39948 21.4403 3 21.1988 3 20.8228V3.75C3 3.19771 3.44772 2.75 4 2.75Z"
                    fill="white"
                  ></path>
                  <path
                    d="M4.3 4.05V19.4992L10.9309 16.018C11.6003 15.6666 12.3997 15.6666 13.0691 16.018L19.7 19.4992V4.05H4.3Z"
                    fill="white"
                    fill-opacity="0.5"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_15409_67579"
                  x="-2"
                  y="-0.25"
                  width="28"
                  height="28.5735"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood
                    flood-opacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy="2"></feOffset>
                  <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.247059 0 0 0 0 0.278431 0 0 0 0 0.301961 0 0 0 0.15 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_15409_67579"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_15409_67579"
                    result="shape"
                  ></feBlend>
                </filter>
                <clipPath id="clip0_15409_67579">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>`,

        active: `<svg
            class="bookmark-active"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#35C5F0"
              fill-rule="nonzero"
              d="M12.472 17.07a.999.999 0 0 0-.944 0l-7.056 3.811A.999.999 0 0 1 3 19.998V4.502C3 3.672 3.672 3 4.5 3h15c.828 0 1.5.673 1.5 1.502v15.496a1 1 0 0 1-1.472.883l-7.056-3.811z"
            ></path>
          </svg>`,
      };
      const setBasicTypeList = (list, data) => {
        data.forEach((item, i) => {
          // 데이터 갯수만큼 article과 오버레이 해줄 a 태그 생성 후 href 속성에 이동할 링크 넣어줌
          const listItem = createEl(list, "article", "item");
          const linkOverlay = createEl(listItem, "a", "item-link");
          linkOverlay.setAttribute("href", item.link);

          // 생성한 element에 이미지를 넣을 div와 텍스트를 넣을 div 각각 생성
          const imgBox = createEl(listItem, "div", "img-box");
          const textBox = createEl(listItem, "div", "text-box");

          // div.img-box에 img 태그와 속성 생성, 데이터 넣어줌, 북마크 아이콘 생성
          const img = createEl(imgBox, "img");
          img.setAttribute("src", item.img);
          img.setAttribute("alt", item.alt);
          const bookmarkBtn = createEl(imgBox, "button");
          bookmarkBtn.classList.add("btn-bookmark");
          bookmarkBtn.innerHTML = BOOKMARKPATH.default + BOOKMARKPATH.active;
          bookmarkBtn.onclick = (e) => {
            e.bubbles = false;
            console.log(e.bubbles);
            bookmarkBtn.classList.toggle("active");
          };
          const title = createEl(textBox, "span", "item-title");
          const text = createEl(textBox, "span", "item-text");
          title.innerHTML = item.title;
          text.innerHTML = item.text;
        });
      };

      $.getJSON("/data/data.json").done(function (data) {
        const weeklyHomeBest = data[0].WEEKLY_HOME_BEST;
        const el = document.querySelector(".room-weekly-best .item-list");
        setBasicTypeList(el, weeklyHomeBest);

        const epOriginal = data[0].EP_ORIGINAL;
        const epOriginalEl = document.querySelector(
          ".editor-pick-original .item-list"
        );
        setBasicTypeList(epOriginalEl, epOriginal);
      });
    },

    init: function () {
      this.swiperEvt();
      this.setShortcut();
      this.todayDeal();
      this.setMainData();
    },
  };
  ohouseContent.init();
})();
