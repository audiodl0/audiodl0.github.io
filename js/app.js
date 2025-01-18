
function showSuccessMessage(v) {
  document.getElementById('error-message').setAttribute('class', "col-md-4 card");
  let i = 0;
  document.getElementById('error-message').innerHTML = "";
  for (i; i < v.length - 15; i++) {
    if(v[i].type == "video"){
      inf = '<img src="' + v[i].thumbnail[0].url+ '" alt="' + v[i].title + '"width="100%" >' +
      '<h7>' + v[i].title + '</h7>' + '<p>Duration : '+v[i].lengthText + '</p>'+
      '<button class="btn btn-primary" onclick="downloadVid(\'' + v[i].videoId + '\')">Download</button>' + '<hr>';
      document.getElementById('error-message').insertAdjacentHTML('beforeend', inf);

    }
  }
  document.getElementById('error-message').style.display = 'block';
  document.getElementById('success-message').style.display = 'none';


}

async function downloadVid(id) {
  const url = 'https://youtube-mp36.p.rapidapi.com/dl?id='+id;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a003578484mshd4325475f01bf8dp1d9fa7jsn7484c96c3384',
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    console.log(data.status)
    if (data.status == "ok"){
      window.open(data.link)
    }
  } catch (error) {
    showInfo(error, "alert-danger");
  }

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
    let vall = "";
    showInfo("[+] Searching...", "alert-custom");
    const response = await fetch(url, options);
    const result = await response.text();
    const sRes = JSON.parse(result);
    const data = sRes.data;
    showSuccessMessage(data);
    //showInfo("m.youtube.com/watch?v="+data[0].videoId,"alert-success")
  } catch (error) {
    showInfo(error, "alert-danger");
  }
}