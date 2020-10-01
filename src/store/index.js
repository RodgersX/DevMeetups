import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[
            {imageUrl: 'https://photographyunfolded.com/wp-content/uploads/2018/08/twin-bridges-2400.jpg', id: 'sedtrjfyukgvj,h', title: 'Meetup in New York', date: '2020-10-17', location: 'New York', description: 'New York, New York'},
            {imageUrl: 'https://felixwong.com/gallery/images/c/cars-in-paris-mar-2019-015.jpg', id: ',khjgfnbd', title: 'Meetup in Paris', date: '2020-10-19', location: 'Paris', description: 'Paris, Paris'},
            {imageUrl: 'https://pixy.org/src/42/428201.jpg', id: 'jhgfdsascvdfg', title: 'Meetup in Maldives', date: '2020-10-21', location: 'Maldives', description: 'Maldives, Maldives'}
        ],
        user: null
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup({ commit }, payload) {
            // More verbose way to define your payload
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'hgfdhfgjkl'
            }
            // reach out to firebase to store it
            commit('createMeetup', meetup)
        },
        signUserUp({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }).catch(error => {
                    console.log(error)
                })
        },
        signUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }).catch(err => {
                    console.log(err)
                })
        }
    },
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
        },
        user(state) {
            return state.user
        }
    }
})