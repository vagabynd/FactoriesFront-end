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
const initPhone = function (data) {
    return {
        type: "INIT_PHONE",
        data
    }
};
export default { init, initPhones, initPhone};