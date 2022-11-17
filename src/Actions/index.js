// Loads all data into redux state
export const loadData = (data) => ({type: "LOAD_DATA", payload: data})

// Clears all data from redux state
export const clearData = () => ({type: "LOAD_DATA"})

// Sets name
export const setName = (name) => ({ type: "SET_NAME", payload: name })

// Sets icon
export const setIcon = (icon) => ({ type: "SET_ICON", payload: icon })

// Creates new room
export const createRoom = () => ({ type: "CREATE_ROOM" })

// Sets room
export const joinRoom = (code, user, users) => ({ type: "JOIN_ROOM", payload: {code, user, users} })

// Leaves room
export const leaveRoom = () => ({ type: "LEAVE_ROOM" })

// Adds user to room
export const addUser = (user) => ({ type: "ADD_USER", payload: user })

// EDIT AND SET SCORE
export const setScore = (score) => ({ type: "SET_SCORE", payload: score})

// PICK GEN
export const setGen = (gen) => ({ type: "PICK_GEN", payload: gen})
