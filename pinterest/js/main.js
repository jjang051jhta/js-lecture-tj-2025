const itemList = document.querySelector(".itemList");
const btns = document.querySelectorAll("#filter ul li");
const menu = document.querySelector("#filter ul");
console.log(btns);
//유사 배열은 배열처러 보이지만 배열은 아니다.
// 즉 배열의 여러 메서드들을 전부 사용할 수는 없다.
async function loadJson() {
  const res = await fetch("../data/typo.json");
  const data = await res.json();
  console.log(data);
  let output = "";
  data.typoList.forEach((item) => {
    output += `<li class="item ${item.category}">
            <a href="title">
              <div class="img">
                <img src="../images/${item.img}" alt="" />
              </div>
              <div class="info">
                <h2>${item.title}</h2>
                <p class="desc">${item.desc}</p>
                <p class="point">
                  <span>${item.point}</span>
                </p>
              </div>
            </a>
          </li>`;
  });
  itemList.innerHTML = output;
  const iso = new Isotope(itemList, {
    // options
    itemSelector: ".item",
    layoutMode: "masonry",
  });
  imagesLoaded(itemList, () => {
    iso.layout();
  });
  console.log("iso===", iso);
  menu.innerHTML += '<li class="item www">WWW</li>';
  //자바스크립트에서 동적으로 하나 더 추가
  // btns.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     //console.log("click");
  //     console.log(item.dataset.filter);
  //     const filterItem = "." + item.dataset.filter;
  //     btns.forEach((btn) => {
  //       btn.classList.remove("on");
  //     });
  //     item.classList.add("on");
  //     iso.arrange({ filter: filterItem });
  //   });
  // });

  menu.addEventListener("click", (e) => {
    //console.log("click");
    const item = e.target.closest("li");
    if (!item) return;
    const siblings = menu.querySelectorAll("li");
    const filterItem = "." + item.dataset.filter;
    siblings.forEach((btn) => {
      btn.classList.remove("on");
    });
    item.classList.add("on");
    iso.arrange({ filter: filterItem });
  });
}
loadJson();
