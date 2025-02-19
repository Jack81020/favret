// Assumendo che il tuo file JSON sia nello stesso percorso e si chiami songs.json
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const songList = document.getElementById('songList');
    data.songs.forEach(song => {
      const div = document.createElement('div');
      div.style = "background-color: rgb(147, 147, 211); margin: 50px; display: flex; padding: 25px; justify-content: center; border-radius: 15px; flex-direction: column; align-items: center";
      const audio = document.createElement('audio');
      audio.style = "width: 30%"
      const audioSrc = document.createElement('source');
      audioSrc.src = `mp3List/${song.mp3FileName}`;
      audioSrc.type = "audio/mpeg";
      audio.appendChild(audioSrc);
      audio.controls = true;
      const h1 = document.createElement('h1');
      const textDiv = document.createElement('div');
      textDiv.style = "display: flex; width: 80%; margin: auto"
      const p = document.createElement('p');
      textDiv.appendChild(p);
      h1.innerHTML = song.name;
      song.lyrics = song.lyrics.replace(/\n/g, '<br>');
      p.innerHTML = song.lyrics;
      p.style = "font-size: 18px; flex: 1; column-count: 2; column-gap: 20px; text-align: justify;"
      div.appendChild(h1);
      div.appendChild(audio);
      div.appendChild(textDiv);
      songList?.appendChild(div);
    });
  });

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (25+element.scrollHeight)+"px";
}

function saveNewSong() {
  const name = document.getElementById('name').value;
  const lyrics = document.getElementById('lyrics').value;
  const mp3FileName = document.getElementById('mp3FileName').value;
  const newSong = {
    name,
    lyrics,
    mp3FileName
  };
  console.log(newSong);
  navigator.clipboard.writeText(JSON.stringify(newSong))
    .then(() => {
      console.log('Testo copiato con successo!');
      // Puoi anche mostrare un feedback all'utente, ad esempio un alert o un messaggio
      alert("Dati della canzone copiati con successo");
    })
    .catch(err => {
      console.error('Errore durante la copia del testo: ', err);
      alert("Errore durante la copia dei dati della canzone");
    });
}