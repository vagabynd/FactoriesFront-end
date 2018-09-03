const init = function (data) {
    return {
        type: "INIT",
        data
    }
};
const initPhones = function (data) {
    return {
        type: "SET_PHONES",
        data
    }
};
export default { init, initPhones };