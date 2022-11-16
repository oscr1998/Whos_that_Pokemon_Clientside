const initState = {
    username: "oliver",
    icon: "",
    score: 12,
    room: {
        code: "",
        name: "",
        users: [
            {
                name: 'sean',
                score: 1000
            },
            {
                name: 'kornelia',
                score: 1001
            },
            {
                name: 'ami',
                score: 50
            },
        ],
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
