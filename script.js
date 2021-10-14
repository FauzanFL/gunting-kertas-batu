const txt = "Gunting Kertas Batu";
var txtIndex = 0;
var words = "";
var skorPlayer = 0;
var skorLawan = 0;

(function ngetik() {
  currentTxt = txt;
  words = currentTxt.slice(0, ++txtIndex);

  document.querySelector(".efek-ngetik").textContent = words;

  if (words.length == currentTxt.length) {
    txtIndex = 0;
  }

  setTimeout(ngetik, 400);
})();

function getPilCom() {
  const comp = Math.random();
  if (comp < 0.34) return "gunting";
  if (comp >= 0.34 && comp < 0.67) return "kertas";
  return "batu";
}

function getHasil(comp, player) {
  if (player == comp) return "SERI!";
  if (player == "gunting") return comp == "kertas" ? "MENANG!" : "KALAH!";
  if (player == "kertas") return comp == "batu" ? "MENANG!" : "KALAH!";
  if (player == "batu") return comp == "gunting" ? "MENANG!" : "KALAH!";
}

function putar() {
  const imgCom = document.querySelector(".img-komputer");
  const gambar = ["gunting", "kertas", "batu"];
  let i = 0;
  const waktuMulai = new Date().getTime();
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;
      return;
    }
    imgCom.setAttribute("src", "img/" + gambar[i++] + ".jpg");
    if (i == gambar.length) i = 0;
  }, 100);
}

const pilihan = document.querySelectorAll("li img");
pilihan.forEach(function (pil) {
  pil.addEventListener("click", function () {
    const pilCom = getPilCom();
    const pilPlayer = pil.className;
    const hasil = getHasil(pilCom, pilPlayer);

    putar();

    if (hasil == "MENANG!") skorPlayer++;
    if (hasil == "KALAH!") skorLawan++;

    const nilaiCom = setTimeout(function () {
      const imgCom = document.querySelector(".img-komputer");
      imgCom.setAttribute("src", "img/" + pilCom + ".jpg");

      document.querySelector(".nilai-lawan").textContent = skorLawan;
      document.querySelector(".nilai-player").textContent = skorPlayer;
      const info = document.querySelector(".info");
      info.innerHTML = hasil;
    }, 1000);
  });
});
