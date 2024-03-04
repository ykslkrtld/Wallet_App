const tarih = document.getElementById("date");
const harcamaMiktari = document.getElementById("harMik");
const harcamaAlani = document.getElementById("harAlan");
const kaydet = document.querySelector(".kaydet");
const gelirInput = document.getElementById("gelir");
const ekleBtn = document.getElementById("ekle");
const geliriniz = document.querySelector(".gelirSonuc");
const gideriniz = document.querySelector(".giderSonuc");
const kalan = document.querySelector(".kalanSonuc");
const bilgileriTemizle = document.querySelector(".bilTemizle");
const tabloBody = document.querySelector(".tBody");

const harcamaFormu = () => {
    
    if (!tarih.value || !harcamaMiktari.value || !harcamaAlani.value) {
        alert("Lütfen eksik alanları doldurun");
        return;
    }

    let gidersatir = document.createElement("tr");
    let giderTarih = document.createElement("td");
    let giderHarcamaAlani = document.createElement("td");
    let giderTutar = document.createElement("td");
    let giderIslem = document.createElement("td");

    giderTarih.textContent = tarih.value;
    giderHarcamaAlani.textContent = harcamaAlani.value;
    giderTutar.textContent = harcamaMiktari.value;
    giderIslem.innerHTML = '<button style="background-color: red; padding: 0 10px;">Sil</button>';

    gidersatir.appendChild(giderTarih);
    gidersatir.appendChild(giderHarcamaAlani);
    gidersatir.appendChild(giderTutar);
    gidersatir.appendChild(giderIslem);

    tabloBody.appendChild(gidersatir);

    giderIslem.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
        toplamGider()
        kalanSonuc()

    });

    toplamGider()
    kalanSonuc()
};


kaydet.addEventListener("click", (e) => {
    e.preventDefault();
    harcamaFormu();
    tarih.value = "";
    harcamaMiktari.value = "";
    harcamaAlani.value = "";
});


const toplamGider = () => {
    const topGider = document.querySelectorAll(".giderTablo td:nth-child(3)");
    gideriniz.textContent = [...topGider].reduce((acc, val) => acc + Number(val.textContent), 0);
}


const toplamGelir = () => {
    geliriniz.textContent = Number(geliriniz.textContent) + Number(gelirInput.value)
}


ekleBtn.addEventListener("click", () => {
    toplamGelir()
    kalanSonuc()
    gelirInput.value = ""
})


const kalanSonuc = () => {
    kalan.textContent = Number(geliriniz.textContent) - Number(gideriniz.textContent)
    kalan.textContent < 0 ? kalan.style.color = "red" : kalan.textContent > 0 ? kalan.style.color = "green" : kalan.style.color = "black"
}

bilgileriTemizle.addEventListener("click", () => {
    kalan.textContent = "0"
    geliriniz.textContent = "0"
    gideriniz.textContent = "0"
    document.querySelector(".tBody").remove()
    kalan.textContent < 0 ? kalan.style.color = "red" : kalan.textContent > 0 ? kalan.style.color = "green" : kalan.style.color = "black"
})


gelirInput.onkeydown = function (e) {
    if (e.key === "Enter") {
      ekleBtn.click()
    }
}

