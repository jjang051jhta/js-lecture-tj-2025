const itemList = document.querySelector(".itemList");
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
}
loadJson();
