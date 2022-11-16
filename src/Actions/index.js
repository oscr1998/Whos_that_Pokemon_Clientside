// Loads all data into redux state
export const loadData = (data) => ({type: "LOAD_DATA", payload: data})

// Clears all data from redux state
export const clearData = () => ({type: "LOAD_DATA"})

// Sets username
export const setUsername = (name) => ({ type: "SET_USERNAME", payload: name })

// Sets icon
export const setIcon = (icon) => ({ type: "SET_USERNAME", payload: icon })

// Creates new room
export const createRoom = () => ({ type: "CREATE_ROOM" })

// Sets room
export const joinRoom = (code) => ({ type: "JOIN_ROOM", payload: code })

// Leaves room
export const leaveRoom = () => ({ type: "LEAVE_ROOM" })

// EDIT AND SET SCORE
export const setScore = (score) => ({ type: "SET_SCORE", payload: score})
