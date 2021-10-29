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
            <h1>${data.name}</h1>
						<table>
							<tr><td>nejlepší v počtu hráčů</td><td>${data.best_players}</td>
							<tr><td>Kategorie</td><td>${data.categories}</td>
							<tr><td>Počet hráčů do</td><td>${data.max_players}</td>
							<tr><td>Mechaniky</td><td>${data.mechanics}</td>
							<tr><td>Věk od (věk nejmladšího hráče</td><td>${data.min_age}</td>
							<tr><td>Počet hráčů od</td><td>${data.min_players}</td>
							<tr><td>Popis</td><td>${data.mkp_description}</td>
							<tr><td>Adresa obrázku</td><td>${data.mkp_image}</td>
							<tr><td>Adresa v katalogu</td><td>${data.mkp_url}</td>
							<tr><td>Pouze prezenčně</td><td>${data.no_absence_lending}</td>
							<tr><td>Délka hry</td><td>${data.playing_time}</td>
							<tr><td>Doporučeno pro počet hráčů</td><td>${data.recommendations_str}</td>
							<tr><td>Štítky</td><td>${data.tags}</td>
							<tr><td>Videa</td><td>${data.videos}</td>
							<tr><td>Složitost</td><td>${data.weight}</td>
							<tr><td>Rok vydání</td><td>${data.year}</td>
						</table>
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

function handleKeys(key){
	//lightbox not shown, do nothing
	if(global_lightbox === null || !global_lightbox.visible()) {return null;}
	//user tried to hide lightbox with escape, oblige and end
	if(key == "Escape"){ global_lightbox.close(); return null}
	//if the key is not supported, do nothing
	if(!["ArrowLeft", "ArrowRight"].includes(key)){ return null }
	if(key == "ArrowLeft"){
		new_e = getPreviousSibling(global_shown, displayedGame)
	}
	if(key == "ArrowRight"){
		new_e = getNextSibling(global_shown, displayedGame)
	}
	console.log(new_e)
	if(new_e === undefined){ return null }
	showLightbox(new_e);
	

}

body = document.getElementsByTagName('body')[0]
body.addEventListener("keydown", (evt) => {//when this happens
	handleKeys(evt.key);
});
