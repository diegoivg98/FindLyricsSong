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

  lyric.innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  setTimeout(function () {
    fetch(`https://api.lyrics.ovh/v1/${artist.value}/${song.value}`)
    .then(response => response.json())
    .then(resultado => {
      console.log(resultado.lyrics);
      if (resultado.lyrics) {
        lyric.innerHTML = resultado.lyrics.replace(new RegExp("\n", "g"),"<br>");
      } else {
          mostrarError("La cancion no existe...");
      }
  })
  }
  , 2000);
});

function mostrarError(mensaje){
  const error = document.createElement("p");
  error.classList.add("error-mensaje");
  error.innerText = mensaje;

  lyric.appendChild(error);
  setTimeout(() => {
      error.remove();
  }, 3000);
}
