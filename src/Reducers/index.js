const initState = {
    name: "",
    icon: "",
    score: 0,
    room: {
        code: "",
        users: [],
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

        case "SET_NAME":
            console.log("SET_NAME", action.payload);
            return { ...state, name: action.payload }

        case "SET_SCORE":
            console.log("SET_SCORE", action.payload);
            return { ...state, score: state.score + action.payload }

        case "SET_ICON":
            console.log("SET_ICON", action.payload);
            return { ...state, icon: action.payload }

        case "CREATE_ROOM":
            console.log("CREATE_ROOM");
            return { ...state, room: { ...state.room, host: state.name }, isHost: true }

        case "JOIN_ROOM":
            const users = action.payload.users

            console.log("JOIN_ROOM", action.payload);
            return { ...state, room: { ...state.room, code: action.payload.code, users }}

        case "LEAVE_ROOM":
            console.log("LEAVE_ROOM");
            return {...state, room: initState.room, isHost: false }

        default:
            return state
    }
}
