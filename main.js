import { menu, buttonsData } from "./db.js";
import { elements, calculatePrice } from "./helpers.js";

//! Olay İzleyicileri
//* Sayfanın yüklenme olayını izleme
//todo burada renderMenuItems'ı ekstradan başka bir fonksiyonun çerisinde tanımlamamızın sebebi renderMenuItems'a parametre göndermemizdir.
//todo Direkt parametre gönderirsek sayfa yüklendiğinde çalışırdı.
//* Sayfa yüklendiğinde ekrana renderMenuItems fonksiyonunu çalıştır.
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});

//* Butonlar kısmında butonlara tıklanma olaylarını izler
elements.buttonsArea.addEventListener("click", searchCategory);

//! Fonksiyonlar

//* Ekrana menü elemanlarını basma
function renderMenuItems(menuItems) {
  // Dizide ki her bir obje için bir elemanı temsil eden HTML elemanı oluştur.
  // Bu HTML'i bir diziye aktar.
  // Stringe çevir.

  let menuHTML = menuItems.map((item) => {
    return `
    <a href="/productDetail.html?id=${
      item.id
    }" class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2" id="card">
        <img src=${item.img} class="rounded shadow"/>
        <div>
        <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">${calculatePrice(item.price)} &#8378;</p>
        </div>

        <p class="lead">
            ${item.desc}
        </p>
        </div>
    </a>
    `;
  });
  // diziyi stringe çevir
  menuHTML = menuHTML.join("");

  elements.menuArea.innerHTML = menuHTML;
}

//* Tıklanılan butona göre o butonun kategorisine ait ürünleri listele
function searchCategory(e) {
  const category = e.target.dataset.category;
  // Tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşenleri getir
  const filtredMenu = menu.filter((item) => item.category === category);
  // Hepsi seçilirse  bütün menüyü ekrana basar
  if (category === "all") {
    renderMenuItems(menu);
  } else {
    // Filtrelenen elemanları ekrana bas
    renderMenuItems(filtredMenu);
  }

  // Butonları güncelle
  renderButtons(category);
}

//* Ekrana butonları basma
function renderButtons(active) {
  // Eski butonları kaldırma
  elements.buttonsArea.innerHTML = "";
  // Yeni butonlar oluşturma
  buttonsData.forEach((btn) => {
    // HTML butonu oluşturma
    const buttonEle = document.createElement("button");
    // buttonEle classlarını ekleme
    buttonEle.className = "btn btn-outline-dark filter-btn";
    // İçerisindeki yazıyı değiştirme
    buttonEle.textContent = btn.text;
    // Hangi kategori olduğu bilgisini buton elementine ekleme
    buttonEle.dataset.category = btn.value;

    // Eğer ki active kategoriyle buton eşleşirse ona farklı class ver
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }
    // HTML'e gönderme
    elements.buttonsArea.appendChild(buttonEle);
  });
}
