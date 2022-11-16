const initState = {
    username: "",
    icon: "",
    score: 0,
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
    switch(action.type){
        case "LOAD_DATA":
            return {...state, ...action.payload}

        case "CLEAR_DATA":
            return initState

        case "SET_USERNAME":
            console.log("SET_USERNAME", action.payload);
            return { ...state, username: action.payload }

        case "SET_SCORE":
            console.log("SET_SCORE", action.payload);
            return { ...state, score: state.score + action.payload }

        case "SET_ICON":
            return { ...state, icon: action.payload }

        case "CREATE_ROOM":
            console.log("CREATE_ROOM");
            return { ...state, room: { ...state.room, host: state.username }, isHost: true }

        case "JOIN_ROOM":
            const users = action.payload.users
            users.push(action.payload.user)

            console.log("JOIN_ROOM", action.payload);
            return { ...state, room: { ...state.room, code: action.payload.code, users }}

        case "LEAVE_ROOM":
            return {...state, room: initState.room, isHost: false }

        default:
            return state
    }
}
