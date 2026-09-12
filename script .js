// Firebase Bağlantı Bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyBYnJcjxofOegdemkrX-8d8J8uvEMdg73M",
  authDomain: "mollyco-91e22.firebaseapp.com",
  projectId: "mollyco-91e22",
  storageBucket: "mollyco-91e22.firebasestorage.app",
  messagingSenderId: "1053324020246",
  appId: "1:1053324020246:web:54769db6689011133bc337",
  measurementId: "G-QZHGW4VYX0"
};

// Firebase'i güvenli şekilde başlat
// İnternet yokken Firebase yüklenemezse Molly.co yine açılabilsin
let db = null;

if (typeof firebase !== "undefined") {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (error) {
    console.log("Firebase şu anda kullanılamıyor:", error);
  }
}

// 1. Kitap Verilerimiz (50 Masal)
const books = [
  {
    id: 0,
    title: "Altınsaçlı Kız ve 3 Ayı",
    duration: "5:08",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/altn-k-z-m-zikli/a63f612a28270c404696b91e47fd6f23bde36448/alt%C4%B1nsa%C3%A7l%C4%B1%20k%C4%B1z%20ve%203%20ay%C4%B1%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/alt-n-sa-l-k-z-ve-ay-/c9b0030336ff9db32109dbf7395131407862b095/alt%C4%B1n%20sa%C3%A7l%C4%B1%20k%C4%B1z%20ve%203%20ay%C4%B1.png",
    colorClass: "card-pink",
    icon: "🐻"
  },
  {
    id: 1,
    title: "Ağustos Böceği ile Karınca",
    duration: "2:50",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/agustosb-ceises/6d8c10d3abeb62e56aa317f40ef68e8becbf633d/a%C4%9Fustos%20b%C3%B6ce%C4%9Fi%20ile%20kar%C4%B1nca%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/agustosb-ce-ikapak/e499ba077b70778b31fe546de639e7acd8f5befc/a%C4%9Fustos%20b%C3%B6ce%C4%9Fi%20ile%20kar%C4%B1nca.png",
    colorClass: "card-green",
    icon: "🐜"
  },
  {
    id: 2,
    title: "Bremen Mızıkacıları",
    duration: "4:10",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/bremen-m-zikli/ef1d04b151eb7c743e5ccff82fe8cc1868fb5cea/bremen%20m%C4%B1z%C4%B1kac%C4%B1lar%C4%B1%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/bremen-m-z-kac-lar-/bc2335a6122c5c5e71d24bad464adfc2c5e0b7d9/bremen%20m%C4%B1z%C4%B1kac%C4%B1lar%C4%B1.png",
    colorClass: "card-orange",
    icon: "🐓"
  },
  {
    id: 3,
    title: "Küçük Deniz Kızı",
    duration: "3:04",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/denizses/c12fbc2ef0dd04a77e496f8885bc69d10da70a42/k%C3%BC%C3%A7%C3%BCk%20deniz%20k%C4%B1z%C4%B1%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/denizkapak/43ee2dcfa9acbdd8878417bfeff47093c9358290/k%C3%BC%C3%A7%C3%BCk%20deniz%20k%C4%B1z%C4%B1.jpg",
    colorClass: "card-blue",
    icon: "🧜‍♀️"
  },
  {
    id: 4,
    title: "Balıkçı ile Altın Balık",
    duration: "4:14",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/bal-k-ile-alt-n-bal-k/f3a3c949fffb11e404ffffe27df878757a1f841d/bal%C4%B1k%C3%A7%C4%B1%20ve%20alt%C4%B1n%20bal%C4%B1k%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/bal-k-ile-alt-n-bal-k-kapak/a8b946dd4c83a168818c2b43c8a8d44bdf160731/ChatGPT%20Image%2015%20A%C4%9Fu%202026%2013_47_58.png",
    colorClass: "card-blue",
    icon: "🐟"
  },
  {
    id: 5,
    title: "Kurbağa Prens ile Altın Top",
    duration: "2:01",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kurbaaprensses/e03e119e68e8a23162a86e4f0d1bd00f0c097338/kurba%C4%9Fa%20prens%20ile%20alt%C4%B1n%20top%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kurbaaprenskapka/f8c07a458ded07cc5b3982e73773d7328ef4dc38/kurba%C4%9Fa%20prens%20ile%20alt%C4%B1n%20top.png",
    colorClass: "card-green",
    icon: "🐸"
  },
  {
    id: 6,
    title: "Deli Dumrul",
    duration: "4:22",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/delidumrul/main/deli%20dumrul.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/delidumrul-kapak/main/deli%20dumrul.png",
    colorClass: "card-green",
    icon: "🦅"
  },
  {
    id: 7,
    title: "12 Dans Eden Prenses",
    duration: "6:42",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/12dans-eden-ses/116c4ba453763441c23863fa531db1fd81e1d40f/12%20dans%20eden%20prenses%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/12dans-eden-/90f4ced02ea23b693032923b66e5a923b0f81496/12%20dans%20eden%20prenses.png",
    colorClass: "card-pink",
    icon: "💃"
  },
  {
    id: 8,
    title: "Kırmızı Başlıklı Kız",
    duration: "3:53",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/k-rm-z-ba-l-kl-k-z-ses/c6648e708fc53339c403b2141fc34740228a1ed1/k%C4%B1rm%C4%B1z%C4%B1%20ba%C5%9Fl%C4%B1kl%C4%B1%20k%C4%B1z%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/k-rm-z-ba-l-kl-k-z-kapak/0670d18133af89cc100fbf4cb0fd47f35cda7798/ChatGPT%20Image%2011%20A%C4%9Fu%202026%2011_40_33.png",
    colorClass: "card-pink",
    icon: "🐺"
  },
  {
    id: 9,
    title: "Külkedisi ile Sihirli Düğme",
    duration: "1:58",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/k-lkedises/aa7e1687cf966a45c6e132d6549142d2e7e2994e/k%C3%BClkedisi%20ile%20%C5%9Fansl%C4%B1%20d%C3%BC%C4%9Fme%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kulkedikapak/7750bf0fa9f7f4146838d1f8fe750e315387ea65/k%C3%BClkedisi%20ile%20%C5%9Fansl%C4%B1%20d%C3%BC%C4%9Fme.png",
    colorClass: "card-pink",
    icon: "✨"
  },
  {
    id: 10,
    title: "Akıllı Çocuk ile Ejderha",
    duration: "1:43",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/ak-ll-ocukveejderha/a4004fe2d78707b782bf838f0a0bf6527a2797f8/ak%C4%B1ll%C4%B1%20%C3%A7ocuk%20ve%20ejdaerha%20m%C3%BCzikl%C5%9Fi.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/ak-ll-cocukkapak/01b87630db080af0d448a9e24c29939da69e9b5b/ak%C4%B1ll%C4%B1%20%C3%A7ocuk%20ile%20ejderha.png",
    colorClass: "card-green",
    icon: "🧒"
  },
  {
    id: 11,
    title: "Minik Fare ile Güçlü Aslan",
    duration: "2:47",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/miniklifareses/f67f7cffe4dbaa378366b983b383b4c4bd539d6b/minik%20fare%20ile%20g%C3%BC%C3%A7l%C3%BC%20aslan%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/minikfareliaslan-kapak/7d3b017f98503fdb5d0a41f3b3ffecce410e5f17/minik%20fare%20ile%20g%C3%BC%C3%A7l%C3%BC%20aslan.jpg",
    colorClass: "card-orange",
    icon: "🦁"
  },
  {
    id: 12,
    title: "Doğa Korosunun Büyük Konseri",
    duration: "2:41",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/dost/7ffdf373f0428f90a62826242f1e7db95430f072/Do%C4%9Fa%20Korosunun%20B%C3%BCy%C3%BCk%20Konseri%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/do-akapak/707739b175598a2882c30be148311618403bf2a8/ChatGPT%20Image%2018%20A%C4%9Fu%202026%2010_41_20.png",
    colorClass: "card-green",
    icon: "🦔"
  },
  {
    id: 13,
    title: "Altın Elma Ağacı",
    duration: "1:29",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/alt-nelmases/cb77be2ad736e51343cc48a11f027271bf9f4e1e/alt%C4%B1n%20elma%20a%C4%9Fac%C4%B1%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/alt-n-elma-a-ac-/9bd5780d6a31305d336b0d5855be4b9644c37569/alt%C4%B1n%20elma%20a%C4%9Fac%C4%B1.png",
    colorClass: "card-pink",
    icon: "🍎"
  },
  {
    id: 14,
    title: "Ay Prensesi Kayuga",
    duration: "3:23",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/ay-prensesi-kayuga-ses/5903fc7f48faf5b0147ab6f3788b155fb1eec4cd/ay%20prensesi%20kayuga%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/ay-prensesi-kayuga/4294b78186b8a3dc5a9d8b90e7bc37ecfb50d4e6/ay%20prensesi%20kayuga.png",
    colorClass: "card-orange",
    icon: "🌙"
  },
  {
    id: 15,
    title: "Küçük Kara Balık",
    duration: "4:08",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/k-c-kkarases/0b2e1afb1b9b861b2f7950a19f4f5e60844c18b5/k%C3%BC%C3%A7%C3%BCk%20kara%20bal%C4%B1k%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kucukkarakapak/1a4802709d25723d9082378f8767839989fe7a7f/k%C3%BC%C3%A7%C3%BCk%20kara%20bal%C4%B1k.jpg",
    colorClass: "card-blue",
    icon: "🌊"
  },
  {
    id: 16,
    title: "Alaaddin'in Sihirli Lambası",
    duration: "6:59",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/aladdinin-sihirli-lambas-/main/alaaddinin%20sihirli%20lambas%C4%B1%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/aladdinin-sihirli-lambas-kapak/main/aladdin.png",
    colorClass: "card-orange",
    icon: "🏮"
  },
  {
    id: 17,
    title: "Mavisakal",
    duration: "2:31",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/mavi-sakal-ses-/8db72e0fe818c33ea384e523a633349c0d42b0ad/mavi%20sakal%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/mavisakalkapak/f24a3a055cb804de0041d6092eaf3db83d055517/mavi%20skal.jpg",
    colorClass: "card-orange",
    icon: "🗝️"
  },
  {
    id: 18,
    title: "Tilki ile Saf Kurt",
    duration: "1:39",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/tilkivekurt/32f38961c3cc9bcd76908d176ee38dd83309c2d5/alt%C4%B1n%20tilki%20ile%20saf%20kurt%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/tilkikapak/214798aa6f69adc347773040eb91f581d9262d71/alt%C4%B1n%20tilki%20ile%20saf%20kurt.png",
    colorClass: "card-orange",
    icon: "🦊"
  },
  {
    id: 19,
    title: "Kurnaz Tilki ile Tatlı Üzümler",
    duration: "2:00",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kurnaz-ses-/bfd9b8985240c354b40ce569baa3f5fd8af2bc8e/kurnaz%20tilki%20ile%20tatl%C4%B1%20%C3%Bcz%C3%BCmler%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kurnazkapak/26925c30efec1f477e2e3e5c4ff4df13222008a5/kurnaz%20tilki%20ile%20tatl%C4%B1%20%C3%BCz%C3%BCm.png",
    colorClass: "card-green",
    icon: "🍇"
  },
  {
    id: 20,
    title: "Rapunzel",
    duration: "3:53",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/rapunzel-ses/main/rapunzel%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/rapunzel-kapak-/main/rapunzel.png",
    colorClass: "card-blue",
    icon: "👱‍♀️"
  },
  {
    id: 21,
    title: "Yıldızları Kilitleyen Saatçi",
    duration: "3:24",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/y-ld-lzar-kilitleyensatt-ises/b66536b0586bfe231e2eeebeda770c3ad957ce9c/y%C4%B1ld%C4%B1zlar%C4%B1%20kilitleyen%20sat%C3%A7i%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/y-ld-lzar-kilitleyensatt-i/ae056bec73f11715b4b1440ef9ded9db75a643fa/y%C4%B1ld%C4%B1zlar%C4%B1%20kilitleyen%20saat%C3%A7i.png",
    colorClass: "card-green",
    icon: "⭐"
  },
  {
    id: 22,
    title: "Denizci Sinbad'ın Maceraları",
    duration: "3:21",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/denizcisinbad/main/denizci%20sinbad%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/denizci-sinbad-kaapak/main/denizci%20simbad.png",
    colorClass: "card-green",
    icon: "⛵"
  },
  {
    id: 23,
    title: "Pamuk Prenses ve Yedi Cüceler",
    duration: "4:56",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/pamuk-prenses-g-ncel/4247676d78913e21ba7f7a8aa30797652a58a040/pamukprenses.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/pamuk-kapak/main/pamuk%20prenses.png",
    colorClass: "card-pink",
    icon: "🍎"
  },
  {
    id: 24,
    title: "Çizmeli Kedi",
    duration: "5:13",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/-izmelikedi/main/%C3%A7izmeli%20kedi%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/-izmelikedikapak/main/%C3%A7izmeli%20kedi.png",
    colorClass: "card-orange",
    icon: "🐱"
  },
  {
    id: 25,
    title: "Ali Baba ve Kırk Haramiler",
    duration: "5:00",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/ali-baba-ve-k-rk-haramiler/main/ali%20baba%20ve%20k%C4%B1rk%20haramiler%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/ali-baba-ve-k-rk-haramiler-kapak/9d2cba0921cfb0c4fb3e7b160c7c88b20e7c4e94/alibaba.png",
    colorClass: "card-blue",
    icon: "💰"
  },
  {
    id: 26,
    title: "Hayvanlar Şehri",
    duration: "2:54",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/hayvan-ses-/73b4fe2a1235625b2641e707054e0d9800dbf5c6/hayvanlar%20%C5%9Fehri%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/hayvankapak/cb3ddf81af1bb7837a8d479a46e5c28e6efa6a2f/hayvanlar%20%C5%9Fehri.jpg",
    colorClass: "card-green",
    icon: "🦒"
  },
  {
    id: 27,
    title: "Kurabiye Çocuk ve Fırıncı",
    duration: "1:58",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kurabiye-ocuk/3177a0e076621c4ebb90cf5402ef9be48ef5a4e3/kurabiye%20%C3%A7ocuk%20ve%20f%C4%B1r%C4%B1nc%C4%B1.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kurabik/0fa72b0ab20289e18573f9c1ffd1f03163142a62/ChatGPT%20Image%2011%20A%C4%9Fu%202026%2011_55_38.png",
    colorClass: "card-green",
    icon: "🍪"
  },
  {
    id: 28,
    title: "Hansel ve Gretel",
    duration: "10:10",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/hansel-ve-gratel/main/hansel%20ve%20gratel%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/hanselgratelkapak/main/hansel%20gratel.png",
    colorClass: "card-pink",
    icon: "🍬"
  },
  {
    id: 29,
    title: "Kurşun Asker",
    duration: "5:21",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kur-un-asker/main/kur%C5%9Fun%20asker%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kursunasker-kapak/main/kur%C5%9Fun%20asker.png",
    colorClass: "card-orange",
    icon: "💂‍♂️"
  },
  {
    id: 30,
    title: "Tavşan ile Kaplumbağa",
    duration: "3:16",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/tav-an-ile-kaplumba-a/main/tav%C5%9Fan%20ile%20kaplumba%C4%9Fa%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/tav-an-kapplumba-a-kapak/main/kaplumba%C4%9Fa%20ve%20tav%C5%9Fan.png",
    colorClass: "card-blue",
    icon: "🐇"
  },
  {
    id: 31,
    title: "Bamsı Beyrek",
    duration: "2:53",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/bams-beyrek-/refs/heads/main/bams%C4%B1%20beyrek%20m%C3%BCzik.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/bams-beyrekkapak/main/bams%C4%B1%20beyrek.png",
    colorClass: "card-green",
    icon: "🐎"
  },
  {
    id: 32,
    title: "Kibritçi Kız",
    duration: "1:15",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kibrit-i-k-z/f42db7012f63359c2108148b17371b22f6aa8e17/kibrit%C3%A7i%20k%C4%B1z%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kibrit-i-k-z-kapak/b63394327b4bc3e6aff7c7b9848d364c343f03bf/ChatGPT%20Image%2011%20A%C4%9Fu%202026%2011_47_34.png",
    colorClass: "card-pink",
    icon: "🔥"
  },
  {
    id: 33,
    title: "Ye Kürküm Ye | Nasreddin Hoca",
    duration: "1:42",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/ye-k-rk-m-ye/7ab8da801511bb28e0b5c6378104b032f7bb30cf/ye%20k%C3%BCrk%C3%BCm%20ye%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/ye-k-rk-m-ye-kapak/b43a8af2b0d7d8f2d4fa0d0eb6360431f9387894/ChatGPT%20Image%2011%20A%C4%9Fu%202026%2011_59_47.png",
    colorClass: "card-orange",
    icon: "🧥"
  },
  {
    id: 34,
    title: "Billur Köşk",
    duration: "1:09",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/B-LLURses/9b1e97660142e4cc189614acf979a5275bddb2ca/billur%20k%C3%B6%C5%9Fk%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/billurkoskkapak/ab00c6d60d93ddf75e33f6d9d5ce9e57e8d941fa/billur%20k%C3%B6%C5%9Fk.jpg",
    colorClass: "card-orange",
    icon: "🏰"
  },
  {
    id: 35,
    title: "Parmak Kız",
    duration: "2:02",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/parmak-k-z/1f81a06ca78105e1e1dca506f87d524909b0d5a7/parmak%20k%C4%B1z%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/parmak-k-z-kapak/1e63093496a62037c7676e6f6b3aa6f217d2cc0a/ChatGPT%20Image%2011%20A%C4%9Fu%202026%2011_51_49.png",
    colorClass: "card-blue",
    icon: "👧"
  },
  {
    id: 36,
    title: "Kazan Doğurdu | Nasreddin Hoca",
    duration: "2:04",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kazando-urduses/396bc6a8637e529307ff51d712b6bc98a248616d/kazan%20do%C4%9Furdu%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/kazan-do-urdu-kapak/9f537c12c15cedfaba86b89c9dfba398a3d7dc45/kazan%20do%C4%9Furdu.jpg",
    colorClass: "card-orange",
    icon: "🍲"
  },
  {
    id: 37,
    title: "İmparatorun Yeni Giysileri",
    duration: "2:18",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/-mparatorumn-giysileri/ae7fee0f5ed059f56d3baaa4e04f48f8f6cc1949/imparatorun%20giysileri%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/imparatorkapak/599031ac6c2f3483f3f73d9ed83a986d01b14d8d/imparatorun%20giysileri.jpg",
    colorClass: "card-green",
    icon: "👗"
  },
  {
    id: 38,
    title: "Çilek Seven Dev",
    duration: "1:18",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/cilekseven-dev/ded7303c1c8f0c065dd4ac270968255128d13dd9/%C3%A7ilek%20seven%20dev.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/-ilek-k-z/f45ddc05b2cb73780b695b4de4dbbf346f409c69/%C3%A7ilek%20seven%20dev.png",
    colorClass: "card-pink",
    icon: "🍓"
  },
  {
    id: 39,
    title: "Yalancı Çoban",
    duration: "2:09",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/yalanc-/32382904682483c2f58a56d3667576d09a3ad368/yalanc%C4%B1%20%C3%A7oban%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/yalanc-obik/631a790307351066535bb2343a5cdd0985a74540/yalanc%C4%B1%20%C3%A7oban.png",
    colorClass: "card-orange",
    icon: "🐑"
  },
  {
    id: 40,
    title: "Minik Kuzgun ve Su Perisi",
    duration: "1:41",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/minikkuzgun-ve-su-persi-ses/ffb580569402dc98ba6e5b88433b4086111c1000/minik%20kuzgun%20ve%20su%20perisi%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/minikkuzgunvesuperisikapak/cc2a2a091f481598fed1f138f5460b605b50be85/minik%20kuzgun%20ve%20su%20perisi.png",
    colorClass: "card-green",
    icon: "🐦"
  },
  {
    id: 41,
    title: "Karda Dans Eden Şemsiyeler",
    duration: "2:48",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/karda-dans-eden-emsiyeler/928df57289e16fcbdef216a849b7378bd0dcc94c/karda%20dans%20eden%20%C5%9Femsiyeler%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/karda-kapak/78bc25619c7ca5e92e49dcdc8e830d1b63a9caa3/karda%20dans%20eden%20%C5%9Femsiyeler.png",
    colorClass: "card-pink",
    icon: "☂️"
  },
  {
    id: 42,
    title: "Deniz Kızının Gümüş Tarağı",
    duration: "1:13",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/denizk-z-ses/fc57a4758a6fd65e1799dc343d92cc922ff05d5c/deniz%20k%C4%B1z%C4%B1n%C4%B1n%20g%C3%BCm%C3%BC%C5%9F%20tara%C4%9F%C4%B1%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/denizk-z-/b94beaa2b290c11915345a74e9846677cb7b4ebe/deniz%20k%C4%B1z%C4%B1n%C4%B1n%20g%C3%BCm%C3%BC%C5%9F%20tara%C4%9F%C4%B1.png",
    colorClass: "card-blue",
    icon: "🐚"
  },
  {
    id: 43,
    title: "Dağın Gözyaşı ile Rüzgarın Türküsü",
    duration: "3:25",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/da-ses/4e369e85a42cc53e2464b0838f30d75cab630d23/da%C4%9F%C4%B1n%20g%C3%B6zya%C5%9F%C4%B1%20ile%20r%C3%BCzgar%C4%B1n%20t%C3%BCrk%C3%BCs%C3%BC%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/da-kapak/b3ced04f94fbbfcf5851a102193cac71411ed681/da%C4%9F%C4%B1n%20g%C3%B6zya%C5%9F%C4%B1%20ve%20r%C3%BCzgar%C4%B1n%20t%C3%BCrk%C3%BCs%C3%BC.jpg",
    colorClass: "card-green",
    icon: "🏔️"
  },
  {
    id: 44,
    title: "Gümüş Tepenin Ardındaki Dostluk Şehri",
    duration: "1:59",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/gumustepedostluksehrises/78e8c546f7deb06105189ea7bcd14642b45dc7f2/g%C3%BCm%C3%BC%C5%9F%20tepenin%20ard%C4%B1ndaki%20dostluk%20%C5%9Fehri%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/gumustepedostluksehri/b3bfe8efc21062da21ceffcf68d72083d1d4166b/g%C3%BCm%C3%BC%C5%9F%20tepenin%20ard%C4%B1ndaki%20dostluk%20%C5%9Fehri.png",
    colorClass: "card-blue",
    icon: "🏔️"
  },
  {
    id: 45,
    title: "Güneşin Saklandığı Mağara",
    duration: "1:50",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/g-nes-magara-ses/4e8625eb13e24b071601dd65d9cf39e21afe0de6/g%C3%BCne%C5%9Fin%20sakland%C4%B1%C4%9F%C4%B1%20ma%C4%9Fara%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/g-nes-magara-kapak/3fd5ecd247630b662422e0ba9ee5c474f8cd089e/g%C3%BCne%C5%9Fin%20sakland%C4%B1%C4%9F%C4%B1%20ma%C4%9Fara.png",
    colorClass: "card-orange",
    icon: "☀️"
  },
  {
    id: 46,
    title: "Keloğlan ile Sihirli Taş",
    duration: "1:41",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kelo-lanilesihirlita-m-zik/cab6b8c55d59b3e698df7ae7e76f9c559a651b87/kelo%C4%9Flan%20ile%20sihirli%20ta%C5%9F%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/keo-lan-siihrli-kapak/44a691e783b460fce6df6a4b64f3fc5857a73443/kelo%C4%9Flan%20ile%20sihirli%20ta%C5%9F.png",
    colorClass: "card-orange",
    icon: "🌟"
  },
  {
    id: 47,
    title: "Keloğlan ile Dev",
    duration: "1:32",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/keoglaniledev/bbf2f0cd1bda272e152659c37c88bfdc1a1d88a5/kelo%C4%9Flan%20ile%20dev%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/keloglaniledevkapak/2dc781163ed099c71d5956c76a66341055b4d16b/kelo%C4%9Flan%20ile%20dev%20ailesi.png",
    colorClass: "card-orange",
    icon: "👹"
  },
  {
    id: 48,
    title: "Keloğlan ile Sevimli Dostları",
    duration: "3:10",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/kelolanses/e44e89905c62e079a0636cafe3ba32dbba2b5248/kelo%C4%9Flan%20ile%20sevimli%20dostlar%C4%B1%20m%C3%BCzikli.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/keolansevimlidostkapak/54080352898c9f782f2c79a157ab66be4ae9a3eb/kelo%C4%9Flan%20ile%20sevimli%20dostlar%C4%B1.jpg",
    colorClass: "card-orange",
    icon: "🐉"
  },
  {
    id: 49,
    title: "Üç Kardeş ve Sihirli Kıl",
    duration: "2:06",
    audioUrl: "https://raw.githubusercontent.com/selenayykaparr/-karde-vesihirlik-lses/870ffb69219ee652abdd8dccb6dccc3d65993f97/%C3%BC%C3%A7%20karde%C5%9F%20ve%20sihirli%20k%C4%B1l%20m%C3%BCzikli%20.MP3",
    imageUrl: "https://raw.githubusercontent.com/selenayykaparr/-karde-vesihirlik-lkapak/143b66b42f97f0afc70410bb12630e0e042e9415/%C3%BC%C3%A7%20karde%C5%9F%20ve%20sihirli%20k%C4%B1l.png",
    colorClass: "card-pink",
    icon: "🎁"
  }
];

let currentBookIndex = -1;
let favorites = JSON.parse(localStorage.getItem("molly_favorites")) || [];

const bookListContainer = document.querySelector(".book-list");
const audioPlayer = document.getElementById("audio-player");
const mainAudio = document.getElementById("main-audio");
const playingTitle = document.getElementById("playing-title");
const playingDesc = document.getElementById("playing-desc");
const playingCover = document.getElementById("playing-cover");
const favoriteBtn = document.getElementById("favorite-btn");

const customPlayBtn = document.getElementById("custom-play-btn");
const customPrevBtn = document.getElementById("custom-prev-btn");
const customNextBtn = document.getElementById("custom-next-btn");

const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const timeDisplay = document.getElementById("time-display");

const dogLogo = document.getElementById("dog-logo");
const backToMenuBtn = document.getElementById("back-to-menu");

const registerTriggerBtn = document.getElementById("register-trigger-btn");
const registerModal = document.getElementById("register-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const registerForm = document.getElementById("register-form");
const subTitleText = document.getElementById("sub-title-text");

function renderBooks() {
  if (!bookListContainer) return;
  bookListContainer.innerHTML = "";

  books.forEach(book => {
    const isFav = favorites.includes(book.id);
    const card = document.createElement("div");
    card.className = `book-card ${book.colorClass}`;
    card.innerHTML = `
      <div class="book-content-left">
        <span class="book-icon">${book.icon}</span>
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>Süre: ${book.duration} | Dinlemek için tıkla</p>
        </div>
      </div>
      <span class="card-heart-badge">${isFav ? '❤️' : ''}</span>
    `;

    card.addEventListener("click", () => playBook(book));
    bookListContainer.appendChild(card);
  });
}

function playBook(book) {
  // İnternet yoksa masalı açma, kullanıcıya bilgi ver
  if (!navigator.onLine) {
    alert("🐶 İnternet bağlantısı yok.\nMasalı dinlemek için internet bağlantınızı açın.");
    return;
  }

  currentBookIndex = books.findIndex(b => b.id === book.id);
  audioPlayer.classList.remove("hidden");

  playingTitle.textContent = book.title;
  playingDesc.textContent = `Süre: ${book.duration} - Keyifli dinlemeler!`;

  if (playingCover && book.imageUrl) {
    playingCover.src = book.imageUrl;
  }

  mainAudio.src = book.audioUrl;
  mainAudio.load();

  mainAudio.play().then(() => {
    customPlayBtn.textContent = "⏸";
  }).catch(e => console.log("Oynatma hatası:", e));

  updateFavoriteButtonState(book.id);
}

// Özel oynat / durdur buton kontrolü
customPlayBtn.addEventListener("click", () => {
  if (mainAudio.paused) {
    mainAudio.play();
    customPlayBtn.textContent = "⏸";
  } else {
    mainAudio.pause();
    customPlayBtn.textContent = "▶";
  }
});

// Önceki masala geçiş
customPrevBtn.addEventListener("click", () => {
  if (currentBookIndex > 0) {
    playBook(books[currentBookIndex - 1]);
  } else {
    playBook(books[books.length - 1]);
  }
});

// Sonraki masala geçiş
customNextBtn.addEventListener("click", () => {
  if (currentBookIndex < books.length - 1) {
    playBook(books[currentBookIndex + 1]);
  } else {
    playBook(books[0]);
  }
});

// İlerleme çubuğu ve süre sayacı
mainAudio.addEventListener("timeupdate", () => {
  if (mainAudio.duration) {
    const percent = (mainAudio.currentTime / mainAudio.duration) * 100;
    progressBar.style.width = `${percent}%`;

    const currentMinutes = Math.floor(mainAudio.currentTime / 60);
    const currentSeconds = Math.floor(mainAudio.currentTime % 60);

    timeDisplay.textContent =
      `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  }
});

// Çubuğa tıklayarak ileri/geri sarma
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = mainAudio.duration;

  if (duration) {
    mainAudio.currentTime = (clickX / width) * duration;
  }
});

function updateFavoriteButtonState(bookId) {
  const isFav = favorites.includes(bookId);

  if (favoriteBtn) {
    favoriteBtn.textContent = isFav ? '❤️' : '🤍';
    favoriteBtn.title = isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle';
  }
}

if (favoriteBtn) {
  favoriteBtn.addEventListener("click", () => {
    if (currentBookIndex === -1) return;

    const currentBook = books[currentBookIndex];
    const index = favorites.indexOf(currentBook.id);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(currentBook.id);
    }

    localStorage.setItem("molly_favorites", JSON.stringify(favorites));

    updateFavoriteButtonState(currentBook.id);
    renderBooks();
  });
}

mainAudio.addEventListener("ended", () => {
  customPlayBtn.textContent = "▶";

  if (currentBookIndex < books.length - 1) {
    playBook(books[currentBookIndex + 1]);
  } else {
    playBook(books[0]);
  }
});

if (backToMenuBtn) {
  backToMenuBtn.addEventListener("click", () => {
    audioPlayer.classList.add("hidden");
    mainAudio.pause();
    mainAudio.currentTime = 0;
    customPlayBtn.textContent = "▶";
  });
}

const barkAudio = document.getElementById("bark-element");

function playStoryBark() {
  if (barkAudio) {
    barkAudio.currentTime = 0;

    barkAudio.play().catch(e => {
      console.log("Havlama sesi çalınamadı:", e);
    });
  }
}

if (dogLogo) {
  dogLogo.addEventListener("click", playStoryBark);
}

if (registerTriggerBtn) {
  registerTriggerBtn.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    registerModal.classList.add("hidden");
  });
}

if (registerModal) {
  registerModal.addEventListener("click", (e) => {
    if (e.target === registerModal) {
      registerModal.classList.add("hidden");
    }
  });
}

// =====================================================
// ÜYELİK BİLGİSİNİ BU CİHAZDA HATIRLA
// =====================================================

const MOLLY_MEMBER_KEY = "molly_member";

function loadSavedMember() {
  try {
    const savedMember =
      JSON.parse(localStorage.getItem(MOLLY_MEMBER_KEY));

    if (!savedMember) return;

    if (savedMember.childName && subTitleText) {
      subTitleText.textContent =
        `Hangi macerayı dinlemek istersin, ${savedMember.childName}? 🐾`;
    }

    if (registerTriggerBtn) {
      registerTriggerBtn.innerHTML = "🔑";
    }

  } catch (error) {
    console.error("Kayıtlı üyelik bilgisi okunamadı:", error);
  }
}

// Üye Ol Formu ve Firebase Kayıt Entegrasyonu
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullNameInput =
      document.getElementById("reg-fullname").value.trim();

    const childNameInput =
      document.getElementById("reg-childname").value.trim();

    const emailInput =
      document.getElementById("reg-email").value.trim();

    const phoneInput =
      document.getElementById("reg-phone").value.trim();

    if (childNameInput && subTitleText) {
      subTitleText.textContent =
        `Hangi macerayı dinlemek istersin, ${childNameInput}? 🐾`;
    }

    // Üye olunca üstteki "Üye Ol" yazısını kaldır
    if (registerTriggerBtn) {
      registerTriggerBtn.innerHTML = "🔑";
    }

    // Üyelik bilgisini bu cihazda sakla
    localStorage.setItem(
      MOLLY_MEMBER_KEY,
      JSON.stringify({
        fullName: fullNameInput,
        childName: childNameInput,
        email: emailInput,
        phone: phoneInput
      })
    );

    // İnternet/Firebase varsa bilgileri Firestore'a da kaydet.
    // Firebase yoksa yerel kayıt korunur ve uygulama çalışmaya devam eder.
    if (db && typeof firebase !== "undefined") {

      db.collection("users").add({
        fullName: fullNameInput,
        childName: childNameInput,
        email: emailInput,
        phone: phoneInput,
        createdAt:
          firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log(
          "Kullanıcı başarıyla Firebase'e kaydedildi! 🎉"
        );
      })
      .catch((error) => {
        console.error(
          "Kayıt sırasında hata oluştu: ",
          error
        );
      });

    } else {
      console.log(
        "Firebase çevrimdışı. Üyelik bilgisi bu cihazda saklandı."
      );
    }

    registerModal.classList.add("hidden");
    registerForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSavedMember();
  renderBooks();
});
