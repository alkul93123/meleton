export default {
    data() {
        return {
            actions: {
                getRgsMakes: '/api/make/by-alias/rgs',
                getVskMakes: '/api/make/by-alias/vsk',
                getAlphaMakes: '/api/make/by-alias/alpha',
                getSoglasieMakes: '/api/make/by-alias/soglasie',
                getTinkoffMakes: '/api/make/by-alias/tinkoff',
                getZettaMakes: '/api/make/by-alias/zetta',
                getIngosMakes: '/api/make/by-alias/ingos',
            },

            makeIDs: [],
            vskMakes: [],
            alphaMakes: [],
            rgsMakes: [],
            soglasieMakes: [],
            tinkoffMakes: [],
            zettaMakes: [],
            ingosMakes: [],
            // soglasieMakesPage: [],
            // soglasieMakeSearch: []
        }
    },
    methods: {
        async getVskMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getVskMakes, {name: query, ids: this.makeIDs})
            this.vskMakes = response.data;
        },

        async getAlphaMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getAlphaMakes, {name: query, ids: this.makeIDs})
            this.alphaMakes = response.data;
        },

        async getRgsMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getRgsMakes, {name: query, ids: this.makeIDs})
            this.rgsMakes = response.data;
        },

        async getSoglasieMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getSoglasieMakes, {name: query, ids: this.makeIDs})
            this.soglasieMakes = response.data;
        },

        async getTinkoffMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getTinkoffMakes, {name: query, ids: this.makeIDs})
            this.tinkoffMakes = response.data;
        },

        async getZettaMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getZettaMakes, {name: query, ids: this.makeIDs})
            this.zettaMakes = response.data;
        },

        async getIngosMakes(query = '') {
            if (query.length > 0 && query.length < 2) {
                return
            }

            let response = await this.$http2.post(this.actions.getIngosMakes, {name: query, ids: this.makeIDs})
            this.ingosMakes = response.data;
        },
    }
}
