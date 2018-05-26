export function getYycPlayedAudios () {
    return JSON.parse(localStorage.getItem('yyc-played-audios'))
}

export function setYycPlayedAudios (playedAudiosIds) {
    localStorage.setItem('yyc-played-audios', JSON.stringify(playedAudiosIds))
}

export function getYycLovedAudios () {
    return JSON.parse(localStorage.getItem('yyc-loved-audios'))
}

export function setYycLovedAudios (playedAudiosIds) {
    localStorage.setItem('yyc-loved-audios', JSON.stringify(playedAudiosIds))
}