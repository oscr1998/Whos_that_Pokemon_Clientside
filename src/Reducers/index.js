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

export default function reducer(state = initState, action){
    let room
    switch(action.type){
        case "STORE_ROOM":
            return {...state, room: action.payload}
        case "STORE_USER":
            return {...state, users: action.payload}
        case "SET_ROOM":
            const {code, name, isHost} = action.payload
            room = state.room
            room.code = code
            room.host = name
            room.users.push(name)
            return {...state, room, isHost }
        case "ADD_USER":
            const {newUser, newIcon} = action.payload
            return {...state, username: newUser, icon: newIcon }
        default:
            return state
    }
}
