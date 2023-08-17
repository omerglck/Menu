export const elements = {
  menuArea: document.getElementById("menu-area"),
  buttonsArea: document.getElementById("buttons-area"),
};

//* Fiyat Hesaplama Fonksiyonu
export function calculatePrice(price) {
  let newPrice = price * 15;
  newPrice = newPrice.toFixed(2);
  return newPrice;
}
