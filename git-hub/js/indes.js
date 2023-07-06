const memeForm = document.getElementById('memeForm');
const memeResult = document.getElementById('memeResult');

memeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const topText = document.getElementById('topText').value;
  const bottomText = document.getElementById('bottomText').value;
  
  generateMeme(topText, bottomText)
    .then((imageUrl) => {
      memeResult.innerHTML = `<img src="${imageUrl}" alt="Meme">`;
    })
    .catch((error) => {
      memeResult.innerHTML = `Error: ${error.message}`;
    });
});

function generateMeme(topText, bottomText) {
  const url = 'https://meme-generator-api.p.rapidapi.com/memes';

  const params = {
    topText: topText,
    bottomText: bottomText,
    memeTemplateId: 1
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Host': 'meme-generator-api.p.rapidapi.com',
    'X-RapidAPI-Key': '466029d901msh6221cc14403b620p135eb9jsn814f7fb14133' 
  };

  const body = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return fetch(url, { 
    method: 'POST',
    headers: headers,
    body: body
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('No se pudo generar el meme.');
      }
    });
}
