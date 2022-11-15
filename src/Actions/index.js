export const setUsername = (name) => {
    return { type: "SET_USERNAME", payload: name }
}

// Loads all data into redux state
export const loadData = (data) => {
    return {type: "LOAD_DATA", payload: data}
}

// Sets room code for the room we are in
export const setRoom = (code, name, isHost) => {
    return {type: "SET_ROOM", payload: {code, name, isHost}}
}

// Adds user to the room we are in
export const addUser = (newUser, newIcon) => {
    return {type: "ADD_USER", payload: {newUser, newIcon}}
}

export const createRoom = roomId => {
    return {type: "STORE_ROOM", payload: roomId}
}

export const leaveRoom = () => {
    return {type: "LEAVE_ROOM", payload: null}
}

export const createUser = user => {
    return {type: "STORE_USER", payload: user}
}

export const setRoundNumber= user => {
    return {type: "ROUND_AMOUNT", payload: user}
}
