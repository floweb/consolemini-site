Vue.component('game-item', {
    props: ['game'],
    template: '<li>{{ game.game_name }} - Nombre de bits: {{ game.total_bits }} </li>'
})

var gamesList = new Vue({
    el: '#game-list',
    data: {
        games: null
    },
    created: function() {
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            var xhr = new XMLHttpRequest();
            var self = this;

            xhr.open('GET', '/db');
            xhr.onload = function() {
                res = JSON.parse(xhr.responseText);

                self.games = _.chain(res)
                    .filter(function(game) {
                        return game.total_bits > 0;
                    })
                    .sortBy(function(game) {
                        return game.priority;
                    })
                    .sortBy(function(game) {
                        return -game.total_bits;
                    })
                    .value();
            }
            xhr.send();
        }
    }
})
