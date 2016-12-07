Vue.component('game-item', {
    props: ['game'],
    template: '<li>{{ game[0] }} : {{ game[1].game_name }} - Nombre de bits: {{ game[1].total_bits }} </li>'
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
                var data = _.zip(_.keys(response.data), _.values(response.data))
                self.gamesCheered = _.chain(data)
                    .filter(function(game) {
                        return game[1].total_bits > 0;
                    })
                    .sortBy(function(game) {
                        return game[1].priority;
                    })
                    .sortBy(function(game) {
                        return -game[1].total_bits;
                    })
                    .value();
            });
        }
    }
});

Vue.component('game-other-item', {
    props: ['game'],
    template: '<li>{{ game[0] }} : {{ game[1].game_name }}</li>'
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
                var data = _.zip(_.keys(response.data), _.values(response.data))
                self.gamesOther = _.chain(data)
                    .filter(function(game) {
                        return game[1].total_bits === 0;
                    })
                    .sortBy(function(game) {
                        return game[1].game_name;
                    })
                    .value();
            });
        }
    }
})