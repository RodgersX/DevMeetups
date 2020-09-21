import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[
            {imageUrl: 'https://photographyunfolded.com/wp-content/uploads/2018/08/twin-bridges-2400.jpg', id: 'sedtrjfyukgvj,h', title: 'Meetup in New York', date: '2020-10-17'},
            {imageUrl: 'https://felixwong.com/gallery/images/c/cars-in-paris-mar-2019-015.jpg', id: ',khjgfnbd', title: 'Meetup in Paris', date: '2020-10-19'},
            {imageUrl: 'https://pixy.org/src/42/428201.jpg', id: 'jhgfdsascvdfg', title: 'Meetup in Maldives', date: '2020-10-21'}
        ],
        user: {
            id: 'qwertrgdfvcs',
            registeredMeetups: ['jhgfdsascvdfg']
        }
    },
    mutations: {},
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        }
    },
    actions: {}
})