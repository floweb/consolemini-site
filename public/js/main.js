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
        this.fetchData();
        this.timer = setInterval(this.fetchData, 30000);
    },
    methods: {
        fetchData: function() {
            var self = this;
            axios.get('/games/?total_bits_gte=1&finished=false').then(function (response) {
                self.gamesCheered = _.chain(response.data)
                    .sortBy(function(game) {
                        return game.priority;
                    })
                    .sortBy(function(game) {
                        return -game.total_bits;
                    })
                    .value();
            })
        }
    },
    beforeDestroy() {
      clearIntervall(this.timer)
    }
});

Vue.component('game-uncheered-item', {
    props: ['game'],
    template: '<li>{{ game.id }} : {{ game.game_name }}</li>'
});

var gamesOtherList = new Vue({
    el: '#game-other-lists',
    data: {
        gamesOther: null,
        gamesFinished: null,
        displayAllGames: false
    },
    created: function() {
        this.fetchData();
        this.timer = setInterval(this.fetchData, 30000);
    },
    methods: {
        fetchData: function() {
            var self = this;
            axios.get('/games/?total_bits=0&finished=false&_sort=game_name').then(function (response) {
                self.gamesOther = response.data;
            });

            axios.get('/games/?finished=true&_sort=game_name').then(function (response) {
                self.gamesFinished = response.data;
            });
        }
    },
    beforeDestroy() {
      clearIntervall(this.timer)
    }
});

Vue.component('game-finished-item', {
    props: ['game'],
    template: '<li>{{ game.id }} : {{ game.game_name }}</li>'
});