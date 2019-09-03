# alxhein.github.io

This repository contains two separate projects that I hope to eventually merge (with other side-projects) into a comprehensive suite of tools for Spotify artists & playlist owners. 

1. Streamline playlist curator - hosted at https://streamlinemusic.net/curator
- This was my first major project I pursued with the intent of learning Javascript, HTML, CSS, and Node.js (for development, before purchasing the domain), as well as how to access an API with AJAX requests
- Essentially, it allows you to create a new playlist, modify the playlist's details, and import tracks from different sources on the Spotify API, including other playlists, albums, and singles (the "artist" option in the Source Type selector is still in development)
- The real power in this tool is that you can filter imported sources by attributes such as position, tempo, key, mode, explicit, popularity, danceability, energy, valence, and artist, all of which are attributed to each track through the Spotify API's Get Track Analysis endpoint, and you can also combine filters 
- By clicking "apply changes," the program adds the imported tracks to your new playlist
- Right now the code is extremely rough & requires alot of cleaning up – especially to debug & expedite the long process of importing / analyzing tracks from the Spotify API
- This project utilizes curator.html, curator-script.js, curator-style.css, and images from ./public/images

2. Streamline download gate - hosted at https://streamlinemusic.net
- This was a smaller project so I could learn how to host a github repository and just how to work with a webserver
- The site may be confusing to those who are unfamiliar with electronic music production, but essentially it is a place where I give away my audio files in exchange for a follow on my Spotify Artist account and on one of my playlists. 
- This project utilizes index.html, script.js, style.css, and images from ./public/images