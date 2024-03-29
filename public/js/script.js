//OAUTH AUTHORIZATION FLOW

// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// app's client ID, redirect URI and desired scopes
const clientId = 'cefb70f60e364197b8a7e63b7d6836d9';
const redirectUri = 'http://streamlinemusic.net';
const scopes = ['user-follow-modify'];

var downloadButton = document.getElementById('download');
var authorizeButton = document.getElementById('authorize');
var followedCount = 0;
authorizeButton.onclick = function(){
    location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// set follow-button hover attributes manually with mouseenter/mouseleave
var buttonList = document.getElementsByClassName('button-list')[0];
buttonList.children[0].onmouseenter = function(){
  this.style.backgroundColor = '#2eef71';
}
buttonList.children[0].onmouseleave = function(){
  this.style.backgroundColor = '#1db954';
}
buttonList.children[1].onmouseenter = function(){
  this.style.backgroundColor = '#2eef71';
}
buttonList.children[1].onmouseleave = function(){
  this.style.backgroundColor = '#1db954';
}

// check for access token, display buttonList
if (_token){
  authorizeButton.style.display = 'none';
  buttonList.style.display = 'block';
}

// Follow Alkii button onclick function with ajax PUT request to Spotify API 
buttonList.children[0].onclick = function(_token, button){
  return function(){
    $.ajax('https://api.spotify.com/v1/me/following?ids=5MRJxra716OikPLc6QDasc&type=artist', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });
  button.style.backgroundColor = '#e2e2e2';
  button.innerHTML = 'Followed'; // future: should check for following via Spotify API
  button.onmouseenter = '';
  button.onmouseleave = '';
  permitDownload(); // future: add an error function if it is unsuccessful
  }
}(_token, buttonList.children[0]);


// Follow Travel Vibes button onclick function with ajax PUT request to Spotify API 
buttonList.children[1].onclick = function(_token, button){
  return function(){
    $.ajax('https://api.spotify.com/v1/playlists/1jT9tW5vP9ItyDMI87zlYC/followers', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });
  button.style.backgroundColor = '#e2e2e2';
  button.innerHTML = 'Followed'; // future: should check for following via Spotify API
  button.onmouseenter = '';
  button.onmouseleave = '';
  permitDownload(); // future: add an error function if it is unsuccessful
}
}(_token, buttonList.children[1]);

// checks if both accounts are followed, then display download button
function permitDownload(){
  followedCount++;
  if(followedCount >= 2){
    buttonList.style.display = 'none';
    downloadButton.style.display = 'block';
  }
}

// download button redirect 
downloadButton.onclick = function(){
  window.location.href = 'https://drive.google.com/open?id=17I5HoEKUCmElYAB5uNQuxAFjhQjn6sLj';
}