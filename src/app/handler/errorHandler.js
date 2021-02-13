exports.errorHandler = (message) => {
    switch (message) {
        case "1":
            return ({ message: "Unable to perform database action" });
            break;
        case "2":
            return ({ message: "Unable to perform API call" });
            break
        case "3":
            return ({ message: "Password should have more than 8 alphanumerical characters", code: 400 });
            break;
        default:
            return ({ message: "Internal server error", code: 500 })
            break;
    }
}