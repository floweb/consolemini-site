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
        this.timer = setInterval(this.fetchData, 10000);
    },
    methods: {
        fetchData: function() {
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
            })
        }
    },
    beforeDestroy() {
      clearIntervall(this.timer)
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
        this.fetchData();
        this.timer = setInterval(this.fetchData, 10000);
    },
    methods: {
        fetchData: function() {
            var self = this;
            axios.get('/games/?total_bits=0&_sort=game_name').then(function (response) {
                self.gamesOther = response.data;
            });
        }
    },
    beforeDestroy() {
      clearIntervall(this.timer)
    }
})