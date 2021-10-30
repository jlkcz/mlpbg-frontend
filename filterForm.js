const length_options = [
    {id: 'veryshort', title: 'velmi krátká (0-10 minut)'},
    {id: 'short', title: 'krátká (10-30 minut)'},
    {id: 'medium', title: 'střední (30-60 minut)'},
    {id: 'long', title: 'dlouhá (60-120 minut)'},
    {id: 'extralong', title: 'velmi dlouhá (přes 120 minut)'},
]

var weight_options = [
    {id: 'verysimple', title: 'velmi jednoduchá'},
    {id: 'simple', title: 'jednoduchá'},
    {id: 'medium', title: 'středně složitá'},
    {id: 'complicated', title: 'složitá'},
    {id: 'gamer', title: 'pro hráče'},
]

var recommended_options = [
    {id: 1, title: '1 hráči'},
    {id: 2, title: '2 hráčích'},
    {id: 3, title: '3 hráčích'},
    {id: 4, title: '4 hráčích'},
    {id: 5, title: '5 hráčích'},
    {id: 6, title: '6 hráčích'},
    {id: 7, title: '7 hráčích'},
    {id: 8, title: '8 hráčích'},
    {id: 9, title: '9 hráčích'},
    {id: 10, title: '10 hráčích'},
    {id: 11, title: '11 hráčích'},
    {id: 12, title: '12 hráčích'},
]

function initSelectbox(selector, options, maxItems) {
    if (document.querySelector(selector) == null){
        return false
    }

    var select = new TomSelect(selector, {
        maxItems: maxItems,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        plugins: {
            remove_button: {title: 'Odebrat'},
            clear_button: {title: 'Vymazat'},
            input_autogrow: true
        },
        options: options
    });

    global_selects.push(select)
}

// global-usage:
function initFilterForm() {
    //tags
    let tags_options = []
    for (const [key, value] of Object.entries(translations.tags)) {
        tags_options.push({id: key, title: value})
    }
    initSelectbox('#tags', tags_options);

    //categories
    let categories_options = []
    for (const [key, value] of Object.entries(translations.categories)) {
        categories_options.push({id: key, title: value})
    }
    initSelectbox('#categories', categories_options);

    //weight
    var minmax_weight_options = global_data.map(game => {
        return {id: game.weight, title: game.name}
    })
    initSelectbox('#min_weight', minmax_weight_options, 1);
    initSelectbox('#max_weight', minmax_weight_options, 1);

    initSelectbox('#length', length_options);
    initSelectbox('#weight', weight_options);
    initSelectbox('#recommended', recommended_options);
}


