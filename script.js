/*
 * const fs = require('fs');
data = JSON.parse(fs.readFileSync("games.json", "utf-8"));
translations = JSON.parse(fs.readFileSync("translations.json", "utf-8"));
*/



function applyFilters(data, form, filters){
	curr_data = data
	//run all filters
	console.log("Starting, current length: "+ curr_data.length)
	filters.forEach(function(func, index){
		curr_data = func(curr_data, form)
		console.log("Running " + func.name + ", current length: "+ curr_data.length)
	})
	return curr_data
}

//null or undefined
function nou(x){
	if (x === null || typeof x === 'undefined' || x.length == 0){
		return true
	}
	return false
}

function fltMinPlayers(data, form){
	if (nou(form.min_players)) {return data}
	new_data = data.filter((game) => game.min_players <= form.min_players)
	return new_data
}


function fltMaxPlayers(data, form){
	if (nou(form.max_players)) {return data}
	new_data = data.filter((game) => game.max_players >= form.max_players)
	return new_data
}

function fltMinAge(data, form){
	if (nou(form.min_age)) {return data}
	new_data = data.filter((game) => game.min_age <= form.min_age)
	return new_data
}

function fltPlayingTime(data, form){
	if (nou(form.length)) {return data}
	lengths = {
		'veryshort': ((game) => game.playing_time <= 10),
		'short': ((game) => game.playing_time > 10 && game.playing_time <= 30),
		'medium': ((game) => game.playing_time > 30 && game.playing_time <= 60),
		'long': ((game) => game.playing_time > 60 && game.playing_time <= 120),
		'extralong': ((game) => game.playing_time > 120),
	}	
	new_data = data.filter((game) => form.length.some(val => lengths[val](game)))
	return new_data
}

function fltWeight(data, form){
	if (nou(form.weight)) {return data}
	weights = {
		'verysimple': ((game) => game.weight <= 1.1),
		'simple': ((game) => game.weight > 1.1 && game.weight <= 1.666),
		'medium': ((game) => game.weight > 1.666 && game.weight <= 2.2),
		'complicated': ((game) => game.weight > 2.2 && game.weight <= 2.6),
		'gamer': ((game) => game.weight > 2.6),
	}	
	new_data = data.filter((game) => form.weight.some(val => weights[val](game)))
	return new_data
}

function fltTags(data, form){
	if (nou(form.tags)) {return data}
	new_data = data.filter((game) => form.tags.every(val => game.tags.includes(val)))
	return new_data
}

function fltCategories(data, form){
	if (nou(form.categories)) {return data}
	new_data = data.filter((game) => form.categories.every(val => game.categories.includes(parseInt(val))))
	return new_data
}

function fltMechanics(data, form){
	if (nou(form.mechanics)) {return data}
	new_data = data.filter((game) => form.mechanics.every(val => game.mechanics.includes(parseInt(val))))
	return new_data
}

function fltRecommended(data, form){
	if (nou(form.recommended)) {return data}
	new_data = data.filter((game) => form.recommended.some(val => game.recommendations.includes(val)))
	return new_data
}

function fltMaxWeight(data,form){
	if (nou(form.max_weight)) {return data}
	new_data = data.filter((game) => game.weight <= parseFloat(form.max_weight))
	return new_data
}

function fltMinWeight(data,form){
	if (nou(form.min_weight)) {return data}
	new_data = data.filter((game) => game.weight >= parseFloat(form.min_weight))
	return new_data
}


function fltName(data, form){
	if (nou(form.name)) {return data}
	new_data = data.filter((game) => {
		game_lower = game.name.toLowerCase()
		form_lower = form.name.toLowerCase()
		return game_lower.indexOf(form_lower) !== -1})
	return new_data
}

function fltHasVideo(data, form){
	if (!form.video) { return data }
		new_data = data.filter((game) => game.videos.length !== 0)
		return new_data
}

function has_czech_video(game){
	if (game.videos.length === 0) { return false; }
  if (game.videos.some(video => video.lang === 'cs')) {
		return true;  
	}
	return false;
}

function fltHasCzechVideo(data, form){
	if (!form.video_czech || form.video_czech !== "on") { return data }
		new_data = data.filter((game) => has_czech_video(game))
		return new_data
}

//sorta-globals
const filters = [fltMinPlayers,fltMaxPlayers, fltMinAge, fltPlayingTime, fltWeight, fltMinWeight, fltMaxWeight, fltHasVideo, fltHasCzechVideo, fltRecommended, fltName, fltTags, fltCategories]
var grid = document.getElementById("grid");
var isotope = null;
var selects = []
var categories_select = null;
var active_item_ids = [];


//activate this to engage filter
function run_filter(e){
	if (!nou(e)){ //if no event supplied, no prevention needed, right?
		e.preventDefault()
	}
	let form = {};
	for(let field of document.forms.filterform.elements) {
		if (field.name) {
			if (field.type == "checkbox"){
				form[field.name] = field.checked ? "on" : null; //null the unchecked checkbox
			}
			else if (field.type == "select-multiple"){
				name = field.name.endsWith('[]') ? field.name.slice(0,-2) : field.name;
				form[name] = Array.from(field.selectedOptions).map(option => option.value)
			}
			else {
				form[field.name] = field.value ? field.value : null; //null the empty strings
			}
		}
	}
	console.log(form)
	//performs actual filtering
	result = applyFilters(data, form, filters);

  //save ids for Isotope
	active_item_ids = [];
	result.forEach(game => active_item_ids.push(game.id))

	//Ask Isotope to filter
	isotope.arrange({filter: iso_apply_filter})
}

//resets stuff
function reset_filter(e){
	e.preventDefault();
	console.log('called reset');
	let form = document.getElementById('filterform')
	form.reset()
	selects.forEach(select => select.clear(true))
	run_filter();
}

//helper function for isotope filtering
function iso_apply_filter(item_el){
	let id = parseInt(item_el.dataset.id);
	return active_item_ids.includes(id);
}

//helper function to get data of game by id
function get_data_by_id(id){
	return data.find(game => game.id === id)
}

function iso_sort(e){
	isotope.arrange({sortBy: e.srcElement.dataset.sortBy})
}

//Helper initialization for tomselect
function init_tomselect(selector, options, maxItems){
	//initialize tomselect
	select = new TomSelect(selector, {
		maxItems: maxItems,
		valueField: 'id',
		labelField: 'title',
		searchField: 'title',
		plugins: {
			remove_button:{ title:'Odebrat' },
			clear_button: { title: 'Vymazat' },
			input_autogrow: true
		},
		options: options 
	});
	return selects.push(select)
}
/*
 * Actual initialization 
*/
var isoSortData = {
			weight: (elem) => get_data_by_id(parseInt(elem.dataset.id)).weight,
			name: (elem) => get_data_by_id(parseInt(elem.dataset.id)).name,
			max_players: (elem) => get_data_by_id(parseInt(elem.dataset.id)).max_players,
			year: (elem) => get_data_by_id(parseInt(elem.dataset.id)).year
	}

window.addEventListener('load', (event) => {
  //filtrovací event
	var form = document.getElementById("filterform");
	form.addEventListener('submit', run_filter);

	//resetovaci event
	let resetbutton = document.getElementById("resetbtn");
	resetbutton.addEventListener('click', reset_filter);

	//fill the grid with JSON
	data.forEach((game) => grid.insertAdjacentHTML('beforeend',`
		<div class="grid-item" data-id="${game.id}">
		<h4>${game.name}</h4>
		<p><strong>players</strong> ${game.min_players}-${game.max_players}</p>
		<p><strong>weight</strong> ${game.weight}</p>
		<p><strong>min_age</strong> ${game.min_age}</p>
		</div>`))

	sort_buttons = Array.from(document.getElementsByClassName('sort'));
	sort_buttons.forEach(elem => {
		elem.addEventListener('click', iso_sort);
	});
	
	//initialize Isotope
	var elem = document.getElementById('grid');
	isotope = new Isotope( elem, {
		itemSelector: '.grid-item',
		masonry: { columnWidth: '.grid-item', gutter: 20},
		getSortData: isoSortData,
	});

	//tags
	let tags_options = []
	for (const [key, value] of Object.entries(translations.tags)) {
		tags_options.push({id: key, title: value})
	}
	init_tomselect('#tags',tags_options);

	//categories
	let categories_options = []
	for (const [key, value] of Object.entries(translations.categories)) {
		categories_options.push({id: key, title: value})
	}
	init_tomselect('#categories',categories_options);

	//length
	const length_options = [
		{id:'veryshort', title:'velmi krátká (0-10 minut)'},
		{id:'short', title:'krátká (10-30 minut)'},
		{id:'medium', title:'střední (30-60 minut)'},
		{id:'long', title:'dlouhá (60-120 minut)'},
		{id:'extralong', title:'velmi dlouhá (přes 120 minut)'},
	]
	init_tomselect('#length',length_options);

	weight_options = [
		{id:'verysimple', title:'velmi jednoduchá'},
		{id:'simple', title:'jednoduchá'},
		{id:'medium', title:'středně složitá'},
		{id:'complicated', title:'složitá'},
		{id:'gamer', title:'pro hráče'},
	]
	init_tomselect('#weight',weight_options);

	recommended_options = [
		{id:1, title:'1 hráči'},
		{id:2, title:'2 hráčích'},
		{id:3, title:'3 hráčích'},
		{id:4, title:'4 hráčích'},
		{id:5, title:'5 hráčích'},
		{id:6, title:'6 hráčích'},
		{id:7, title:'7 hráčích'},
		{id:8, title:'8 hráčích'},
		{id:9, title:'9 hráčích'},
		{id:10, title:'10 hráčích'},
		{id:11, title:'11 hráčích'},
		{id:12, title:'12 hráčích'},
	]
	init_tomselect('#recommended',recommended_options);

	minmax_weight_options = data.map(game => {return {id: game.weight, title: game.name}})
	init_tomselect('#min_weight',minmax_weight_options, 1);
	init_tomselect('#max_weight',minmax_weight_options, 1);
});
