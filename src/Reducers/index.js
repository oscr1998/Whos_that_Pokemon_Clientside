const initState = {
    username: "",
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

            return {...state, room, isHost }
        case "ADD_USER":
            const newUser = action.payload
            room = state.room
            room.users.push(newUser)
            return {...state, room }
        default:
            return state
    }
}