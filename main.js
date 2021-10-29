/*
 * const fs = require('fs');
data = JSON.parse(fs.readFileSync("games.json", "utf-8"));
translations = JSON.parse(fs.readFileSync("translations.json", "utf-8"));
*/

function isNull(x) {
    if (x === null || typeof x === 'undefined' || x.length == 0) {
        return true
    }
    return false
}


var global_isotope = null;
var global_selects = []
var global_currentIds = [];


//activate this to engage filter
function handleFormSubmit(e) {
    if (!isNull(e)) {
        e.preventDefault()
    }
    let form = {};
    for (let field of document.forms.filterform.elements) {
        if (field.name) {
            if (field.type == "checkbox") {
                form[field.name] = field.checked ? "on" : null; //null the unchecked checkbox
            } else if (field.type == "select-multiple") {
                name = field.name.endsWith('[]') ? field.name.slice(0, -2) : field.name;
                form[name] = Array.from(field.selectedOptions).map(option => option.value)
            } else {
                form[field.name] = field.value ? field.value : null; //null the empty strings
            }
        }
    }
    console.log(form)

    //performs actual filtering
    var result = applyFilters(global_data, form);

    //save ids for Isotope
    global_currentIds = result.map(game => game.id)

    //Ask Isotope to filter
    global_isotope.arrange({
        filter: function (item_el) {
            let id = parseInt(item_el.dataset.id);
            return global_currentIds.includes(id);
        }
    })
}

//resets stuff
function handleFormReset(e) {
    e.preventDefault();
    console.log('called reset');
    let form = document.getElementById('filterform')
    form.reset()
    global_selects.forEach(select => select.clear(true))
    handleFormSubmit();
}


function handleSortButtonClick(e) {
    global_isotope.arrange({sortBy: e.srcElement.dataset.sortBy})
}

function get_data_by_id(id) {
    return {...global_data.find(game => game.id === id)}
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

function fillGridWithData() {
    var grid = document.getElementById("grid");
    global_data.forEach((game) => grid.insertAdjacentHTML('beforeend', `
		<div class="grid-item" data-id="${game.id}" onclick="showLightbox(this);">
		<h4>${game.name}</h4>
		<p><strong>players</strong> ${game.min_players}-${game.max_players}</p>
		<p><strong>weight</strong> ${game.weight}</p>
		<p><strong>min_age</strong> ${game.min_age}</p>
		</div>`))
}

function attachEvents() {
    var form = document.getElementById("filterform");
    form.addEventListener('submit', handleFormSubmit);

    let resetbutton = document.getElementById("resetbtn");
    resetbutton.addEventListener('click', handleFormReset);

    var sort_buttons = Array.from(document.getElementsByClassName('sort'));
    sort_buttons.forEach(elem => {
        elem.addEventListener('click', handleSortButtonClick);
    });
}

window.addEventListener('load', (event) => {
    initFilterForm();
    attachEvents();

    fillGridWithData();

    //initialize Isotope
    var grid = document.getElementById('grid');
    global_isotope = new Isotope(grid, {
        itemSelector: '.grid-item',
        masonry: {columnWidth: '.grid-item', gutter: 20},
        getSortData: isoSortData,
    });
});
