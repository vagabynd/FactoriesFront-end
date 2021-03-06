const reducer = function (state, action) {
    switch (action.type) {
        case "SET_STATE":
            return action.state;
        case "INIT":
            return {state:action.data, phones:[]};
        case "SET_PHONES":
            return action.data;
        case "INIT_PHONE":
            return {state:[],phones:[],phone:action.data};
    }
    return state;
};
export default reducer;