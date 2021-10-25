function fltMinPlayers(data, form) {
    if (isNull(form.min_players)) {
        return data
    }
    new_data = data.filter((game) => game.min_players <= form.min_players)
    return new_data
}

function fltMaxPlayers(data, form) {
    if (isNull(form.max_players)) {
        return data
    }
    new_data = data.filter((game) => game.max_players >= form.max_players)
    return new_data
}

function fltMinAge(data, form) {
    if (isNull(form.min_age)) {
        return data
    }
    new_data = data.filter((game) => game.min_age <= form.min_age)
    return new_data
}

function fltPlayingTime(data, form) {
    if (isNull(form.length)) {
        return data
    }
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

function fltWeight(data, form) {
    if (isNull(form.weight)) {
        return data
    }
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

function fltTags(data, form) {
    if (isNull(form.tags)) {
        return data
    }
    new_data = data.filter((game) => form.tags.every(val => game.tags.includes(val)))
    return new_data
}

function fltCategories(data, form) {
    if (isNull(form.categories)) {
        return data
    }
    new_data = data.filter((game) => form.categories.every(val => game.categories.includes(parseInt(val))))
    return new_data
}

function fltMechanics(data, form) {
    if (isNull(form.mechanics)) {
        return data
    }
    new_data = data.filter((game) => form.mechanics.every(val => game.mechanics.includes(parseInt(val))))
    return new_data
}

function fltRecommended(data, form) {
    if (isNull(form.recommended)) {
        return data
    }
    new_data = data.filter((game) => form.recommended.some(val => game.recommendations.includes(val)))
    return new_data
}

function fltMaxWeight(data, form) {
    if (isNull(form.max_weight)) {
        return data
    }
    new_data = data.filter((game) => game.weight <= parseFloat(form.max_weight))
    return new_data
}

function fltMinWeight(data, form) {
    if (isNull(form.min_weight)) {
        return data
    }
    new_data = data.filter((game) => game.weight >= parseFloat(form.min_weight))
    return new_data
}

function fltName(data, form) {
    if (isNull(form.name)) {
        return data
    }
    new_data = data.filter((game) => {
        game_lower = game.name.toLowerCase()
        form_lower = form.name.toLowerCase()
        return game_lower.indexOf(form_lower) !== -1
    })
    return new_data
}

function fltHasVideo(data, form) {
    if (!form.video) {
        return data
    }
    new_data = data.filter((game) => game.videos.length !== 0)
    return new_data
}

function has_czech_video(game) {
    if (game.videos.length === 0) {
        return false;
    }
    if (game.videos.some(video => video.lang === 'cs')) {
        return true;
    }
    return false;
}

function fltHasCzechVideo(data, form) {
    if (!form.video_czech || form.video_czech !== "on") {
        return data
    }
    new_data = data.filter((game) => has_czech_video(game))
    return new_data
}

const filters = [fltMinPlayers, fltMaxPlayers, fltMinAge, fltPlayingTime, fltWeight, fltMinWeight, fltMaxWeight, fltHasVideo, fltHasCzechVideo, fltRecommended, fltName, fltTags, fltCategories]

// global-usage:
function applyFilters(data, form) {
    let curr_data = data
    //run all filters
    console.log("Starting, current length: " + curr_data.length)
    filters.forEach(function (func, index) {
        curr_data = func(curr_data, form)
        console.log("Running " + func.name + ", current length: " + curr_data.length)
    })
    return curr_data
}
