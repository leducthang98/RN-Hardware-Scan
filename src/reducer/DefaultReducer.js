const DEFAULT_STATE = {
    command: "NO COMMAND"
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_COMMAND': {
            return {
                ...state,
                command: action.payload
            }
        }

    }
    return state;
}
