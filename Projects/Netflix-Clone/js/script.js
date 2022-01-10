//Handle the slide effect

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});

//Handle the content change on the screen when clicking different movies

const movies = document.querySelectorAll(".movies-box");
const mainMovie = document.querySelector(".main-movie");
const title = document.querySelector(".title");
const movieDescription = document.querySelector(".description");
const movieLink = document.querySelector(".play");
const infoLink = document.querySelector(".info");

const data = [
  {
    title: "O Espetacular Homem-Aranha 2: A Ameaça de Electro",
    description:
      "O jovem Peter Parker está fascinado com as habilidades que adquiriu como Homem-Aranha. Agora, ele precisa lidar com dois problemas: o retorno de um velho amigo, Harry Osborn, e a chegada de um vilão mais forte e poderoso, Electro.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/iWrDibFusV4JEz5Qw79RuWSGfX4.jpg",
    info: "https://www.themoviedb.org/movie/102382-the-amazing-spider-man-2",
    trailerURL: "https://www.youtube.com/watch?v=tbYCOlR_Wsc",
  },
  {
    title: "O Livro de Boba Fett",
    description:
      "Uma emocionante aventura Star Wars que encontra o lendário caçador de recompensas Boba Fett e o mercenário Fennec Shand explorando o submundo da Galáxia quando retornam às areias de Tatooine para reivindicar o território antes governado por Jabba, o Hutt e seu sindicato do crime.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/sjx6zjQI2dLGtEL0HGWsnq6UyLU.jpg",
    info: "https://www.themoviedb.org/tv/115036-the-book-of-boba-fett",
    trailerURL: "https://www.youtube.com/watch?v=Vf6X4Uamjas&feature=emb_title",
  },
  {
    title: "The Walking Dead",
    description:
      "Nos Estados Unidos pós-apocalíptico, um pequeno grupo de sobreviventes segue viajando à procura de uma nova casa longe dos mortos-vivos. O desespero por segurança e suprimentos os coloca constantemente à beira da sanidade.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/uro2Khv7JxlzXtLb8tCIbRhkb9E.jpg",
    info: "https://www.themoviedb.org/tv/1402-the-walking-dead",
    trailerURL: "https://www.youtube.com/watch?v=qAS8f9L-vWc&feature=emb_title",
  },
  {
    title: "Suits: Homens de Terno",
    description:
      "Mesmo sem se formar e sem licença para advogar, um jovem brilhante impressiona um importante advogado e consegue uma cobiçada posição em sua firma.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/eVV2A3PYJLmHdXpiveiU6Lk7jbV.jpg",
    info: "https://www.themoviedb.org/tv/37680-suits",
    trailerURL: "https://www.youtube.com/watch?v=B1OL4ZQf70c",
  },
  {
    title: "Gavião Arqueiro",
    description:
      "O ex-vingador Clint Barton tem uma missão aparentemente simples: voltar para sua família no Natal. Será possível? Talvez com a ajuda de Kate Bishop, uma arqueira de 22 anos que sonha em se tornar uma super-heroína. Os dois são forçados a trabalhar juntos quando uma presença do passado de Barton ameaça descarrilar muito mais do que o espírito festivo.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/aEnbS0C5pXvIcy6jq2CKxM1RFWX.jpg",
    info: "https://www.themoviedb.org/tv/88329-hawkeye",
    trailerURL: "https://www.youtube.com/watch?v=6tdxk503c7U&feature=emb_title",
  },
  {
    title: "Venom: Tempo de Carnificina",
    description:
      "Em busca de seu próximo furo de reportagem, o jornalista Eddie Brock consegue uma entrevista exclusiva com Cletus Kasady, um assassino no corredor da morte, que descobre o segredo de Eddie e se torna o hospedeiro de Carnificina, um simbionte aterrorizante e ameaçador. Eddie e Venom precisam superar sua relação atribulada e trabalhar em conjunto para derrotar Carnificina.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/70nxSw3mFBsGmtkvcs91PbjerwD.jpg",
    info: "https://www.themoviedb.org/movie/580489-venom-let-there-be-carnage",
    trailerURL: "https://www.youtube.com/watch?v=-BI6OOYqrxE&feature=emb_title",
  },
  {
    title: "Riverdale",
    description:
      "Enquanto tentam lidar com problemas típicos da adolescência como amor, sexo, escola e família, Archie e sua turma se envolvem em um grande mistério.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/2AyySFf6MSoR7bavBvoBLck2gpo.jpg",
    info: "https://www.themoviedb.org/tv/69050-riverdale",
    trailerURL: "https://www.youtube.com/watch?v=pU5qvhOrPig",
  },
  {
    title: "Shang-Chi e a Lenda dos Dez Anéis",
    description:
      "Shang-Chi precisa confrontar o passado que pensou ter deixado para trás. Ao mesmo tempo, ele é envolvido em uma teia de mistérios da organização conhecida como Dez Anéis.",
    coverImage:
      "https://www.themoviedb.org/t/p/original/cinER0ESG0eJ49kXlExM0MEWGxW.jpg",
    info: "https://www.themoviedb.org/movie/566525-shang-chi-and-the-legend-of-the-ten-rings",
    trailerURL: "https://www.youtube.com/watch?v=wAmkU6FEKUw",
  },
];

function changeMainMovie() {
  const index = +this.dataset.index;

  mainMovie.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 100%),
  url(${data[index].coverImage}) center`;
  mainMovie.style.backgroundSize = "cover";

  title.textContent = data[index].title;
  movieDescription.textContent = data[index].description;

  movieLink.href = data[index].trailerURL;
  infoLink.href = data[index].info;
}

movies.forEach((movie) => movie.addEventListener("click", changeMainMovie));
