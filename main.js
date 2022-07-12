
const artist = document.getElementById("artist");
const song = document.getElementById("song");
const lyric = document.getElementById("lyrics");
const getsong = document.getElementById("getsong");

getsong.addEventListener("click", function (e) {
  e.preventDefault();
  artist.innerHTML = artist.value;
  song.innerHTML = song.value;

  if (artist.value === "" || song.value === "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }

  setTimeout(function () {
    lyric.innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    getSong();
  },2000);
});

function getSong(){
  fetch(`https://api.lyrics.ovh/v1/${artist.value}/${song.value}`)
  .then(response => response.json())
  .then(resultado => {
    console.log(resultado.lyrics);
    if (resultado.lyrics) {
      lyric.innerHTML = resultado.lyrics.replace(new RegExp("\n", "g"),"<br>");
    } else {
      lyric.innerHTML =  ''
      mostrarError("La cancion no existe...");
    }
})
}

function mostrarError(mensaje){
  const error = document.createElement("p");
  error.classList.add("error-mensaje");
  error.innerText = mensaje;

  lyric.appendChild(error);
  setTimeout(() => {
      error.remove();
  }, 3000);
}

