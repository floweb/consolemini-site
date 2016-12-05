Vue.component('game-item', {
    props: ['game'],
    template: '<li>{{ game.game_name }} - Nombre de bits: {{ game.total_bits }} </li>'
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

            axios.get('/db').then(function (response) {
                self.gamesCheered = _.chain(response.data)
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
            });
        }
    }
});

Vue.component('game-other-item', {
    props: ['game'],
    template: '<li>{{ game }} - {{ game.game_name }}</li>'
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

            axios.get('/db').then(function (response) {
                self.gamesOther = _.chain(response.data)
                    .filter(function(game) {
                        return game.total_bits === 0;
                    })
                    .sortBy(function(game) {
                        return game.game_name;
                    })
                    .value();
            });
        }
    }
})