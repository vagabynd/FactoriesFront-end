const reducer = function (state = [], action) {
    switch (action.type) {
        case "SET_STATE":
            return action.state;
        case "INIT":
            return action.data;
    }
    return state;
};
export default reducer;