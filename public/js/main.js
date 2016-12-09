Vue.component('game-item', {
    props: ['game'],
    template: '<li>{{ game.id }} : {{ game.game_name }} - Nombre de bits: {{ game.total_bits }} </li>'
});

var gamesList = new Vue({
    el: '#game-cheered-list',
    data: {
        gamesCheered: null
    },
    created: function() {
        this.computeData();
    },
    methods: {
        computeData: function() {
            var self = this;

            axios.get('/games/?total_bits_gte=1').then(function (response) {
                self.gamesCheered = _.chain(response.data)
                    .sortBy(function(game) {
                        return game.priority;
                    })
                    .sortBy(function(game) {
                        return -game.total_bits;
                    })
                    .value();
            });
        }
    }
});

Vue.component('game-other-item', {
    props: ['game'],
    template: '<li>{{ game.id }} : {{ game.game_name }}</li>'
});

var gamesOtherList = new Vue({
    el: '#game-other-list',
    data: {
        gamesOther: null,
        displayAllGames: false
    },
    created: function() {
        this.computeData();
    },
    methods: {
        computeData: function() {
            var self = this;

            axios.get('/games/?total_bits=0').then(function (response) {
                self.gamesOther = _.sortBy(response.data, function(game) {
                    return game.game_name;
                });
            });
        }
    }
})