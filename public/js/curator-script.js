var idNumber = 0;

var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

function makeElement(type,className){
    let e = document.createElement(type);
    if(className != ''){
        e.className = className;
    }
    return e;
}

function merge(trackSets) {
    var result = [];
    result = trackSets.flat();
    
    for(var i=0; i<result.length; ++i) {
        for(var j=i+1; j<result.length; ++j) {
            if(result[i] === result[j])
                result.splice(j--, 1);
        }
    }

    return result;
};

function intersection() {
	var result = [];
  var lists;
  
  if(arguments.length === 1) {
  	lists = arguments[0];
  } else {
  	lists = arguments;
  }
  
  for(var i = 0; i < lists.length; i++) {
  	var currentList = lists[i];
  	for(var y = 0; y < currentList.length; y++) {
    	var currentValue = currentList[y];
      if(result.indexOf(currentValue) === -1) {
        var existsInAll = true;
        for(var x = 0; x < lists.length; x++) {
          if(lists[x].indexOf(currentValue) === -1) {
            existsInAll = false;
            break;
          }
        }
        if(existsInAll) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
  }


class CuratedPlaylist{
    constructor(token){
        this._token = token;
        this._sources = [];
        this._userId = '1290233311';
        this._playlistId = '';
        this._name = 'My Playlist';
        this._owner = '';
        this._image = './public/images/imageuploadnotavailable.png'; 
        this._description = 'Description';
        this._tracks;
        this._nameInput;
        this._descriptionInput;
        this._imageElement;
        this._uploadImageButton;
        this._userPlaylist;
        this._infoContainer;
        this._leftSide;
        this._rightSide;
        this.createHTML();
    }
    createHTML(){
        this.createPlaylist();
        this._userPlaylist = document.getElementById('user-playlist');
        this._infoContainer = makeElement('div','info-container');
        this._leftSide = makeElement('div','left-side-inputs');
        this._rightSide = makeElement('div','right-side-inputs');
        this._infoContainer.appendChild(this._leftSide);
        this._infoContainer.appendChild(this._rightSide);
        let titleHeader = makeElement('h5','');
        titleHeader.innerHTML = 'Title';
        this._leftSide.appendChild(titleHeader);
        this._nameInput = makeElement('input','playlist-title-input');
        this._nameInput.type = 'text';
        this._nameInput.value = this._name;
        this.setNameInputKeyup();
        this._leftSide.appendChild(this._nameInput);
        let descriptionHeader = makeElement('h5','');
        descriptionHeader.innerHTML = 'Description';
        this._leftSide.appendChild(descriptionHeader);
        this._descriptionInput = makeElement('textarea','playlist-description-input');
        this._descriptionInput.value = this._description;
        this._descriptionInput.spellcheck = false;
        this.setDescriptionInputKeyup();
        this._leftSide.appendChild(this._descriptionInput);
        let imageHeader = makeElement('h5','');
        imageHeader.innerHTML = 'Image';
        this._rightSide.appendChild(imageHeader);
        this._imageElement = makeElement('img','this-playlist-image');
        this._imageElement.setAttribute('src',this._image);
        this._rightSide.appendChild(this._imageElement);
        let changeImage = makeElement('h5','');
        changeImage.innerHTML = 'Upload Image';
        this._rightSide.appendChild(changeImage);
        this._uploadImageButton = makeElement('input','image-upload');
        this._uploadImageButton.type = 'file';
        this._rightSide.appendChild(this._uploadImageButton);

        
        
        this._userPlaylist.appendChild(this._infoContainer);
    }
    setNameInputKeyup(){
        //setup before functions
        let typingTimer;                //timer identifier
        let doneTypingInterval = 5000;  //time in ms (5 seconds)
        var _this = this;

        //on keyup, start the countdown
        _this._nameInput.addEventListener('keyup', () => {
            clearTimeout(typingTimer);
            if (_this._nameInput.value) {
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            }
        });

        //user is "finished typing," do something
        function doneTyping () {
            _this._name = _this._nameInput.value;
            _this.changePlaylistName();
        }
    }
    setDescriptionInputKeyup(){
        //setup before functions
        let typingTimer;                //timer identifier
        let doneTypingInterval = 5000;  //time in ms (5 seconds)
        var _this = this;

        //on keyup, start the countdown
        _this._descriptionInput.addEventListener('keyup', () => {
            clearTimeout(typingTimer);
            if (_this._descriptionInput.value) {
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            }
        });

        //user is "finished typing," do something
        function doneTyping () {
            _this._description = _this._descriptionInput.value;
            _this.changePlaylistDescription();
        }
    }
    async createPlaylist(){
        var _this = this;
        var urlString = 'https://api.spotify.com/v1/users/' + _this._userId + '/playlists';

        var jsonData = JSON.stringify({
            "name": _this._name,
            "public": true
        });

        $.ajax({
            type: 'POST',
            url: urlString,
            data: jsonData,
            dataType: 'json',
            headers: {
            'Authorization': 'Bearer ' + _this._token},
            contentType: 'application/json',
        success: function(result) {
            _this._playlistId = result.id;
            console.log('Woo! :) ' + _this._playlistId);
        },
        error: function() {
            console.log('Error! :(');
        }
        })
    }
    async changePlaylistName(){
        var _this = this;
        var urlString = 'https://api.spotify.com/v1/playlists/' + _this._playlistId;

        var jsonData = JSON.stringify({
            "name": _this._name,
        });

        $.ajax({
            type: 'PUT',
            url: urlString,
            data: jsonData,
            dataType: 'json',
            headers: {
            'Authorization': 'Bearer ' + _this._token},
            contentType: 'application/json',
        success: function(result) {
            console.log('Woo! :)');
        },
        error: function() {
            console.log('Error! :(');
        }
        })
    }
    async changePlaylistDescription(){
        var _this = this;
        var urlString = 'https://api.spotify.com/v1/playlists/' + _this._playlistId;

        var jsonData = JSON.stringify({
            "description": _this._description,
        });

        $.ajax({
            type: 'PUT',
            url: urlString,
            data: jsonData,
            dataType: 'json',
            headers: {
            'Authorization': 'Bearer ' + _this._token},
            contentType: 'application/json',
        success: function(result) {
            console.log('Woo! :)');
        },
        error: function() {
            console.log('Error! :(');
        }
        })
    }
}


class Source {
    constructor(token) {
        this._type;
        this._token = token;
        this._tracks;
        this._name;
        this._owner;
        this._image;
        this._filters = [];
        this._filteredTracks;
        this._sourceSearch;
        this._waiting = false;
        this._editingSource = false;
        this._originalSourceSearch;
        //this._inclusion = 'Any';
        this._inclusionId = 't' + idNumber;
        idNumber++;

        //html elements
        this._sourcePopupContainer;
        this._searchPopup
        this._searchCloseButton;
        this._searchBody;
        this._choicesContainer;
        this._choices;
        this._searcher;
        this._importButton;
        this._filterPopup;
        this._filterCloseButton;
        this._filterBody;
        this._filterRulesContainer;
        this._filterAnyOrAll;
        this._filterRuleList;
        this._addFilterButton;
        this._filterTracklistContainer;
        this._filterTracklistHeader;
        this._filterTracklistImage;
        this._filterTracklistInfo;
        this._filterTracklistCounter;
        this._filterTracklistTotal;
        this._applyButton;
        this._filterTracklist;
        this._sourceBubble;

        this.createHTML();
    }
    //getter methods
    get type() {
        return this._type;
    }
    getTracks() {
        if (this._type === 'playlist') {
            this._tracks = this._sourceSearch.source.tracks;
            return this._tracks;
        }
        else if (this._type === 'album') {
            this._tracks = this._sourceSearch.source.tracks;
        }
    }
    getName() {
        if (this._type === 'playlist') {
            this._name = this._sourceSearch._playlistTitle.innerHTML;
            return this._name;
        }
        else if (this._type === 'album') {
            this._name = this._sourceSearch._albumTitle.innerHTML;
            return this._name;
        }
        else if (this._type === 'track') {
            this._name = this._sourceSearch._songTitle.innerHTML;
            return this._name;
        }
    }
    getOwner() {
        if (this._type === 'playlist') {
            this._owner = this._sourceSearch._playlistOwner.display_name;
            return this._owner;
        }
        else if (this._type === 'album') {
            this._owner = this._sourceSearch._albumOwner;
            return this._owner;
        }
        else if (this._type === 'track') {
            this._owner = this._sourceSearch._songArtist.innerHTML;
            return this._owner;
        }
    }
    getImage() {
        if (this._type === 'playlist') {
            this._image = this._sourceSearch._playlistImage.src;
            return this._image;
        }
        else if (this._type === 'album') {
            this._image = this._sourceSearch._albumImage.src;
            return this._image;
        }
        else if (this._type === 'track') {
            this._image = this._sourceSearch._songImage.src;
            return this._image;
        }
    }
    get filters() {
        return this._filters;
    }
    get filteredTracks() {
        return this._filteredTracks;
    }
    get sourceSearch() {
        return this._sourceSearch;
    }

    setSourceSearch() {
        if (this._type === 'playlist') {
            this._sourceSearch = new PlaylistSearch(this._token);
        }
        else if (this._type === 'track') {
            this._sourceSearch = new SongSearch(this._token);
        }
        else if (this._type === 'album') {
            this._sourceSearch = new AlbumSearch(this._token);
        }
    }

    createHTML() {
        let newDiv = document.createElement('div');
        newDiv.className = 'source-popup-container';
        this._sourcePopupContainer = newDiv;

        //SEARCH POPUP
        newDiv = document.createElement('div');
        newDiv.className = 'popup';
        newDiv.id = 'search-popup';
        this._searchPopup = newDiv;
        newDiv = document.createElement('div');
        newDiv.className = 'popup-container';
        this._searchPopup.appendChild(newDiv);
        newDiv = document.createElement('div');
        newDiv.className = 'popup-content';
        this._searchPopup.firstChild.appendChild(newDiv);
        newDiv = document.createElement('div');
        newDiv.className = 'popup-header';
        newDiv.id = 'search-header';
        this._searchPopup.firstChild.firstChild.appendChild(newDiv);
        newDiv = document.createElement('span');
        newDiv.className = 'close';
        newDiv.innerHTML = '&times;';
        var searchCloseButtonOnclick = function (_this) {
            return function () {
                if (!_this._editingSource) {
                    _this._sourcePopupContainer.outerHTML = '';
                    document.getElementById('body').style.overflow = 'scroll';
                }
                else {
                    _this._sourcePopupContainer.style.display = 'none';
                    _this._searcher.style.display = 'none';
                    document.getElementById('body').style.overflow = 'scroll';
                    _this._editingSource = false;
                    if (_this._originalSourceSearch) {
                        _this._sourceSearch = _this._originalSourceSearch;
                        _this._type = _this._originalSourceSearch.type;
                    }
                }
            }
        }
        newDiv.onclick = searchCloseButtonOnclick(this);
        this._searchCloseButton = newDiv;
        this._searchPopup.firstChild.firstChild.firstChild.appendChild(this._searchCloseButton);
        this._searchBody = document.createElement('div');
        this._searchBody.className = 'popup-body';
        this._searchBody.id = 'search-body';
        this._searchPopup.firstChild.firstChild.appendChild(this._searchBody);
        this._choicesContainer = document.createElement('div');
        this._choicesContainer.id = 'choices';
        this._searchBody.appendChild(this._choicesContainer);
        this._choices = [4];
        newDiv = document.createElement('h4');
        newDiv.innerHTML = 'Source Type';
        this._choicesContainer.appendChild(newDiv);
        newDiv = document.createElement('p');
        newDiv.innerHTML = 'Playlist';
        this._choices[0] = newDiv;
        newDiv = document.createElement('p');
        newDiv.innerHTML = 'Album';
        this._choices[1] = newDiv;
        newDiv = document.createElement('p');
        newDiv.innerHTML = 'Song';
        this._choices[2] = newDiv;
        newDiv = document.createElement('p');
        newDiv.innerHTML = 'Artist';
        this._choices[3] = newDiv;
        this._choices.forEach(element => {
            this._choicesContainer.appendChild(element);
        });

        for (let i = 0; i < this._choices.length; i++) {
            this._choices[i].onclick = this.choicesOnclick(i, this);
        }

        this._sourcePopupContainer.appendChild(this._searchPopup);
    }

    choicesOnclick(i, _this) {
        return function () {
            if (i === 0) {
                _this._type = 'playlist';
            }
            else if (i === 1) {
                _this._type = 'album';
            }
            else if (i === 2) {
                _this._type = 'track';
            }
            else if (i === 3) {
                _this._type = 'artist';
            }
            if (_this._editingSource) {
                _this._searcher.outerHTML = '';
            }
            _this._originalSourceSearch = _this._sourceSearch;
            _this.setSourceSearch();
            _this._sourceSearch.createHTML();
            _this._searcher = document.createElement('div');
            _this._searcher.id = 'searcher';
            _this._importButton = _this._sourceSearch._footerButtons[1];
            _this._importButton.onclick = _this.importButtonOnclick(_this);
            _this._searcher.appendChild(_this._sourceSearch.mainContainer);
            _this._searchBody.appendChild(_this._searcher);
            _this._choicesContainer.style.display = 'none';
            _this._searcher.style.display = 'block';
            document.getElementById('body').style.overflow = 'hidden';
        }
    }

    importButtonOnclick(_this) {
        return function () {

            function waitForTracks() {
                if (typeof _this._sourceSearch.source !== "undefined") {
                    _this._filterTracklist.innerHTML = '';
                    _this._sourceBubble.children[2].innerHTML = '';
                    _this._sourceBubble.children[2].innerHTML = '<p>Filter<p>';
                    _this._sourceBubble.children[2].style.cursor = 'pointer';
        
                    _this._sourceBubble.children[2].onmouseover = function () {
                        this.style.backgroundColor = 'green';
                        this.firstChild.style.color = 'white';
                        this.style.cursor = 'pointer';
                    }
        
                    _this.getTracks();
                    _this._filterTracklistImage.setAttribute('src', _this.getImage());
                    _this._filterTracklistTitle.innerHTML = _this.getName();
                    _this._filterTracklistTotal.innerHTML = 'Total Tracks: ' + _this._tracks.length;
                    _this._filterTracklistCounter.innerHTML = 'Filtered Tracks: ' + _this._tracks.length; //FOR NOW
        
        
                    _this.appendTracks(_this._tracks);
                    _this._waiting = false;
        
                }
                else {
                    _this._waiting = true;
                    setTimeout(waitForTracks, 250);
                }
            }

            if (_this._editingSource) {
                document.getElementById('body').style.overflow = 'scroll';
                _this._searcher.style.display = 'none';
                _this._sourcePopupContainer.style.display = 'none';

                _this._sourceBubble.firstChild.setAttribute('src', _this.getImage());
                _this._sourceBubble.children[1].firstChild.innerHTML = _this.getName();
                _this._sourceBubble.children[1].children[1].innerHTML = _this.getOwner();
                _this._sourceBubble.children[2].innerHTML = '<p>Loading...<p>';
                _this._sourceBubble.children[2].style.cursor = 'progress';
                _this._sourceBubble.children[2].onmouseover = null;

                if (_this._type === 'track') {
                    _this._sourceBubble.children[2].style.display = 'none';
                }
                else{
                    _this._sourceBubble.children[2].style.display = 'block';
                }
                _this._searcher.innerHTML = '';
                waitForTracks();
                _this._editingSource = false;
            }
            else {
                if (_this._type !== 'track') {

                    //CREATE FILTER POPUP
                    newDiv = document.createElement('div');
                    newDiv.className = 'popup';
                    newDiv.id = 'filter-popup';
                    _this._filterPopup = newDiv;
                    newDiv = document.createElement('div');
                    newDiv.className = 'popup-container';
                    _this._filterPopup.appendChild(newDiv);
                    newDiv = document.createElement('div');
                    newDiv.className = 'popup-content';
                    _this._filterPopup.firstChild.appendChild(newDiv);
                    newDiv = document.createElement('div');
                    newDiv.className = 'popup-header';
                    newDiv.id = 'filter-header';
                    _this._filterPopup.firstChild.firstChild.appendChild(newDiv);
                    newDiv = document.createElement('span');
                    newDiv.className = 'close';
                    newDiv.innerHTML = '&times;';
                    _this._filterCloseButton = newDiv;
                    var filterCloseButtonOnclick = function (_this) {
                        return function () {
                            document.getElementById('body').style.overflow = 'scroll';
                            _this._sourcePopupContainer.style.display = 'none';
                            //addSourceTracks();
                        }
                    }
                    _this._filterCloseButton.onclick = filterCloseButtonOnclick(_this);
                    _this._filterPopup.firstChild.firstChild.firstChild.appendChild(_this._filterCloseButton);
                    _this._filterBody = document.createElement('div');
                    _this._filterBody.className = 'popup-body';
                    _this._filterBody.id = 'filter-body';
                    _this._filterPopup.firstChild.firstChild.appendChild(_this._filterBody);
                    _this._filterRulesContainer = document.createElement('div');
                    _this._filterRulesContainer.className = 'filter-rules-container';
                    _this._filterBody.appendChild(_this._filterRulesContainer);
                    newDiv = document.createElement('h2');
                    newDiv.className = 'filter-rules-header';
                    newDiv.innerHTML = 'Filter Source';
                    _this._filterRulesContainer.appendChild(newDiv);
                    _this._filterAnyOrAll = document.createElement('select');
                    _this._filterAnyOrAll.id = _this._inclusionId;
                    let any = document.createElement('option');
                    any.text = 'Any';
                    any.value = 1;
                    let all = document.createElement('option');
                    all.text = 'All';
                    all.value = 2;
                    _this._filterAnyOrAll.add(any);
                    _this._filterAnyOrAll.add(all);
                    newDiv = document.createElement('p');
                    newDiv.innerHTML = 'Filter by ';
                    newDiv.appendChild(_this._filterAnyOrAll);
                    newDiv.innerHTML += ' of the following rules:';
                    _this._filterRulesContainer.appendChild(newDiv);
                    _this._filterRuleList = document.createElement('div');
                    _this._filterRuleList.className = 'rule-list';
                    _this._filterRulesContainer.appendChild(_this._filterRuleList);
                    _this._addFilterButton = document.createElement('div');
                    _this._addFilterButton.className = 'add-filter';
                    newDiv = document.createElement('img');
                    newDiv.setAttribute('src', './public/images/plus sign.png')
                    _this._addFilterButton.appendChild(newDiv);
                    newDiv = document.createElement('p');
                    newDiv.innerHTML = 'Add new rule';
                    _this._addFilterButton.appendChild(newDiv);

                    _this._addFilterButton.onclick = function(_this){
                        return function(){
                            let newFilter = new Filter();
                            _this._filterRuleList.insertBefore(newFilter._container, _this._filterRuleList.lastChild);
                            newFilter._delete.onclick = function (_this) {
                                return function () {
                                    let container = this.parentElement;
                                    let list = this.parentElement.parentElement.children;
                                    for (let i = 0; i < list.length; i++) {
                                        if (list[i] === container) {
                                            _this._filters.splice(i,1);
                                        }
                                    }
                                    this.parentElement.outerHTML = '';
                                    _this.applyFilters(_this)();
                                }
                            }(_this);
                            _this._filters.push(newFilter);
                        }
                    }(_this);

                    _this._filterRuleList.appendChild(_this._addFilterButton);
                    _this._filterTracklistContainer = document.createElement('div');
                    _this._filterTracklistContainer.className = 'tracklist-container';
                    _this._filterBody.appendChild(_this._filterTracklistContainer);
                    _this._filterTracklistHeader = document.createElement('div');
                    _this._filterTracklistHeader.className = 'tracklist-header';
                    _this._filterTracklistHeader.id = 'filter-tracklist-header';
                    _this._filterTracklistImage = document.createElement('img');
                    _this._filterTracklistHeader.appendChild(_this._filterTracklistImage);
                    _this._filterTracklistInfo = document.createElement('div');
                    _this._filterTracklistInfo.className = 'tracklist-info';
                    _this._filterTracklistTitle = document.createElement('h4');
                    _this._filterTracklistTitle.className = 'tracklist-title';
                    _this._filterTracklistTitle.innerHTML = _this.getName();
                    _this._filterTracklistTotal = document.createElement('p');
                    _this._filterTracklistTotal.className = 'data';
                    _this._filterTracklistTotal.innerHTML = '';
                    _this._filterTracklistCounter = document.createElement('p');
                    _this._filterTracklistCounter.className = 'data';
                    _this._filterTracklistCounter.innerHTML = '';
                    _this._applyButton = document.createElement('div');
                    _this._applyButton.className = 'apply-button';
                    let text = document.createElement('p');
                    text.innerHTML = 'Apply Filter';
                    _this._applyButton.appendChild(text);
                    _this._applyButton.onclick = _this.applyFilters(_this);
                    _this._filterTracklistInfo.appendChild(_this._filterTracklistTitle);
                    _this._filterTracklistInfo.appendChild(_this._filterTracklistTotal);
                    _this._filterTracklistInfo.appendChild(_this._filterTracklistCounter);
                    _this._filterTracklistInfo.appendChild(_this._applyButton);
                    _this._filterTracklistHeader.appendChild(_this._filterTracklistInfo);
                    _this._filterTracklistContainer.appendChild(_this._filterTracklistHeader);
                    _this._filterTracklist = document.createElement('div');
                    _this._filterTracklist.className = 'tracklist';
                    _this._filterTracklist.id = 'filter-tracklist';
                    _this._filterTracklistContainer.appendChild(_this._filterTracklist);

                    _this._sourcePopupContainer.appendChild(_this._filterPopup);
                }


                document.getElementById('body').style.overflow = 'scroll';
                _this._searcher.style.display = 'none';
                _this._sourcePopupContainer.style.display = 'none';

                var newBubble = document.createElement('div');
                newBubble.className = 'bubble';

                var newImg = document.createElement('img');
                newImg.setAttribute('src', _this.getImage());
                newBubble.appendChild(newImg);

                var newDiv = document.createElement('div');
                newDiv.className = 'bubble-info';

                var title = document.createElement('p');
                title.className = 'bubble-title';
                title.innerHTML = _this.getName();
                newDiv.appendChild(title);

                var owner = document.createElement('p');
                owner.className = 'bubble-owner';
                owner.innerHTML = _this.getOwner();
                newDiv.appendChild(owner);

                newBubble.appendChild(newDiv);

                var newButton = document.createElement('div');
                newButton.className = 'bubble-filter';
                newButton.innerHTML = '<p>Loading...<p>';
                newButton.style.cursor = 'progress';

                newButton.onmouseout = function () {
                    newButton.style.backgroundColor = 'white';
                    newButton.firstChild.style.color = 'black';
                }

                newButton.onclick = function () {
                    if (_this._waiting === false) { //define waiting
                        _this._searchPopup.style.display = 'none';
                        _this._filterPopup.style.display = 'table';
                        _this._sourcePopupContainer.style.display = 'block';
                        document.getElementById('body').style.overflow = 'hidden';
                    }
                }

                if (_this._type != 'track') {
                    newBubble.appendChild(newButton);
                }

                var newBubbleOptions = document.createElement('div');
                newBubbleOptions.className = 'bubble-options';
                var newBubbleDeleteIcon = document.createElement('img');
                newBubbleDeleteIcon.className = 'delete-icon';
                newBubbleDeleteIcon.setAttribute('src', './public/images/trash-icon.png');

                var bubbleDeleteIconOnclick = function (_this) {
                    return function () {
                        removeSource(this.parentNode.parentNode);
                        //addSourceTracks();
                        this.parentNode.parentNode.outerHTML = '';
                        _this._sourcePopupContainer.outerHTML = '';
                    }
                }
                newBubbleDeleteIcon.onclick = bubbleDeleteIconOnclick(_this);

                var newBubbleEditIcon = document.createElement('img');
                newBubbleEditIcon.setAttribute('src', './public/images/edit-icon.png');
                newBubbleEditIcon.className = 'edit-icon';

                newBubbleEditIcon.onclick = function () {
                    _this._editingSource = true;
                    _this._filterPopup.style.display = 'none';
                    _this._searchPopup.style.display = 'table';
                    _this._choicesContainer.style.display = 'block';
                    _this._sourcePopupContainer.style.display = 'block';
                    document.getElementById('body').style.overflow = 'hidden';
                }

                newBubbleOptions.appendChild(newBubbleDeleteIcon);
                newBubbleOptions.appendChild(newBubbleEditIcon);
                newBubble.appendChild(newBubbleOptions);

                newBubble.style.display = 'block';
                _this._sourceBubble = newBubble;
                _this._searcher.innerHTML = '';
                addSourceBubble();
                waitForTracks();
            }
        }
    }
    applyFilters(_this){
        return function(){
            let value = document.getElementById(_this._inclusionId).value;
            let filteredTrackSets = [];
            if(value === '1'){
                for(let i =0; i<_this._filters.length; i++){
                    if(_this._filters[i]._function){
                        filteredTrackSets.push(_this._filters[i]._function(_this._filters[i], _this._tracks));
                    }
                }
                if(filteredTrackSets.length > 1){
                    _this._filteredTracks = merge(filteredTrackSets);
                }
                else if(filteredTrackSets.length === 1){
                    _this._filteredTracks = filteredTrackSets[0];
                }
                else {
                    _this._filteredTracks = _this._tracks;
                }
            }
            else if(value === '2'){
                for(let i =0; i<_this._filters.length; i++){
                    if(_this._filters[i]._function){
                        filteredTrackSets.push(_this._filters[i]._function(_this._filters[i], _this._tracks));
                    }
                }
                if(filteredTrackSets.length > 1){
                    _this._filteredTracks = intersection.apply(this, filteredTrackSets);
                }
                else if(filteredTrackSets.length === 1){
                    _this._filteredTracks = filteredTrackSets[0];
                }
                else {
                    _this._filteredTracks = _this._tracks;
                }
            }
            console.log(_this._filteredTracks);
            _this.appendTracks(_this._filteredTracks);            
        }
    }
    appendTracks(tracks){
        this._filterTracklist.innerHTML = '';
        this._filterTracklistInfo.children[2].innerHTML = 'Filtered Tracks: ' + tracks.length;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i]) {
                var newTrack = document.createElement('div');
                newTrack.className = 'track';
                var newTrackImg = document.createElement('img');
                newTrackImg.src = tracks[i].image;
                var newTrackName = document.createElement('p');
                newTrackName.className = 'name';
                newTrackName.innerHTML = tracks[i].name;
                var newTrackArtists = document.createElement('p');
                newTrackArtists.className = 'artists';
                newTrackArtists.innerHTML = tracks[i].getArtistString();
                var newTrackInfo = document.createElement('div');
                newTrackInfo.className = 'track-info';
                var trackInfoIcon = document.createElement('img');
                trackInfoIcon.className = 'info-icon';
                trackInfoIcon.setAttribute('src','./public/images/info-icon.png');
                
                var trackDataPopup = document.createElement('div');
                trackDataPopup.className = 'track-data-popup';
                if(i>tracks.length-4){
                    //trackDataPopup.style.bottom = (115 / (tracks.length - i)) + 'px';
                }
                var trackDataTypes = ['Position','Popularity','Tempo','Key','Mode','Explicit','Energy','Danceability','Valence','Duration'];
                var keys = ['C','Db','D','Eb','E','F','F#','G','Ab','A','Bb','B'];

                for(let j=0; j<9; j++){
                    var trackData = document.createElement('p');
                    if(j===0){
                        trackData.innerHTML = 'Position: ' + i;
                    }
                    else if(j===3){
                        trackData.innerHTML = 'Key: ' + keys[tracks[i][trackDataTypes[j].toLowerCase()]];
                    }
                    else if(j === 4){
                         var mode;
                        if(tracks[i].mode === 1){
                            mode = 'major';
                        }
                        else{
                            mode='minor';
                        }
                        trackData.innerHTML = 'Mode: ' + mode;
                    }
                    else{
                        trackData.innerHTML = trackDataTypes[j] + ': ' + tracks[i][trackDataTypes[j].toLowerCase()];
                    }
                    trackDataPopup.appendChild(trackData);
                }
                
                trackInfoIcon.onmouseenter = function(popup){
                    return function(){
                        this.style.opacity = 1;
                        this.style.cursor = 'pointer'
                        popup.style.display = 'block';
                    }
                }(trackDataPopup);
                trackInfoIcon.onmouseleave = function(popup){
                        return function(){
                            this.style.opacity = 0.7;
                            this.style.cursor = 'default';
                            popup.style.display = 'none';
                        }
                }(trackDataPopup);

                newTrack.appendChild(newTrackImg);
                newTrackInfo.appendChild(newTrackName);
                newTrackInfo.appendChild(newTrackArtists);
                newTrack.appendChild(newTrackInfo);
                newTrack.appendChild(trackInfoIcon);
                newTrack.appendChild(trackDataPopup);
                this._filterTracklist.appendChild(newTrack);
            }
        }
    }
}

class Track {
  constructor(){
      this._id;
      this._name;
      this._artists;
      this._album;
      this._explicit;
      this._popularity;
      this._tempo;
      this._key;
      this._mode;
      this._energy;
      this._danceability;
      this._valence;
      this._duration;
      this._image;
  }
  set id(id){
      this._id = id;
  }
  set name(name){
      this._name = name;
  }
  set artists(artists){
      this._artists = artists;
  }
  set album(album){
      this._album = album;
  }
  set image(image){
      this._image = image;
  }
  set explicit(explicit){
      this._explicit=explicit;
  }
  set popularity(pop){
      this._popularity=pop;
  }
  set tempo(tempo){
      this._tempo = tempo;
  }
  set key(key){
      this._key = key;
  }
  set energy(energy){
      this._energy=energy;
  }
  set danceability(danceability){
      this._danceability=danceability;
  }
  set valence(valence){
      this._valence=valence;
  }
  set duration(duration){
      this._duration=duration;
  }
  set mode(mode){
      this._mode = mode;
  }
  get id(){
      return this._id;
  }
  get name(){
      return this._name;
  }
  get artists(){
      return this._artists;
  }
  get album(){
      return this._album;
  }
  get image(){
      return this._image;
  }
  get explicit(){
      return this._explicit;
  }
  get popularity(){
      return this._popularity;
  }
  get tempo(){
      return this._tempo;
  }
  get key(){
      return this._key;
  }
  get energy(){
      return this._energy;
  }
  get danceability(){
      return this._danceability;
  }
  get valence(){
      return this._valence;
  }
  get duration(){
      return this._duration;
  }
  get mode(){
      return this._mode;
  }
  getArtistString(){
    var string = '';
    for(let i=0; i<this._artists.length; i++){
        if(i===0){
            string+=this._artists[0];
        }
        else{
            string+=', ' + this._artists[i];
        }
    }

    return string;
  }
};

class Filter{
    constructor(){
        this._container;
        this._header;
        this._selector;
        this._delete;
        this._content;
        this._options = ['Position','Popularity','Tempo','Key','Mode','Explicit','Energy','Danceability','Valence','Artist'];
        this._type;
        this._function;
        this._operator;
        this._field;
        this._params;
        this.createHTML();
    }
    createHTML(){
        this._container = document.createElement('div');
        this._container.className = 'filter';
        this._header = document.createElement('h5');
        this._header.innerHTML = 'Filter Type:';
        this._container.appendChild(this._header);
        this._selector = document.createElement('select');
        for(let i=0; i<this._options.length; i++){
            let newFilterOption = document.createElement('option');
            newFilterOption.innerHTML = this._options[i];
            this._selector.appendChild(newFilterOption);
        }
        this._container.appendChild(this._selector);

        this._delete = document.createElement('img');
        this._delete.className = 'delete-icon';
        this._delete.setAttribute('src', './public/images/trash-icon.png');
        this._delete.onclick = function(){
            this.parentElement.outerHTML = '';
        }
        this._container.appendChild(this._delete);

        this._content = document.createElement('div');
        this._content.className = 'filter-content';
        this._container.appendChild(this._content);
        
        this.setFilterContent(this)();
        this._selector.onchange = this.setFilterContent(this);
    }
    setFilterContent(_this){
        return function(){
        _this._type = _this._selector.value;
        _this._content.innerHTML = '';
        _this._content.className = 'filter-content';
        
        //EXPLICIT
        if(_this._type ==='Explicit'){
            _this._function = _this.filterExplicit;
            _this._content.className += ' typea';
            let newElement = document.createElement('p');
            newElement.innerHTML = 'Song is';
            _this._content.appendChild(newElement);
            
            _this._operator = document.createElement('select');
            let options = ['Explicit', 'Clean'];
            for(let i=0; i<options.length; i++){
                let option = document.createElement('option');
                option.innerHTML = options[i];
                _this._operator.appendChild(option);
            }
            _this._content.appendChild(_this._operator);
            _this._function = _this.filterExplicit;
        }
        else if(_this._type ==='Mode'){
            _this._function = _this.filterMode;
            _this._content.className += ' typea';
            let newElement = document.createElement('p');
            newElement.innerHTML = 'Mode is';
            _this._content.appendChild(newElement);
            
            _this._operator = document.createElement('select');
            let options = ['Major', 'Minor'];
            for(let i=0; i<options.length; i++){
                let option = document.createElement('option');
                option.innerHTML = options[i];
                _this._operator.appendChild(option);
            }
            _this._content.appendChild(_this._operator);
            _this._function = _this.filterMode
        }
        //POSITION
        else if(_this._type === 'Position'){
            _this._function = _this.filterPosition;
            _this._content.className += ' typea';
            let newElement = document.createElement('p');
            newElement.innerHTML = 'Position is';
            _this._content.appendChild(newElement);
            
            _this._operator = document.createElement('select');
            let options = ['Above', 'Below','Between'];
            for(let i=0; i<options.length; i++){
                let option = document.createElement('option');
                option.innerHTML = options[i];
                _this._operator.appendChild(option);
            }
            _this._content.appendChild(_this._operator);

            newElement = document.createElement('div');
            newElement.style.display = 'inline';
            _this._content.appendChild(newElement);
            _this.setTypeAArgs(_this)();
            _this._operator.onchange = _this.setTypeAArgs(_this);
        }
        //KEY
        else if(_this._type === 'Key'){
            _this._function = _this.filterKey;
            var keys = ['C','Db','D','Eb','E','F','F#','G','Ab','A','Bb']
            for(let i=0; i<11; i++){
                let keyChoice = document.createElement('div');
                keyChoice.className = 'keychoice';
                keyChoice.innerHTML = keys[i];
                keyChoice.setAttribute('data-ischosen',false);
                keyChoice.onclick = function(){
                    if(this.dataset.ischosen === 'true'){
                        this.style.backgroundColor = 'white';
                        this.style.color = '#616161';  
                        keyChoice.setAttribute('data-ischosen',false);
                    }
                    else{
                        this.style.backgroundColor = '#616161';
                        this.style.color = 'white';
                        keyChoice.setAttribute('data-ischosen',true);
                    }
                }
                _this._content.appendChild(keyChoice);
            }
        }
        //TEMPO/PERCENTAGE VALUES
        else if(_this._type === 'Energy' || _this._type === 'Tempo' || _this._type === 'Danceability' || _this._type === 'Valence' || _this._type === 'Popularity'){
            if(_this._type === 'Tempo'){
                _this._function = _this.filterTempo;
            }
            else if(_this._type === 'Popularity'){
                _this._function = _this.filterPopularity;
            }
            else{
                _this._function = _this.filterPercent;
            }
            _this._content.className += ' typea';
            let newElement = document.createElement('p');
            newElement.innerHTML = _this._type + ' is';
            _this._content.appendChild(newElement);
            
            _this._operator = document.createElement('select');
            let options = ['Greater Than', 'Less Than','Between'];
            for(let i=0; i<options.length; i++){
                let option = document.createElement('option');
                option.innerHTML = options[i];
                _this._operator.appendChild(option);
            }
            _this._content.appendChild(_this._operator);

            newElement = document.createElement('div');
            newElement.style.display = 'inline';
            _this._content.appendChild(newElement);
            _this.setTypeAArgs(_this)();
            _this._operator.onchange = _this.setTypeAArgs(_this);
        }
    }
    }
    setTypeAArgs(_this){
        return function(){
            _this._container.children[3].lastChild.innerHTML =''; 
            var unit = '';
            if(_this._type === 'Tempo'){
                unit = 'BPM';
            }
            else if(_this._type === 'Position'){
                unit = '';
            }
            else if(_this._type === 'Energy' || _this._type === 'Danceability' || _this._type === 'Valence' || _this._type === 'Popularity'){
                unit = '%';
            }



        if (_this._operator.value != 'Between') {
            _this._field = document.createElement('input');
            _this._field.type = 'field';
            _this._field.onkeyup = function(_this){
                return function(){
                    _this._params = this.value;
                    console.log(_this._params);
                }
            }(_this);
            _this._container.children[3].lastChild.appendChild(_this._field);
            let element = document.createElement('p');
            element.innerHTML = unit;
            _this._container.children[3].lastChild.appendChild(element);
        }
        else {
            _this._container.children[3].lastChild.innerHTML = '';
            _this._field = [];
            let element = document.createElement('input');
            element.type = 'field';
            _this._field.push(element);
            element = document.createElement('input');
            element.type = 'field';
            _this._field.push(element);
            console.log(_this._field);
            for(let i=0; i<_this._field.length; i++){
                _this._field[i].onkeyup = function(_this){
                    return function(){
                        _this._params = [_this._field[0].value,_this._field[1].value];
                        console.log(_this._params);
                    }
                }(_this);
            }

            _this._container.children[3].lastChild.appendChild(_this._field[0]);
            element = document.createElement('p');
            element.innerHTML = '-';
            _this._container.children[3].lastChild.appendChild(element);
            _this._container.children[3].lastChild.appendChild(_this._field[1]);
            element = document.createElement('p');
            element.innerHTML = unit;
            _this._container.children[3].lastChild.appendChild(element);
        }
    }
    }
    filterTempo(_this, tracks){
        let filteredTracks = [];
        if(_this._operator.value==='Greater Than'){
            for(let i=0; i<tracks.length; i++){
                if(tracks[i] && (tracks[i].tempo>=_this._params)){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Less Than'){
            for(let i=0; i<tracks.length; i++){
                if(tracks[i] && (tracks[i].tempo<=_this._params)){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Between'){
            for(let i=0; i<tracks.length; i++){
                if(tracks[i] && (tracks[i].tempo>=_this._params[0] && tracks[i].tempo<=_this._params[1])){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
    }
    filterExplicit(_this, tracks){
        let filteredTracks = [];
        if(_this._operator.value==='Explicit'){
            for(let i=0; i<tracks.length; i++){
                if(tracks[i] && (tracks[i].explicit===true)){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Clean'){
            for(let i=0; i<tracks.length; i++){
                if(tracks[i] && (tracks[i].explicit===false)){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
    }
    filterPosition(_this, tracks){
        let filteredTracks = [];
        if(_this._operator.value==='Above'){
            for(let i=0; i<_this._params; i++){
                filteredTracks.push(tracks[i]);
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Below'){
            for(let i=_this._params; i<tracks.length; i++){
                filteredTracks.push(tracks[i]);
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Between'){
            for(let i=_this._params[0]; i<_this._params[1]; i++){
                filteredTracks.push(tracks[i]);
            }
            return filteredTracks;
        }
    }
    filterKey(_this, tracks){
        let filteredTracks = [];
        let keys = [];
        for(let i=0; i<_this._content.children.length; i++){
            if(_this._content.children[i].dataset.ischosen === 'true'){
                keys.push(i);
            }
        }

        for(let i=0; i<tracks.length; i++){
            for(let j=0; j<keys.length; j++){
                if(tracks[i] && (tracks[i].key === keys[j])){
                    filteredTracks.push(tracks[i]);
                }
            }
        }

        return filteredTracks;
    }
    filterMode(_this, tracks){
        let filteredTracks = [];
        let mode;
        console.log(_this._operator.value);
        if(_this._operator.value === 'Major'){
            mode = 1;
        }
        else{
            mode = 0;
        }
        console.log(tracks);
        console.log(mode);
        for(let i=0; i<tracks.length; i++){
            if(tracks[i]){
                console.log(tracks[i].mode);
                if(tracks[i].mode === mode){
                    console.log('!');
                    filteredTracks.push(tracks[i]);
                }
            }
        }
        return filteredTracks;
    }
    filterPercent(_this, tracks){
        let type = _this._type.toLowerCase();
        let filteredTracks = [];
        if(_this._operator.value==='Greater Than'){
            for(let i=0; i<tracks.length; i++){
                let track = tracks[i];
                if(track && (track[type]>=(_this._params/100))){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Less Than'){
            for(let i=0; i<tracks.length; i++){
                let track = tracks[i];
                if(track && (track[type]<=(_this._params/100))){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Between'){
            for(let i=0; i<tracks.length; i++){
                let track = tracks[i];
                if(track && (track[type]>=(_this._params[0]/100) && track[type]<=(_this._params[1]/100))){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
    }
    filterPopularity(_this, tracks){
        let type = _this._type.toLowerCase();
        let filteredTracks = [];
        if(_this._operator.value==='Greater Than'){
            for(let i=0; i<tracks.length; i++){
                let track = tracks[i];
                if(track[type]>=_this._params){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Less Than'){
            for(let i=0; i<tracks.length; i++){
                let track = tracks[i];
                if(track[type]<=_this._params){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
        else if(_this._operator.value==='Between'){
            for(let i=0; i<tracks.length; i++){
                let track = tracks[i];
                if(track[type]>=_this._params[0] && track[type]<=_this._params[1]/100){
                    filteredTracks.push(tracks[i]);
                }
            }
            return filteredTracks;
        }
    }
}

 class Playlist{
  constructor()
  {
      this._id;
      this._name;
      this._owner;
      this._description;
      this._followers;
      this._images;
      this._tracks;
  }
  set id(id){
      this._id = id;
  }
  set name(name){
      this._name = name;
  }
  set owner(owner){
      this._owner = owner;
  }
  set description(description){
      this._descripton = description;
  }
  set followers(followers){
      this._followers = followers;
  }
  set images(images){
      this._images = images;
  }
  set tracks(tracks){
      this._tracks = tracks;
  }
  get id(){
      return this._id;
  }
  get name(){
      return this._name;
  }
  get owner(){
      return this._owner;
  }
  get description(){
      return this._description;
  }
  get followers(){
      return this._followers;
  }
  get images(){
      return this._images;
  }
  get tracks(){
      return this._tracks;
  }
}

class Album{
  constructor()
  {
      this._id;
      this._name;
      this._artists;
      this._images;
      this._tracks;
  }
  set id(id){
      this._id = id;
  }
  set name(name){
      this._name = name;
  }
  set artists(artists){
      this._artists = artists;
  }
  set images(images){
      this._images = images;
  }
  set tracks(tracks){
      this._tracks = tracks;
  }
  get id(){
      return this._id;
  }
  get name(){
      return this._name;
  }
  get artists(){
      return this._artists;
  }
  get images(){
      return this._images;
  }
  get tracks(){
      return this._tracks;
  }
}

class Artist{
    constructor(){
        this._id;
        this._name;
        this._genres;
        this._followers;
        this._popularity;
        this._images;
        this._albums;
        this._tracks;
    }
  set id(id){
      this._id = id;
  }
  set name(name){
      this._name = name;
  }   
  set albums(albums){
      this._albums = albums;
  }
  set images(images){
      this._images = images;
  }
  set tracks(tracks){
      this._tracks = tracks;
  }
  set followers(followers){
      this._followers = followers;
  }
  set popularity(popularity){
      this._popularity = popularity;
  }
  set genres(genres){
      this._genres = genres;
  }
  get id(){
      return this._id;
  }
  get name(){
      return this._name;
  }
  get albums(){
      return this._albums;
  }
  get images(){
      return this._images;
  }
  get tracks(){
      return this._tracks;
  }
  get popularity(){
      return this._popularity;
  }
  get followers(){
      return this._followers;
  }
  get genres(){
      return this._genres;
  }
}

class SourceSearch {
  constructor(token){
      //inherited variables
      this._token = token; //access token
      this._source; //the returned source
      this._type;
      this._mainContainer; //the source searching window
      this._sourceDisplayDiv; //the source preview
      this._searchForm; //the form containing search inputs and buttons
      this._searchBar; //the bar containing the search field and button
      this._searchField; //the input field for searching
      this._searchEntry; //the inputted value
      this._submitButtons; //the submit button(s)
      this._dropdown; //dropdown search results
      this._dropdownResults; //array of individual results within the dropdown
      this._searchResultsContainer; //the container for displaying search results & header
      this._searchResultsHeader; //header saying "results for ___:"
      this._searchResultsPage; //the scrollable container for search results
      this._searchResults; //array of individual search results
      this._footerButtons; //search again & import buttons
      this._offset = 0; //offset for search
  }
  get token(){
      return this._token;
  }
  get source(){
      return this._source;
  }
  get type(){
      return this._type;
  }
  get mainContainer(){
      return this._mainContainer;
  }

  createHTML(){
      //overridden 
  }
  setElementAttributes(){
      //overridden
  }
  searchFieldOnKeyUp(){
      //overridden
  }
  dropdownOnclick(){
      //overridden
  }
  submitButtonOnclick(){
      //overridden
  }
  searchResultOnclick(){
      //overridden
  }
  searchAgainButtonOnclick(){
      //overridden
  }
  searchResultPageOnscroll(){
      //overridden
  }

  async getTrack(trackId){
      var track = new Track();
      var _this = this;
      
      try{
        var result = await $.ajax({
          url: `https://api.spotify.com/v1/tracks/${trackId}`,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
       });
    
        var data = await result;
    
        track.id = data.id;
        track.name = data.name;
        track.artists = data.artists.map(artist => artist.name);
        track.album = data.album.name;
        track.image = data.album.images[0].url;
        track.explicit = data.explicit;
        track.popularity = data.popularity;
    
        track = await _this.getTrackAnalysis(track);
    
        return track;
      }
      catch(error){
        console.log(error);
      }
    }
    async getTrackAnalysis(trackObject){
      var trackId = trackObject.id;
      var _this = this;
      
      try{
        var result = await $.ajax({
          url: `https://api.spotify.com/v1/audio-features/${trackId}`,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
       });
    
        var data = await result;
    
        trackObject.tempo = data.tempo;
        trackObject.key = data.key;
        trackObject.mode = data.mode;
        trackObject.energy = data.energy;
        trackObject.danceability = data.danceability; 
        trackObject.valence = data.valence;
        trackObject.duration = data.duration_ms;
    
        return trackObject;
      }
      catch(error){
        console.log(error);
      }
    }
    async searchSpotify(query){
      query = this.encodeQueryString(query);
      var resultArray = [];
      var _this = this;

      try{
          let result = await $.ajax({
              url: `https://api.spotify.com/v1/search?q=${query}&type=${_this._type}&offset=${_this._offset}`,
              type: "GET",
              beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
          });
          let data = await result;
          
          resultArray = _this.createSearchResultArray(data);
  
          return resultArray;
          
          }
      catch(error){
          console.log(error);
      }
    }
    encodeQueryString(query){
      var array = query.split(' ');
      var string = '%22';
      for(let i=0; i<array.length; i++){
          if(i===array.length - 1){
              string+=array[i] + '%22';
          }
          else{
              string+=array[i] + '%20'
          }
      }
      return string;
  }
  createSearchResultArray(data){
      //overridden 
  }
}

class AlbumSearch extends SourceSearch{
  constructor(token){
      super(token);
      this._type = 'album';
      this._albumIdInput; //the input field for album ID
      this._albumHeader; //header for the album preview
      this._albumImage; //image for the album preview
      this._albumInfo; //info for the album preview
      this._albumTitle; //title of album
      this._albumInfoItems; //artist and track count in album header
      this._tracklist; //tracklist for the album preview
      this._albumOwner;
  }
  createHTML(){
      //main container
      this._mainContainer = document.createElement('div');
      this._mainContainer.className = 'source-search foralbum';

      //search form
      this._searchForm = document.createElement('div');
      this._searchForm.className = 'form';
      this._mainContainer.appendChild(this._searchForm);

      this._searchBar = [document.createElement('div'), document.createElement('div')];
      this._searchBar[0].className = 'bar';
      this._searchBar[1].className = 'bar';
      let h5 = [document.createElement('h5'), document.createElement('h5')];
      h5[0].innerHTML = 'Search for Album';
      h5[1].innerHTML = 'Input Album ID';
      this._searchBar[0].appendChild(h5[0]);
      this._searchBar[1].appendChild(h5[1]);
      this._searchForm.appendChild(this._searchBar[0]);
      this._searchForm.appendChild(this._searchBar[1]);

      this._searchField = document.createElement('input');
      this._searchField.type = 'text';
      this._searchField.className = 'field';
      this._searchField.autocomplete = 'off';
      this._searchField.placeholder = 'Search...';
      this._searchBar[0].appendChild(this._searchField);

      this._submitButtons = [document.createElement('button'), document.createElement('button')];
      this._submitButtons[0].className = 'submit';
      this._submitButtons[0].innerHTML = '&#128269';
      this._submitButtons[1].className = 'submit';
      this._submitButtons[1].innerHTML = '&#128269';
      this._searchBar[0].appendChild(this._submitButtons[0]);

      this._dropdown = document.createElement('div');
      this._dropdown.className = 'dropdown';
      this._searchForm.appendChild(this._dropdown);

      this._albumIdInput = document.createElement('input');
      this._albumIdInput.type = 'text';
      this._albumIdInput.className = 'field';
      this._albumIdInput.autocomplete = 'off';
      this._albumIdInput.placeholder = 'Ex: 37i9dQZF1DWZZbwlv3Vmtr';
      this._searchBar[1].appendChild(this._albumIdInput);
      this._searchBar[1].appendChild(this._submitButtons[1]);

      //search results
      this._searchResultsContainer = document.createElement('div');
      this._searchResultsContainer.className = 'search-results-container';
      this._mainContainer.appendChild(this._searchResultsContainer);

      this._searchResultsHeader = document.createElement('h4');
      this._searchResultsContainer.appendChild(this._searchResultsHeader);

      this._searchResultsPage = document.createElement('div');
      this._searchResultsPage.className = 'scrolling-list';
      this._searchResultsContainer.appendChild(this._searchResultsPage);

      //source display
      this._sourceDisplayDiv = document.createElement('div');
      this._sourceDisplayDiv.className = 'source-display';
      this._mainContainer.appendChild(this._sourceDisplayDiv);

      this._albumHeader = document.createElement('div');
      this._albumHeader.className = 'album-header';
      this._sourceDisplayDiv.appendChild(this._albumHeader);

      this._albumImage = document.createElement('img');
      this._albumImage.className = 'album-image';
      this._albumHeader.appendChild(this._albumImage);

      this._albumInfo = document.createElement('div');
      this._albumInfo.className = 'album-info';
      this._albumHeader.appendChild(this._albumInfo);

      this._albumTitle = document.createElement('h4');
      this._albumTitle.className = 'album-title';
      this._albumInfo.appendChild(this._albumTitle);

      this._albumInfoItems = [document.createElement('p'), document.createElement('p')];
      this._albumInfoItems[0].className = 'data';
      this._albumInfoItems[1].className = 'data';
      this._albumInfo.appendChild(this._albumInfoItems[0]);
      this._albumInfo.appendChild(this._albumInfoItems[1]);

      this._tracklist = document.createElement('div');
      this._tracklist.className = 'tracklist';
      this._sourceDisplayDiv.appendChild(this._tracklist);

      this._footerButtons = [document.createElement('div'), document.createElement('div')];
      this._footerButtons[0].className = 'confirmation no';
      this._footerButtons[0].innerHTML = '<p>Search Again</p>';
      this._footerButtons[1].className = 'confirmation yes';
      this._footerButtons[1].innerHTML = '<p>Import</p>';
      this._mainContainer.appendChild(this._footerButtons[0]);
      this._mainContainer.appendChild(this._footerButtons[1]);

      this.setElementAttributes();
  }

  setElementAttributes(){
      this._searchField.onkeyup = this.searchFieldOnKeyUp(this);
      this._footerButtons[0].onclick = this.searchAgainButtonOnclick(this);
      this._searchResultsPage.onscroll = this.searchResultPageOnscroll(this);
      this._submitButtons[1].onclick = this.albumIdInputSubmitButtonOnclick(this);
  }
  searchFieldOnKeyUp(_this){
      return function(){
          console.log(_this._searchField.value);
          _this._dropdownResults = [];
          _this._dropdown.innerHTML='';
          _this._dropdown.style.display = 'none';
          if(_this._searchField.value){
              _this._searchEntry = _this._searchField.value;
              _this.searchSpotify(_this._searchEntry).then(value =>{ 
                  //display search result dropdown
                  if(value){
                      for(let i = 0; i<5; i++){
                          console.log(value[i]);
                          var newDiv = document.createElement('div');
                          newDiv.className = 'search-result';
                          newDiv.value = value[i].id;
                          
                          var p = document.createElement('p');
                          p.innerHTML = value[i].name;
                          newDiv.appendChild(p);

                          _this._dropdown.appendChild(newDiv);
                          _this._dropdownResults.push(newDiv);
                      }
                      
                      _this._dropdown.style.display = 'block';
                      //set result onclick value
                      for(let i=0; i<5; i++){
                          _this._dropdownResults[i].onclick = _this.dropDownOnclick(_this, value, i);
                      }
                  }
              });
          }

          _this._submitButtons[0].onclick = _this.submitButtonOnclick(_this);
      }
  }
  dropDownOnclick(_this, value, i){ 
      return function(){
      var albumId = value[i].id;
      
      _this._albumImage.setAttribute('src', '');
      _this._albumInfoItems[0].innerHTML = '';
      _this._albumInfoItems[1].innerHTML = '';
      _this._tracklist.innerHTML = '';
      _this._searchResultsPage.innerHTML = '';
      _this._searchResultsContainer.style.display = 'none';
      _this._dropdown.style.display = 'none';
      _this._dropdown.innerHTML='';
      _this._searchField.value = '';
      _this._searchForm.style.display = 'none';

      _this.getAlbumInfo(albumId).then(value => {
          _this._albumImage.setAttribute('src', value.images[0]);
          _this._albumTitle.innerHTML = value.name;
          _this._albumOwner = value.artists.join(', ');
          _this._albumInfoItems[0].innerHTML = 'Artist: ' + value.artists.join(', ');
          _this._albumInfoItems[1].innerHTML = 'Tracks: ' + value.tracks.length;

          for(let i = 0; i<value.tracks.length; i++){
              var albumTrack = document.createElement('div');
              albumTrack.className = 'track';
              albumTrack.id = 't' + i;
              
              var trackName = document.createElement('h4'); 
              trackName.className='name';
              trackName.innerHTML = value.tracks[i].name;
              albumTrack.appendChild(trackName);
              var trackArtists = document.createElement('p');
              trackArtists.className = 'artists';
              trackArtists.innerHTML = value.artists.join(', ');
              albumTrack.appendChild(trackArtists);
              _this._tracklist.appendChild(albumTrack);
          }

          //display playlist
          _this._sourceDisplayDiv.style.display = 'block';
          _this._footerButtons[0].style.display = 'inline-block';
          _this._footerButtons[1].style.display = 'inline-block';
      });

      _this.getAlbum(albumId).then(value => {
          _this._source = value;
      });
      }
  }
  submitButtonOnclick(_this){
      return function(){
          _this._offset = 0;
          _this._albumImage.setAttribute('src', '');
          _this._albumInfoItems[0].innerHTML = '';
          _this._albumInfoItems[1].innerHTML = '';
          _this._tracklist.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._searchForm.style.display = 'none';
          _this._sourceDisplayDiv.setAttribute('display', 'none');
          _this._searchResultsContainer.style.display = 'block';

  
          _this.searchSpotify(_this._searchEntry).then(value =>{
              if(value){
                  _this._searchResultsHeader.innerHTML = 'Results for "' + _this._searchEntry + '":';
                  for(let i = 0; i<value.length; i++){
                      var resultDiv = document.createElement('div');
                      resultDiv.className = 'search-result';
                      resultDiv.value = value[i].id;
                      var name = document.createElement('p');
                      name.className = 'result-name';
                      name.innerHTML = value[i].name;
                      resultDiv.appendChild(name);
                      var artist = document.createElement('p');
                      artist.className = 'result-person';
                      console.log(value);
                      artist.innerHTML = value[i].artist.join(', ');
                      resultDiv.appendChild(artist);
                      _this._searchResultsPage.appendChild(resultDiv);
                  }
                  
                  _this._searchResults = document.querySelectorAll('div.scrolling-list > .search-result');
                  
                  //set onclick for result
                  for(let i=0; _this._searchResults[i]; i++){
                      _this._searchResults[i].onclick = _this.searchResultOnclick(_this, value, i)
                  }
              }
          });
         }
  }
  searchResultOnclick(_this, result, i){
      return function(){
      let albumId = result[i].id;
      
      _this._albumImage.setAttribute('src', '')
      _this._albumInfoItems[0].innerHTML = '';
      _this._albumInfoItems[1].innerHTML = '';
      _this._tracklist.innerHTML = '';
      _this._searchResultsPage.innerHTML = '';
      _this._searchResultsContainer.style.display = 'none';

      _this._dropdown.style.display = 'none';
      _this._dropdown.innerHTML='';

      _this.getAlbumInfo(albumId).then(value => {
          _this._albumImage.setAttribute('src', value.images[0]);
          _this._albumTitle.innerHTML = value.name;
          _this._albumOwner = value.artists.join(', ');
          _this._albumInfoItems[0].innerHTML = 'Artist: ' + value.artists.join(', ');
          _this._albumInfoItems[1].innerHTML = 'Tracks: ' + value.tracks.length;

          for(let i = 0; i<value.tracks.length; i++){
              var albumTrack = document.createElement('div');
              albumTrack.className = 'track';
              albumTrack.id = 't' + i;
              
              var trackName = document.createElement('h4'); 
              trackName.className='name';
              trackName.innerHTML = value.tracks[i].name;
              albumTrack.appendChild(trackName);
              var trackArtists = document.createElement('p');
              trackArtists.className = 'artists';
              trackArtists.innerHTML = value.artists.join(', ');
              albumTrack.appendChild(trackArtists);
              _this._tracklist.appendChild(albumTrack);
          }

          //display playlist
          _this._sourceDisplayDiv.style.display = 'block';
          _this._footerButtons[0].style.display = 'inline-block';
          _this._footerButtons[1].style.display = 'inline-block';
      });

      _this.getAlbum(albumId).then(value => {
          _this._source = value;
      });
  }
  }
  searchAgainButtonOnclick(_this) {
      return function() {
          _this._footerButtons[0].style.display = 'none';
          _this._footerButtons[1].style.display = 'none';
          _this._albumImage.setAttribute('src', '');
          _this._albumInfoItems[0].innerHTML = '';
          _this._albumInfoItems[1].innerHTML = '';
          _this._tracklist.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._searchResultsContainer.style.display = 'none';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._sourceDisplayDiv.style.display = 'none';
          _this._searchForm.style.display = 'block';
          _this._offset = 0;
      }
  }
  searchResultPageOnscroll(_this){
      return function(){
          if( _this._searchResultsPage.scrollTop === (_this._searchResultsPage.scrollHeight - _this._searchResultsPage.offsetHeight + 2))
          {
              _this._offset += 20;
              _this.searchSpotify(_this._searchEntry).then(value => {
                  if (value) {
                      for (let i = 0; i < value.length; i++) {
                          var resultDiv = document.createElement('div');
                          resultDiv.className = 'search-result';
                          resultDiv.value = value[i].id;
                          var name = document.createElement('p');
                          name.className = 'result-name';
                          name.innerHTML = value[i].name;
                          resultDiv.appendChild(name);
                          var artist = document.createElement('p');
                          artist.className = 'result-person';
                          artist.innerHTML = value[i].artists.join(', ');
                          resultDiv.appendChild(artist);
                          _this._searchResultsPage.appendChild(resultDiv);
                      }
              
                      _this._searchResults = document.querySelectorAll('div.scrolling-list > .search-result');
                      
                      //set onclick for result
                      for (let i = _this._offset; _this._searchResults[i]; i++) {
                          _this._searchResults[i].onclick = _this.searchResultOnclick(_this, value, (i - _this._offset));
                      }
                  }
              });
          }
      }
  }
  albumIdInputSubmitButtonOnclick(_this){
      return function(){
          if(_this._albumIdInput.value){
              var albumId = _this._albumIdInput.value;

              _this._albumImage.setAttribute('src', '');
              _this._albumInfoItems[0].innerHTML = '';
              _this._albumInfoItems[1].innerHTML = '';
              _this._tracklist.innerHTML = '';
              _this._albumTitle.innerHTML = '';
              _this._searchResultsPage.innerHTML = '';
              _this._searchResultsContainer.style.display = 'none';
              _this._searchForm.style.display = 'none';
              _this._albumIdInput.value = '';
  
              _this.getAlbumInfo(albumId).then(value => {
                  
                  _this._albumImage.setAttribute('src', value.images[0]);
                  _this._albumTitle.innerHTML = value.name;
                  _this._albumOwner = value.artists.join(', ');
                  _this._albumInfoItems[0].innerHTML = 'Artist: ' + value.artists.join(', ');
                  _this._albumInfoItems[1].innerHTML = 'Tracks: ' + value.tracks.length;
      
                  for(let i = 0; i<value.tracks.length; i++){
                      var albumTrack = document.createElement('div');
                      albumTrack.className = 'track';
                      albumTrack.id = 't' + i;
                      
                      var trackName = document.createElement('h4'); 
                      trackName.className='name';
                      trackName.innerHTML = value.tracks[i].name;
                      albumTrack.appendChild(trackName);
                      var trackArtists = document.createElement('p');
                      trackArtists.className = 'artists';
                      trackArtists.innerHTML = value.artists.join(', ');
                      albumTrack.appendChild(trackArtists);
                      _this._tracklist.appendChild(albumTrack);
                  }
      
                  //display playlist
                  _this._sourceDisplayDiv.style.display = 'block';
                  _this._footerButtons[0].style.display = 'inline-block';
                  _this._footerButtons[1].style.display = 'inline-block';

                  _this.getAlbum(albumId).then(value => {
                      _this._source = value;
                  });

              }).catch(err => {
                  console.log(err);
                  _this._albumIdInput.style.backgroundColor = 'rgb(255, 210, 206)';
                  _this._albumIdInput.value = '';
                  _this._albumIdInput.placeholder = 'Invalid input';
  
                  _this._albumIdInput.onkeyup = function(){
                      _this._albumIdInput.style.backgroundColor = 'white';
                      _this._albumIdInput.placeholder = 'Ex: 37i9dQZF1DWZZbwlv3Vmtr';
                  }
              });
          }
      }
  }
      async getAlbum(albumId){
          var _this = this;
          var album = new Album();
          album.tracks = [];
    
        try{
            let result = await $.ajax({
                url: `https://api.spotify.com/v1/albums/${albumId}`,
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
            });
            let data = await result;
      
            album.id = data.id;
            album.name = data.name;
            album.artists = data.artists.map(item => item.name)
            album.images = data.images.map(item => item.url);
      
            for(let i=0; i<data.tracks.items.length; i++){
              let track = await _this.getTrack(data.tracks.items[i].id);
              album.tracks.push(track);
            }
    
            return album;
            }
        catch(error){
            console.log(error);
        }
      }
    
      async getAlbumInfo(albumId){
          var _this = this;
          var album = new Album();
        try{
            let result = await $.ajax({
                url: `https://api.spotify.com/v1/albums/${albumId}`,
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
            });
            let data = await result;
            
            album.id = data.id;
            album.name = data.name;
            album.artists = data.artists.map(item => item.name)
            album.images = data.images.map(item => item.url);
            console.log(album.images);
            album.tracks = data.tracks.items;
    
            return album;
            }
        catch(error){
            console.log(error);
        }
      }
      createSearchResultArray(data){
          var resultArray = [];

          for(let i=0; i<data.albums.items.length; i++){
              var album = new Album();
              album.id = data.albums.items[i].id;
              album.name = data.albums.items[i].name;
              album.artist = data.albums.items[i].artists.map(item => item.name)

              resultArray.push(album);
          }

          return resultArray;
      }
}

class PlaylistSearch extends SourceSearch{
  constructor(token){
      super(token);
      this._type = 'playlist';
      this._playlistIdInput; //the input field for playlist ID
      this._playlistHeader; //header for the playlist preview
      this._playlistImage; //image for the playlist preview
      this._playlistInfo; //info for the playlist preview
      this._playlistTitle; //title of playlist
      this._playlistInfoItems; //followers and track count in playlist header
      this._tracklist; //tracklist for the playlist preview
      this._playlistOwner;
  }
  createHTML(){
      //main container
      this._mainContainer = document.createElement('div');
      this._mainContainer.className = 'source-search forplaylist';

      //search form
      this._searchForm = document.createElement('div');
      this._searchForm.className = 'form';
      this._mainContainer.appendChild(this._searchForm);

      this._searchBar = [document.createElement('div'), document.createElement('div')];
      this._searchBar[0].className = 'bar';
      this._searchBar[1].className = 'bar';
      let h5 = [document.createElement('h5'), document.createElement('h5')];
      h5[0].innerHTML = 'Search for Playlist';
      h5[1].innerHTML = 'Input Playlist ID';
      this._searchBar[0].appendChild(h5[0]);
      this._searchBar[1].appendChild(h5[1]);
      this._searchForm.appendChild(this._searchBar[0]);
      this._searchForm.appendChild(this._searchBar[1]);

      this._searchField = document.createElement('input');
      this._searchField.type = 'text';
      this._searchField.className = 'field';
      this._searchField.autocomplete = 'off';
      this._searchField.placeholder = 'Search...';
      this._searchBar[0].appendChild(this._searchField);

      this._submitButtons = [document.createElement('button'), document.createElement('button')];
      this._submitButtons[0].className = 'submit';
      this._submitButtons[0].innerHTML = '&#128269';
      this._submitButtons[1].className = 'submit';
      this._submitButtons[1].innerHTML = '&#128269';
      this._searchBar[0].appendChild(this._submitButtons[0]);

      this._dropdown = document.createElement('div');
      this._dropdown.className = 'dropdown';
      this._searchForm.appendChild(this._dropdown);

      this._playlistIdInput = document.createElement('input');
      this._playlistIdInput.type = 'text';
      this._playlistIdInput.className = 'field';
      this._playlistIdInput.autocomplete = 'off';
      this._playlistIdInput.placeholder = 'Ex: 37i9dQZF1DWZZbwlv3Vmtr';
      this._searchBar[1].appendChild(this._playlistIdInput);
      this._searchBar[1].appendChild(this._submitButtons[1]);

      //search results
      this._searchResultsContainer = document.createElement('div');
      this._searchResultsContainer.className = 'search-results-container';
      this._mainContainer.appendChild(this._searchResultsContainer);

      this._searchResultsHeader = document.createElement('h4');
      this._searchResultsContainer.appendChild(this._searchResultsHeader);

      this._searchResultsPage = document.createElement('div');
      this._searchResultsPage.className = 'scrolling-list';
      this._searchResultsContainer.appendChild(this._searchResultsPage);

      //source display
      this._sourceDisplayDiv = document.createElement('div');
      this._sourceDisplayDiv.className = 'source-display';
      this._mainContainer.appendChild(this._sourceDisplayDiv);

      this._playlistHeader = document.createElement('div');
      this._playlistHeader.className = 'playlist-header';
      this._sourceDisplayDiv.appendChild(this._playlistHeader);

      this._playlistImage = document.createElement('img');
      this._playlistImage.className = 'playlist-image';
      this._playlistHeader.appendChild(this._playlistImage);

      this._playlistInfo = document.createElement('div');
      this._playlistInfo.className = 'playlist-info';
      this._playlistHeader.appendChild(this._playlistInfo);

      this._playlistTitle = document.createElement('h4');
      this._playlistTitle.className = 'playlist-title';
      this._playlistInfo.appendChild(this._playlistTitle);

      this._playlistInfoItems = [document.createElement('p'), document.createElement('p')];
      this._playlistInfoItems[0].className = 'data';
      this._playlistInfoItems[1].className = 'data';
      this._playlistInfo.appendChild(this._playlistInfoItems[0]);
      this._playlistInfo.appendChild(this._playlistInfoItems[1]);

      this._tracklist = document.createElement('div');
      this._tracklist.className = 'tracklist';
      this._sourceDisplayDiv.appendChild(this._tracklist);

      this._footerButtons = [document.createElement('div'), document.createElement('div')];
      this._footerButtons[0].className = 'confirmation no';
      this._footerButtons[0].innerHTML = '<p>Search Again</p>';
      this._footerButtons[1].className = 'confirmation yes';
      this._footerButtons[1].innerHTML = '<p>Import</p>';
      this._mainContainer.appendChild(this._footerButtons[0]);
      this._mainContainer.appendChild(this._footerButtons[1]);

      this.setElementAttributes();
  }

  setElementAttributes(){
      this._searchField.onkeyup = this.searchFieldOnKeyUp(this);
      this._footerButtons[0].onclick = this.searchAgainButtonOnclick(this);
      this._searchResultsPage.onscroll = this.searchResultPageOnscroll(this);
      this._submitButtons[1].onclick = this.playlistIdInputSubmitButtonOnclick(this);
  }
  searchFieldOnKeyUp(_this){
      return function(){
          _this._dropdownResults = [];
          _this._dropdown.innerHTML='';
          _this._dropdown.style.display = 'none';
          if(_this._searchField.value){
              _this._searchEntry = _this._searchField.value;
              _this.searchSpotify(_this._searchEntry).then(value =>{ 
                  //display search result dropdown
                  if(value){
                      for(let i = 0; i<5; i++){
                          var newDiv = document.createElement('div');
                          newDiv.className = 'search-result';
                          newDiv.value = value[i].id;
                          
                          var p = document.createElement('p');
                          p.innerHTML = value[i].name;
                          newDiv.appendChild(p);

                          _this._dropdown.appendChild(newDiv);
                          _this._dropdownResults.push(newDiv);
                      }
                      
                      _this._dropdown.style.display = 'block';
                      //set result onclick value
                      for(let i=0; i<5; i++){
                          _this._dropdownResults[i].onclick = _this.dropDownOnclick(_this, value, i);
                      }
                  }
              });
          }

          _this._submitButtons[0].onclick = _this.submitButtonOnclick(_this);
      }
  }
  dropDownOnclick(_this, value, i){
      return function(){
      var playlistId = value[i].id;
      
      _this._playlistImage.setAttribute('src', '');
      _this._playlistInfoItems[0].innerHTML = '';
      _this._playlistInfoItems[1].innerHTML = '';
      _this._tracklist.innerHTML = '';
      _this._searchResultsPage.innerHTML = '';
      _this._searchResultsContainer.style.display = 'none';
      _this._dropdown.style.display = 'none';
      _this._dropdown.innerHTML='';
      _this._searchField.value = '';
      _this._searchForm.style.display = 'none';

      _this.getPlaylistInfo(playlistId).then(value => {
          _this._playlistImage.setAttribute('src', value.images[0]);
          _this._playlistTitle.innerHTML = value.name;
          _this._playlistOwner = value.owner;
          _this._playlistInfoItems[0].innerHTML = 'Followers: ' + value.followers;
          _this._playlistInfoItems[1].innerHTML = 'Tracks: ' + value.tracks.length;
      });
      _this.getTrackNameArray(playlistId).then(value => {
          for(let i = 0; i<value.length; i++){
              var playlistTrack = document.createElement('div');
              playlistTrack.className = 'track';
              playlistTrack.id = 't' + i;
              
              var trackName = document.createElement('h4'); 
              trackName.className='name';
              trackName.innerHTML = value[i].name;
              playlistTrack.appendChild(trackName);
              var trackArtists = document.createElement('p');
              trackArtists.className = 'artists';
              trackArtists.innerHTML = value[i].getArtistString();
              playlistTrack.appendChild(trackArtists);
              _this._tracklist.appendChild(playlistTrack);
          }

      //display playlist
      _this._sourceDisplayDiv.style.display = 'block';
      _this._footerButtons[0].style.display = 'inline-block';
      _this._footerButtons[1].style.display = 'inline-block';
      });
      
      //get Playlist data
      _this.getPlaylist(playlistId, _token).then(value => {
          _this._source = value;
      });
  }
  }
  submitButtonOnclick(_this){
      return function(){
          _this._offset = 0;
          _this._playlistImage.setAttribute('src', '');
          _this._playlistInfoItems[0].innerHTML = '';
          _this._playlistInfoItems[1].innerHTML = '';
          _this._tracklist.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._searchForm.style.display = 'none';
          _this._sourceDisplayDiv.setAttribute('display', 'none');
          _this._searchResultsContainer.style.display = 'block';

  
          _this.searchSpotify(_this._searchEntry, _this._type, _this._offset, _this._token).then(value =>{
              if(value){
                  _this._searchResultsHeader.innerHTML = 'Results for "' + _this._searchEntry + '":';
                  for(let i = 0; i<value.length; i++){
                      var resultDiv = document.createElement('div');
                      resultDiv.className = 'search-result';
                      resultDiv.value = value[i].id;
                      var name = document.createElement('p');
                      name.className = 'result-name';
                      name.innerHTML = value[i].name;
                      resultDiv.appendChild(name);
                      var owner = document.createElement('p');
                      owner.className = 'result-person';
                      owner.innerHTML = value[i].owner;
                      resultDiv.appendChild(owner);
                      _this._searchResultsPage.appendChild(resultDiv);
                  }
                  
                  _this._searchResults = document.querySelectorAll('div.scrolling-list > .search-result');
                  
                  //set onclick for result
                  for(let i=0; _this._searchResults[i]; i++){
                      _this._searchResults[i].onclick = _this.searchResultOnclick(_this, value, i)
                  }
              }
          });
         }
  }
  searchResultOnclick(_this, result, i){
      return function(){
      _this._playlistImage.setAttribute('src', '')
      _this._playlistInfoItems[0].innerHTML = '';
      _this._playlistInfoItems[1].innerHTML = '';
      _this._tracklist.innerHTML = '';
      _this._searchResultsPage.innerHTML = '';
      _this._searchResultsContainer.style.display = 'none';

      _this._dropdown.style.display = 'none';
      _this._dropdown.innerHTML='';
      console.log(i);

      _this.getPlaylistInfo(result[i].id).then(value => {
          _this._playlistImage.setAttribute('src', value.images[0]);
          _this._playlistOwner = value.owner;
          _this._playlistTitle.innerHTML = value.name;
          _this._playlistInfoItems[0].innerHTML = "Followers: " + value.followers;
          _this._playlistInfoItems[1].innerHTML = "Tracks: " + value.tracks.length;
      });
      _this.getTrackNameArray(result[i].id, _this._token).then(value => {
      for(let x = 0; x<value.length; x++){
          var playlistElement = document.createElement('div');
          playlistElement.className = 'track';
          playlistElement.id = 't' + x;
          var trackName = document.createElement('h4');
          trackName.className = 'name';
          trackName.innerHTML = value[x].name;
          var trackArtists = document.createElement('p');
          trackArtists.className = 'artists';
          trackArtists.innerHTML = value[x].getArtistString();
          playlistElement.appendChild(trackName);
          playlistElement.appendChild(trackArtists);
          _this._tracklist.appendChild(playlistElement);
      }

          //display playlist
          _this._sourceDisplayDiv.style.display = 'block';
          _this._footerButtons[0].style.display = 'inline-block';
          _this._footerButtons[1].style.display = 'inline-block';
      });

      //get Playlist data
      _this.getPlaylist(result[i].id).then(value => {
          _this._source = value;
      });
  }
  }
  searchAgainButtonOnclick(_this) {
      return function() {
          _this._footerButtons[0].style.display = 'none';
          _this._footerButtons[1].style.display = 'none';
          _this._playlistImage.setAttribute('src', '');
          _this._playlistInfoItems[0].innerHTML = '';
          _this._playlistInfoItems[1].innerHTML = '';
          _this._tracklist.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._searchResultsContainer.style.display = 'none';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._sourceDisplayDiv.style.display = 'none';
          _this._searchForm.style.display = 'block';
          _this._offset = 0;
      }
  }
  searchResultPageOnscroll(_this){
      return function(){
          if( _this._searchResultsPage.scrollTop === (_this._searchResultsPage.scrollHeight - _this._searchResultsPage.offsetHeight + 2))
          {
              _this._offset += 20;
              _this.searchSpotify(_this._searchEntry).then(value => {
                  if (value) {
                      for (let i = 0; i < value.length; i++) {
                          var resultDiv = document.createElement('div');
                          resultDiv.className = 'search-result';
                          resultDiv.value = value[i].id;
                          var name = document.createElement('p');
                          name.className = 'result-name';
                          name.innerHTML = value[i].name;
                          resultDiv.appendChild(name);
                          var owner = document.createElement('p');
                          owner.className = 'result-person';
                          owner.innerHTML = value[i].owner;
                          resultDiv.appendChild(owner);
                          _this._searchResultsPage.appendChild(resultDiv);
                      }
              
                      _this._searchResults = document.querySelectorAll('div.scrolling-list > .search-result');
                      
                      //set onclick for result
                      for (let i = _this._offset; _this._searchResults[i]; i++) {
                          _this._searchResults[i].onclick = _this.searchResultOnclick(_this, value, (i - _this._offset));
                      }
                  }
              });
          }
      }
  }
  playlistIdInputSubmitButtonOnclick(_this){
      return function(){
          if(_this._playlistIdInput.value){
              _this._playlistImage.setAttribute('src', '');
              _this._playlistInfoItems[0].innerHTML = '';
              _this._playlistInfoItems[1].innerHTML = '';
              _this._tracklist.innerHTML = '';
              _this._playlistTitle.innerHTML = '';
              _this._searchResultsPage.innerHTML = '';
              _this._searchResultsContainer.style.display = 'none';
                  
              var playlistId = _this._playlistIdInput.value;
  
              _this.getPlaylistInfo(playlistId).then(value => {
                    _this._playlistOwner = value.owner;
                  _this._playlistImage.setAttribute('src', value.images[0]);
                  _this._playlistTitle.innerHTML = value.name;
                  _this._playlistInfoItems[0].innerHTML = "Followers: " + value.followers;
                  _this._playlistInfoItems[1].innerHTML = "Tracks: " + value.tracks.length;
                  
                  _this.getTrackNameArray(playlistId).then(value => {
                      for(let i = 0; i<value.length; i++){
                          var playlistTrack = document.createElement('div');
                          playlistTrack.className = 'track';
                          playlistTrack.id = 't' + i;
                          
                          var trackName = document.createElement('h4'); 
                          trackName.className='name';
                          trackName.innerHTML = value[i].name;
                          playlistTrack.appendChild(trackName);
                          var trackArtists = document.createElement('p');
                          trackArtists.className = 'artists';
                          trackArtists.innerHTML = value[i].getArtistString();
                          playlistTrack.appendChild(trackArtists);
                          _this._tracklist.appendChild(playlistTrack);
                      }
  
                  //display playlist
                  _this._dropdown.style.display = 'none';
                  _this._dropdown.innerHTML='';
                  _this._searchField.value = '';
                  _this._searchForm.style.display = 'none';
                  _this._playlistIdInput.value = '';
                  _this._sourceDisplayDiv.style.display = 'block';
                  _this._footerButtons[0].style.display = 'inline-block';
                  _this._footerButtons[1].style.display = 'inline-block';
                  });
  
                  //get Playlist data
                  _this.getPlaylist(playlistId).then(value => {
                  _this._source = value;
                  });
              }).catch(err => {
                  console.log(err);
                  _this._playlistIdInput.style.backgroundColor = 'rgb(255, 210, 206)';
                  _this._playlistIdInput.value = '';
                  _this._playlistIdInput.placeholder = 'Invalid input';
  
                  _this._playlistIdInput.onkeyup = function(){
                      _this._playlistIdInput.style.backgroundColor = 'white';
                      _this._playlistIdInput.placeholder = 'Ex: 37i9dQZF1DWZZbwlv3Vmtr';
                  }
              });
          }
      }
  }
  async getTrackTotal(playlistId) {
      let total;
      let _this = this;
      
      try{
          let result = await $.ajax({
              url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              type: "GET",
              beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
          });
          let data = await result;
    
          total = data.total;
          return total;
          }
      catch(error){
          console.log(error);
      }
    }
    async getTrackSet(playlistId, offset) {
      //var total = await getTrackTotal(playlistId, token);
      //console.log('getTrackIdArray total value: ' + total);

      var trackIds = [];
      var trackObject;
      var trackSet = [];
      var _this = this;
        
        try{
          let result = await $.ajax({
              url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=100`,
              type: "GET",
              beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
           });
    
           let data = await result;
           
           trackIds = data.items.map(item => item.track.id);
    
           for(let i=0; i<trackIds.length; i++){
            trackObject = await _this.getTrack(trackIds[i]);
            trackSet.push(trackObject);
          }
    
           return trackSet;
          }
          catch(error){
            console.log(error);
          }
      }
    
      async getTrackNameSet(playlistId, offset) {
        //var total = await getTrackTotal(playlistId, token);
        //console.log('getTrackIdArray total value: ' + total);
        var trackSet = [];
        var _this = this;
          
          try{
            let result = await $.ajax({
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=100`,
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
             });
      
             let data = await result;
             
             for(let i=0; i<data.items.length; i++){
                 var track = new Track();
                 track.name = data.items[i].track.name;
                 track.artists = data.items[i].track.artists.map(artist => artist.name);;
                 trackSet.push(track);
             }
      
             return trackSet;
            }
            catch(error){
              console.log(error);
            }
        }
    
      async getTrackArray(playlistId){
        var _this = this;
        var total = await _this.getTrackTotal(playlistId);
        var trackArray = [];
    
        try{
          var offset;
          var value;
          for(let i = 0; i<Math.ceil(total/100); i++){
            offset = i * 100;
            value = await _this.getTrackSet(playlistId, offset);
            trackArray = trackArray.concat(value);
          }
    
          return trackArray;
        }
        catch(error){
          console.log(error);
        }
      }
    
      async getTrackNameArray(playlistId){
          var _this = this;
          var total = await _this.getTrackTotal(playlistId);
        var trackNameArray = [];
    
        try{
          var offset;
          var value;
          for(let i = 0; i<Math.ceil(total/100); i++){
            offset = i * 100;
            value = await _this.getTrackNameSet(playlistId, offset);
            trackNameArray = trackNameArray.concat(value);
          }
    
          return trackNameArray;
        }
        catch(error){
          console.log(error);
        }
      }
    
      async getPlaylist(playlistId){
          var _this = this;
          var playlist = new Playlist();
        playlist.tracks = await _this.getTrackArray(playlistId);
    
        try{
            let result = await $.ajax({
                url: `https://api.spotify.com/v1/playlists/${playlistId}`,
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
            });
            let data = await result;
      
            playlist.id = data.id;
            playlist.name = data.name;
            playlist.owner = data.owner.id;
            playlist.description = data.description;
            playlist.followers = data.followers.total;
            playlist.images = data.images.map(item => item.url);
    
            return playlist;
            }
        catch(error){
            console.log(error);
        }
      }
    
      async getPlaylistInfo(playlistId){
          var _this = this;
          var playlist = new Playlist();
        try{
            let result = await $.ajax({
                url: `https://api.spotify.com/v1/playlists/${playlistId}`,
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _this._token );},
            });
            let data = await result;
            
            playlist.id = data.id;
            playlist.name = data.name;
            playlist.images = data.images.map(item => item.url);
            playlist.followers = data.followers.total;
            playlist.description = data.description;
            playlist.owner = data.owner;
            playlist.tracks = data.tracks.items;
    
            return playlist;
            }
        catch(error){
            console.log(error);
        }
      }
      createSearchResultArray(data){
          var resultArray = [];

          for(let i=0; i<data.playlists.items.length; i++){
              var playlist = new Playlist();
              playlist.id = data.playlists.items[i].id;
              playlist.name = data.playlists.items[i].name;
              playlist.owner = data.playlists.items[i].owner.display_name;

              resultArray.push(playlist);
          }

          return resultArray;
      }
}

class SongSearch extends SourceSearch{
  constructor(token){
      super(token);

      this._type = 'track';
      this._songIdInput; //the input field for track ID
      this._songImage; //image for the track preview
      this._songTitle; //title of track
      this._songArtist; //artist name for preview
      this._songAlbum; //album for preview
  }
  createHTML(){
      //main container
      this._mainContainer = document.createElement('div');
      this._mainContainer.className = 'source-search forsong';

      //search form
      this._searchForm = document.createElement('div');
      this._searchForm.className = 'form';
      this._mainContainer.appendChild(this._searchForm);

      this._searchBar = [document.createElement('div'), document.createElement('div')];
      this._searchBar[0].className = 'bar';
      this._searchBar[1].className = 'bar';
      let h5 = [document.createElement('h5'), document.createElement('h5')];
      h5[0].innerHTML = 'Search for Song';
      h5[1].innerHTML = 'Input Song ID';
      this._searchBar[0].appendChild(h5[0]);
      this._searchBar[1].appendChild(h5[1]);
      this._searchForm.appendChild(this._searchBar[0]);
      this._searchForm.appendChild(this._searchBar[1]);

      this._searchField = document.createElement('input');
      this._searchField.type = 'text';
      this._searchField.className = 'field';
      this._searchField.autocomplete = 'off';
      this._searchField.placeholder = 'Search...';
      this._searchBar[0].appendChild(this._searchField);

      this._submitButtons = [document.createElement('button'), document.createElement('button')];
      this._submitButtons[0].className = 'submit';
      this._submitButtons[0].innerHTML = '&#128269';
      this._submitButtons[1].className = 'submit';
      this._submitButtons[1].innerHTML = '&#128269';
      this._searchBar[0].appendChild(this._submitButtons[0]);

      this._dropdown = document.createElement('div');
      this._dropdown.className = 'dropdown';
      this._searchForm.appendChild(this._dropdown);

      this._songIdInput = document.createElement('input');
      this._songIdInput.type = 'text';
      this._songIdInput.className = 'field';
      this._songIdInput.autocomplete = 'off';
      this._songIdInput.placeholder = 'Ex: 37i9dQZF1DWZZbwlv3Vmtr';
      this._searchBar[1].appendChild(this._songIdInput);
      this._searchBar[1].appendChild(this._submitButtons[1]);

      //search results
      this._searchResultsContainer = document.createElement('div');
      this._searchResultsContainer.className = 'search-results-container';
      this._mainContainer.appendChild(this._searchResultsContainer);

      this._searchResultsHeader = document.createElement('h4');
      this._searchResultsContainer.appendChild(this._searchResultsHeader);

      this._searchResultsPage = document.createElement('div');
      this._searchResultsPage.className = 'scrolling-list';
      this._searchResultsContainer.appendChild(this._searchResultsPage);

      //source display
      this._sourceDisplayDiv = document.createElement('div');
      this._sourceDisplayDiv.className = 'source-display';
      this._mainContainer.appendChild(this._sourceDisplayDiv);

      this._songTitle = document.createElement('h4');
      this._songTitle.className = 'song-title';
      this._sourceDisplayDiv.appendChild(this._songTitle);

      this._songImage = document.createElement('img');
      this._songImage.className = 'song-image';
      this._sourceDisplayDiv.appendChild(this._songImage);

      this._songArtist = document.createElement('p');
      this._songArtist.className = 'song-artist';
      this._sourceDisplayDiv.appendChild(this._songArtist);

      this._songAlbum = document.createElement('p');
      this._songAlbum.className = 'song-album';
      this._sourceDisplayDiv.appendChild(this._songAlbum);

      this._footerButtons = [document.createElement('div'), document.createElement('div')];
      this._footerButtons[0].className = 'confirmation no';
      this._footerButtons[0].innerHTML = '<p>Search Again</p>';
      this._footerButtons[1].className = 'confirmation yes';
      this._footerButtons[1].innerHTML = '<p>Import</p>';
      this._mainContainer.appendChild(this._footerButtons[0]);
      this._mainContainer.appendChild(this._footerButtons[1]);

      this.setElementAttributes();
  }
  setElementAttributes(){
     this._searchField.onkeyup = this.searchFieldOnKeyUp(this);
     this._footerButtons[0].onclick = this.searchAgainButtonOnclick(this);
     this._searchResultsPage.onscroll = this.searchResultPageOnscroll(this);
     this._submitButtons[1].onclick = this.songIdInputSubmitButtonOnclick(this);
  }
  searchFieldOnKeyUp(_this){
      return function(){
          _this._dropdownResults = [];
          _this._dropdown.innerHTML='';
          _this._dropdown.style.display = 'none';
          if(_this._searchField.value){
              _this._searchEntry = _this._searchField.value;
              _this.searchSpotify(_this._searchEntry).then(value =>{ 
                  //display search result dropdown
                  if(value){
                      for(let i = 0; i<5; i++){
                          var newDiv = document.createElement('div');
                          newDiv.className = 'search-result';
                          newDiv.value = value[i].id;
                          
                          var p = document.createElement('p');
                          p.innerHTML = value[i].name;
                          newDiv.appendChild(p);

                          _this._dropdown.appendChild(newDiv);
                          _this._dropdownResults.push(newDiv);
                      }
                      
                      _this._dropdown.style.display = 'block';
                      //set result onclick value
                      for(let i=0; i<5; i++){
                          _this._dropdownResults[i].onclick = _this.dropdownOnclick(_this, value, i);
                      }
                  }
              });
          }

          _this._submitButtons[0].onclick = _this.submitButtonOnclick(_this);
      }
  }
  dropdownOnclick(_this, value, i){
      return function(){
          var songId = value[i].id;
          
          _this._songImage.setAttribute('src', '');
          _this._songTitle.innerHTML = '';
          _this._songArtist.innerHTML ='';
          _this._songAlbum.innerHTML='';
          _this._searchResultsPage.innerHTML = '';
          _this._searchResultsContainer.style.display = 'none';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._searchForm.style.display = 'none';
  
          _this.getTrack(songId).then(result => {
              _this._songTitle.innerHTML = result.name;
              _this._songImage.setAttribute('src',result.image);
              _this._songArtist.innerHTML = result.getArtistString();
              _this._songAlbum.innerHTML = result.album;
          
              //display playlist
              _this._sourceDisplayDiv.style.display = 'block';
              _this._footerButtons[0].style.display = 'inline-block';
              _this._footerButtons[1].style.display = 'inline-block';

              _this._source = result;
          });
      }
  }
  submitButtonOnclick(_this){
      return function(){
          _this._offset = 0;
          _this._songImage.setAttribute('src', '');
          _this._songTitle.innerHTML = '';
          _this._songArtist.innerHTML = '';
          _this._songAlbum.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._searchForm.style.display = 'none';
          _this._sourceDisplayDiv.setAttribute('display', 'none');
          _this._searchResultsContainer.style.display = 'block';

  
          _this.searchSpotify(_this._searchEntry, _this._type, _this._offset, _this._token).then(value =>{
              if(value){
                  _this._searchResultsHeader.innerHTML = 'Results for "' + _this._searchEntry + '":';
                  for(let i = 0; i<value.length; i++){
                      var resultDiv = document.createElement('div');
                      resultDiv.className = 'search-result';
                      resultDiv.value = value[i].id;
                      var name = document.createElement('p');
                      name.className = 'result-name';
                      name.innerHTML = value[i].name;
                      resultDiv.appendChild(name);
                      var artist = document.createElement('p');
                      artist.className = 'result-person';
                      artist.innerHTML = value[i].artists.join(', ');
                      resultDiv.appendChild(artist);
                      _this._searchResultsPage.appendChild(resultDiv);
                  }
                  
                  _this._searchResults = document.querySelectorAll('div.scrolling-list > .search-result');
                  
                  //set onclick for result
                  for(let i=0; _this._searchResults[i]; i++){
                      _this._searchResults[i].onclick = _this.searchResultOnclick(_this, value, i)
                  }
              }
          });
         }
  }
  searchResultOnclick(_this, value, i){
      return function(){
          var songId = value[i].id;

          _this._songImage.setAttribute('src', '')
          _this._songTitle.innerHTML = '';
          _this._songArtist.innerHTML = '';
          _this._songAlbum.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._searchResultsContainer.style.display = 'none';
  
          _this.getTrack(songId).then(result => {
              _this._songTitle.innerHTML = result.name;
              _this._songImage.setAttribute('src',result.image);
              _this._songArtist.innerHTML = result.getArtistString();
              _this._songAlbum.innerHTML = result.album;
          
              //display playlist
              _this._sourceDisplayDiv.style.display = 'block';
              _this._footerButtons[0].style.display = 'inline-block';
              _this._footerButtons[1].style.display = 'inline-block';

              _this._source = result;
          });
      }
  }
  searchAgainButtonOnclick(_this){
      return function() {
          _this._footerButtons[0].style.display = 'none';
          _this._footerButtons[1].style.display = 'none';
          _this._songImage.setAttribute('src', '')
          _this._songTitle.innerHTML = '';
          _this._songArtist.innerHTML = '';
          _this._songAlbum.innerHTML = '';
          _this._searchResultsPage.innerHTML = '';
          _this._searchResultsContainer.style.display = 'none';
          _this._dropdown.style.display = 'none';
          _this._dropdown.innerHTML='';
          _this._searchField.value = '';
          _this._sourceDisplayDiv.style.display = 'none';
          _this._searchForm.style.display = 'block';
          _this._offset = 0;
      }
  }
  searchResultPageOnscroll(_this){
      return function(){
          if( _this._searchResultsPage.scrollTop === (_this._searchResultsPage.scrollHeight - _this._searchResultsPage.offsetHeight + 2))
          {
              _this._offset += 20;
              _this.searchSpotify(_this._searchEntry).then(value => {
                  if (value) {
                      for (let i = 0; i < value.length; i++) {
                          var resultDiv = document.createElement('div');
                          resultDiv.className = 'search-result';
                          resultDiv.value = value[i].id;
                          var name = document.createElement('p');
                          name.className = 'result-name';
                          name.innerHTML = value[i].name;
                          resultDiv.appendChild(name);
                          var artist = document.createElement('p');
                          artist.className = 'result-person';
                          artist.innerHTML = value[i].artists.join(', ');
                          resultDiv.appendChild(artist);
                          _this._searchResultsPage.appendChild(resultDiv);
                      }
              
                      _this._searchResults = document.querySelectorAll('div.scrolling-list > .search-result');
                      
                      //set onclick for result
                      for (let i = _this._offset; _this._searchResults[i]; i++) {
                          _this._searchResults[i].onclick = _this.searchResultOnclick(_this, value, (i - _this._offset));
                      }
                  }
              });
          }
      }
  }
  createSearchResultArray(data){
      var resultArray = [];

          for(let i=0; i<data.tracks.items.length; i++){
              var track = new Track();
              track.id = data.tracks.items[i].id;
              track.name = data.tracks.items[i].name;
              track.artists = data.tracks.items[i].artists.map(artist => artist.name);

              resultArray.push(track);
          }

          return resultArray;
  }

songIdInputSubmitButtonOnclick(_this){
    return function(){
        if(_this._songIdInput.value){
            var songId = _this._songIdInput.value;

            _this._songImage.setAttribute('src', '');
          _this._songTitle.innerHTML = '';
          _this._songArtist.innerHTML ='';
          _this._songAlbum.innerHTML='';
          _this._searchResultsPage.innerHTML = '';
          _this._searchResultsContainer.style.display = 'none';
          _this._searchField.value = '';
          _this._searchForm.style.display = 'none';

          _this.getTrack(songId).then(result => {
            _this._songTitle.innerHTML = result.name;
            _this._songImage.setAttribute('src',result.image);
            _this._songArtist.innerHTML = result.getArtistString();
            _this._songAlbum.innerHTML = result.album;
        
            //display playlist
            _this._sourceDisplayDiv.style.display = 'block';
            _this._footerButtons[0].style.display = 'inline-block';
            _this._footerButtons[1].style.display = 'inline-block';

            _this._source = result;
        }).catch(err => {
                console.log(err);
                _this._albumIdInput.style.backgroundColor = 'rgb(255, 210, 206)';
                _this._albumIdInput.value = '';
                _this._albumIdInput.placeholder = 'Invalid input';

                _this._albumIdInput.onkeyup = function(){
                    _this._albumIdInput.style.backgroundColor = 'white';
                    _this._albumIdInput.placeholder = 'Ex: 37i9dQZF1DWZZbwlv3Vmtr';
                }
            });
        }
    }
}
}

















































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
const redirectUri = 'http://streamlinemusic.net/curator';
const scopes = [
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-private'
];

var playlistDashboard = document.getElementsByClassName('playlist-dashboard')[0];
var mainContent = document.getElementsByClassName('main-content')[0];
var authorizeButton = document.getElementById('create-playlist-button');
authorizeButton.onclick = function(){
    location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

/*
var sourceSearchPopup = document.getElementById('search-popup'); 
var searchCloseButton = sourceSearchPopup.querySelector('#search-header > .close');
var sourceSearchBody = document.getElementById('search-body');
var choicesContainer = document.getElementById('choices');
var searcherContainer = document.getElementById('searcher');
var sourceSearchChoices = sourceSearchPopup.querySelectorAll('#choices > p');

var filterPopup = document.getElementById('filter-popup');
var filterCloseButton = filterPopup.querySelector('#filter-header > .close');
var filterTracklistHeader = document.getElementById('filter-tracklist-header');
var filterTracklist = document.getElementById('filter-tracklist');
var waiting = false;
*/

if(_token){
    playlistDashboard.style.display = 'none';
    mainContent.style.display = 'block';
    var PLAYLIST = new CuratedPlaylist(_token);
var addSourceButton = document.getElementById('add-source-button');
var sourceBubbleContainer = document.getElementById('source-container');
var sourceBubbles = [];
var sourceArray = [];
var trackArray = [];
var currentSource;
var applyChanges = document.getElementById('apply-changes-button');

addSourceButton.onclick = function(){
    //OG
    //addSourceButton.style.display = 'none';
    //choicesContainer.style.display = 'block';
    //sourceSearchPopup.style.display = 'table';

    //currentSource = new Source(_token);
    sourceArray.push(new Source(_token));
    document.getElementById('body').appendChild(sourceArray[sourceArray.length - 1]._sourcePopupContainer);
    document.getElementById('body').style.overflow = 'hidden';
}

var addSourceBubble = function(){
    sourceBubbleContainer.insertBefore(sourceArray[sourceArray.length - 1]._sourceBubble, addSourceButton);
}

var removeSource = function(bubble){
    for(let i=0; i<sourceBubbleContainer.children.length-1; i++){
        if(bubble === sourceBubbleContainer.children[i]){
            
                sourceArray.splice(i, 1);
        }
    }
}

var addSourceTracks = function(){
    trackArray = [];
    for(let i=0; i<sourceArray.length; i++){
        let sourceTracks;
        if(sourceArray[i].filteredTracks){
            sourceTracks = sourceArray[i].filteredTracks;
        }
        else{
            sourceTracks = sourceArray[i].getTracks();
        }
        for(let x=0; x<sourceTracks.length; x++){
            trackArray.push(sourceTracks[x]);
        }
    }
    console.log(trackArray);
}

//future: add index parameter
var addTracksToPlaylist = function(){
    console.log(_token);
    trackArray = shuffle(trackArray);
    let ids = trackArray.map(element => 'spotify:track:' + element.id);

    var urlString = 'https://api.spotify.com/v1/playlists/' + PLAYLIST._playlistId + '/tracks';

        var jsonData = JSON.stringify({
            "uris":ids
        });

        $.ajax({
            type: 'POST',
            url: urlString,
            data: jsonData,
            dataType: 'json',
            headers: {
            'Authorization': 'Bearer ' + _token},
            contentType: 'application/json',
        success: function(result) {
            console.log('Woo! :) ');
        },
        error: function() {
            console.log('Error! :(');
        }
        })

}

var replacePlaylistTracks = function(){
    console.log("!!!!" + _token) ;

    let ids = trackArray.map(element => 'spotify:track:' + element.id);

    var urlString = 'https://api.spotify.com/v1/playlists/' + PLAYLIST._playlistId + '/tracks';

    var jsonData = JSON.stringify({
        "uris":ids
    });

        $.ajax({
            type: 'PUT',
            url: urlString,
            data: jsonData,
            dataType: 'json',
            headers: {
            'Authorization': 'Bearer ' + _token},
            contentType: 'application/json',
        success: function(result) {
            console.log('Woo! :) ');
        },
        error: function() {
            console.log('Error! :(');
        }
        })
}

applyChanges.onclick = function(){
    addSourceTracks();
    replacePlaylistTracks();
};

}
