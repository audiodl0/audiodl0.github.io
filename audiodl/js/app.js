const card = document.getElementById("success-message")
function showSuccessMessage(thumbnail, title, lowQ, highQ) {
  document.getElementById('vidthumbnail').src = thumbnail;
  document.getElementById('vidthumbnail').alt = title+' video';
  document.getElementById('vidLowQ').href = lowQ;
  document.getElementById('vidHighQ').href = highQ;
  document.getElementById('success-message').style.display = 'block';
  document.getElementById('error-message').style.display = 'none';
}


function showInfo(info, cls) {
  document.getElementById('error-message').setAttribute('class', cls);
  document.getElementById('error-message').innerHTML = info;
  document.getElementById('error-message').style.display = 'block';
  document.getElementById('success-message').style.display = 'none';
}

async function SearchSong() {
  // Replace this with the alternate video search API logic
  const query = document.getElementById("url").value;
  const url = 'https://yt-api.p.rapidapi.com/search?query='+query;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a003578484mshd4325475f01bf8dp1d9fa7jsn7484c96c3384',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    showInfo("Searching...", "alert-success")
    const response = await fetch(url, options);
    const result = await response.text();
    const sRes = JSON.parse(result)
    const data = sRes.data
    let i = 0;
    for (i = 0; i < 21; i++) {
      showInfo(data[i].title, "alert-success")
    }
    console.log(result);
  } catch (error) {
    showInfo(error, "alert-danger")
    console.error(error);
  }
}