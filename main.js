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

  function capitalizarPrimeraLetra() {
	var p1 = artist.value;
	var p2 = song.value;
	if(!artist.value || !song.value) return;
	var mayuscula = p1.substring(0,1).toUpperCase();
	var mayuscula2 = p2.substring(0,1).toUpperCase();
	if (p1.length > 0 || p2.lenght > 0) {
	  var minuscula = p1.substring(1).toLowerCase();
	  var minuscula2 = p2.substring(1).toLowerCase();
	}
	artist.value = mayuscula.concat(minuscula);
	song.value = mayuscula2.concat(minuscula2);
  }

  setTimeout(function () {
	capitalizarPrimeraLetra();
	console.log(artist.value);
	console.log(song.value);
    lyric.innerHTML =
      '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    getSong(artist.value, song.value);
  }, 2000);
});

function getSong(artist, song) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => response.json())
    .then((resultado) => {
      console.log(resultado.lyrics);
      if (resultado.lyrics) {
        lyric.innerHTML = resultado.lyrics.replace(
          new RegExp("\n", "g"),
          "<br>"
        );
      } else {
        lyric.innerHTML = "";
        mostrarError("La cancion no existe...");
      }
    });
}

function mostrarError(mensaje) {
  const error = document.createElement("p");
  error.classList.add("error-mensaje");
  error.innerText = mensaje;

  lyric.appendChild(error);
  setTimeout(() => {
    error.remove();
  }, 3000);
}
