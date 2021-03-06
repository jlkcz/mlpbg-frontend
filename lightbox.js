global_lightbox = null;
global_shown = null;

/*!
 * Get next sibling of an element that matches selector
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
function getNextSibling (elem, callback) {
	// Get the next sibling element
	let sibling = elem.nextElementSibling;
	// If there's no selector, return the first sibling
	if (!callback || typeof callback !== 'function') return sibling;
  // If the sibling matches our test condition, use it
	// If not, jump to the next sibling and continue the loop
	let index = 0;
	while (sibling) {
		if (callback(sibling, index, elem)) return sibling;
		index++;
		sibling = sibling.nextElementSibling;
	}
	//when there is none, lets start with a first one again (so we cycle)
	return document.querySelectorAll('.grid-item:not([style*="display:none"]):not([style*="display: none"])')[0]
}

/*!
 * Get previous sibling of an element that matches a test condition
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
function getPreviousSibling (elem, callback) {
	// Get the next sibling element
	let sibling = elem.previousElementSibling;
	// If there's no callback, return the first sibling
	if (!callback || typeof callback !== 'function') return sibling;
	// If the sibling matches our test condition, use it
	// If not, jump to the next sibling and continue the loop
	let index = 0;
	while (sibling) {
		if (callback(sibling, index, elem)) return sibling;
		index++;
		sibling = sibling.previousElementSibling;
	}
	//when there is none, lets start with a last one again (so we cycle)
	let nodes = document.querySelectorAll('.grid-item:not([style*="display:none"]):not([style*="display: none"])')
	return nodes[nodes.length -1]
}

function displayedGame(sibling){
    return sibling.matches('.grid-item:not([style*="display:none"]):not([style*="display: none"])');
}

function translateData(bgdata){
	bgdata.categories=bgdata.categories.map((x) => translations.categories[x.toString()]).sort().join(', ')
	bgdata.mechanics=bgdata.mechanics.map((x) => translations.mechanics[x.toString()]).sort().join(', ')
	bgdata.tags=bgdata.tags.map((x) => translations.tags[x]).sort().join(', ')
	return bgdata;
}

function assembleLightbox(id){
    var game_data = get_data_by_id(id)
		var data = translateData(game_data)
    x = `<div class="modal">
						<div class="content" style="display: block;height: auto;max-width: inherit;max-height: none;padding: 30px 60px 30px 75px;">
						<h1>${data.name}</h1>
							<table>
								<tr><td>nejlep???? v po??tu hr??????</td><td>${data.best_players}</td>
								<tr><td>Kategorie</td><td>${data.categories}</td>
								<tr><td>Po??et hr?????? do</td><td>${data.max_players}</td>
								<tr><td>Mechaniky</td><td>${data.mechanics}</td>
								<tr><td>V??k od (v??k nejmlad????ho hr????e</td><td>${data.min_age}</td>
								<tr><td>Po??et hr?????? od</td><td>${data.min_players}</td>
								<tr><td>Popis</td><td>${data.mkp_description}</td>
								<tr><td>Adresa obr??zku</td><td>${data.mkp_image}</td>
								<tr><td>Adresa v katalogu</td><td>${data.mkp_url}</td>
								<tr><td>Pouze prezen??n??</td><td>${data.no_absence_lending}</td>
								<tr><td>D??lka hry</td><td>${data.playing_time}</td>
								<tr><td>Doporu??eno pro po??et hr??????</td><td>${data.recommendations_str}</td>
								<tr><td>??t??tky</td><td>${data.tags}</td>
								<tr><td>Videa</td><td>${data.videos}</td>
								<tr><td>Slo??itost</td><td>${data.weight}</td>
								<tr><td>Rok vyd??n??</td><td>${data.year}</td>
							</table>
						</div>
							<div style="width:60px;height:100%;position: absolute; right: 0; top: 0; z-index:10001; background: url(img/next.png) right 48% no-repeat;;display:block;" onclick="moveToNext();"></div>
							<div style="width:60px;height:100%;position: absolute; left: 0; top: 0; z-index:10001; background: url(img/prev.png) right 48% no-repeat;;display:block;" onclick="moveToNext();"></div>
        </div>`
    return x
}

function showLightbox(e){

	  game_id = parseInt(e.dataset.id)
    modal_content = assembleLightbox(game_id);
		if(global_lightbox != null && global_lightbox.visible()){
			global_lightbox.element().getElementsByTagName('div')[0].innerHTML = modal_content
		}
		else {
			global_lightbox = basicLightbox.create(modal_content)
		}
		global_shown = e;
    global_lightbox.show()
}

function moveToNext(){
		if(global_lightbox === null || !global_lightbox.visible()) {return null;}
		new_e = getNextSibling(global_shown, displayedGame);
		if(new_e === undefined){ return null }
		showLightbox(new_e);
}

function moveToPrevious(){
		if(global_lightbox === null || !global_lightbox.visible()) {return null;}
		new_e = getPreviousSibling(global_shown, displayedGame);
		if(new_e === undefined){ return null }
		showLightbox(new_e);
}

function handleKeys(key){
	//lightbox not shown, do nothing
	if(global_lightbox === null || !global_lightbox.visible()) {return null;}
	//user tried to hide lightbox with escape, oblige and end
	if(key == "Escape"){ global_lightbox.close(); return null}
	//if the key is not supported, do nothing
	if(!["ArrowLeft", "ArrowRight"].includes(key)){ return null }
	if(key == "ArrowLeft"){
		return moveToNext();
	}
	if(key == "ArrowRight"){
		return moveToPrevious();
	}
}

body = document.getElementsByTagName('body')[0]
body.addEventListener("keydown", (evt) => {//when this happens
	handleKeys(evt.key);
});
