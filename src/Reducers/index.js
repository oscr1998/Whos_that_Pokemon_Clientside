const initState = {
    username: "",
    icon: "",
    room: {
        code: "",
        name: "",
        users: [],
        state: "",
        host: ""
    },
    isHost: false
}

const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export default function reducer(state = initState, action){
    let room
    switch(action.type){
        case "LOAD_DATA":
            return {...state, ...action.payload}
        case "STORE_ROOM":
            return {...state, room: action.payload}
        case "STORE_USER":
            return {...state, users: action.payload}

        case "SET_ROOM":
            const {code, name, isHost} = action.payload

            room = state.room
            room.code = code

            if(isHost)
                room.host = name
            
            room.users.push(name)
            
            const updatedData = {...state, username: name, room, isHost}
            setLocalStorage('data', updatedData)
            return updatedData

        case "ADD_USER":
            const {newUser, newIcon} = action.payload
            return {...state, username: newUser, icon: newIcon }
        default:
            return state
    }
}
