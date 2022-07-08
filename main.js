const artist = document.getElementById("artist");
const song = document.getElementById("song");
const lyrics = document.getElementById("lyrics");
const getsong = document.getElementById("getsong");

document.getElementById("getsong").addEventListener("click", function () {
  artist.innerHTML = artist.value;
  song.innerHTML = song.value;
  document.getElementById("lyrics").innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  setTimeout(function () {
    async function getLyrics() {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist.value}/${song.value}`
      );
      const data = await response.json();
      document.getElementById("lyrics").innerHTML = data.lyrics.replace(
        new RegExp("\n", "g"),"<br>"
      );
    }
    getLyrics();
  }, 2000);
});

function mostrarError(mensaje){
  const error = document.createElement("p");
  error.classList.add("error-mensaje");
  error.innerText = mensaje;

  lyrics.appendChild(error);
  setTimeout(() => {
      error.remove();
  }, 3000);
}
