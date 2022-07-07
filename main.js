const artist = document.getElementById("artist");
const song = document.getElementById("song");
const lyrics = document.getElementById("lyrics");
const getsong = document.getElementById("getsong");

getsong.addEventListener("click", () => {
  artist.innerHTML = artist.value;
  song.innerHTML = song.value;

  async function getLyrics() {
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${artist.value}/${song.value}`
    );
    const data = await response.json();
    console.log(data.lyrics);
    lyrics.innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>");
  }
  getLyrics();
});
