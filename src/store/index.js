import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if(payload.title) {
                meetup.title = payload.title
            }
            if(payload.description) {
                meetup.description = payload.description
            }
            if(payload.date) {
                meetup.date = payload.date
            }
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadMeetups({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then(data => {
                    const meetups = []
                    const obj = data.val()
                    for(let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            location: obj[key].location,
                            creatorId: obj[key].creatorId
                        })
                    }
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)
                }).catch(err => {
                    commit('setLoading', false)
                })
        },
        createMeetup({ commit, getters }, payload) {
            // More verbose way to define your payload
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            
            // reach out to firebase to store it
            firebase.database().ref('meetups').push(meetup)
                .then(data => {
                    key = data.key
                    return key
                }).then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image) // put files on the server
                }).then(fileData => {
                    fileData.ref.getDownloadURL().then(downloadURL => {
                        return firebase.database().ref('meetups').child(key).update({imageUrl: downloadURL})
                    })
                }).then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
                }).catch(error => {
                    commit('setLoading', false)
                    commit('setError', error)
                })
            
        },
        updateMeetupData({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.description) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups/').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateMeetup', payload)
                }).catch(err => {
                    console.log(err)
                    commit('setLoading', false)
                })
        },
        signUserUp({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')

            //firebase handles all the auth operations for us
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }).catch(error => {
                    commit('setLoading', false)
                    commit('setError', error)
                })
        },
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }).catch(err => {
                    commit('setLoading', false)
                    commit('setError', err)
                })
        },
        autoSignin({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({commit}) {
            commit('clearError')
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
                return state.loadedMeetups.find(meetup => {
                    return meetup.id === meetupId
                })
            }
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
})