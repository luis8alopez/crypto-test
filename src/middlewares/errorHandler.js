const httpStatus = require('http-status');

exports.errorHandler = (message) => {
    switch (message) {
        case "database":
            return ({ message: "Unable to perform database action", code: httpStatus.INTERNAL_SERVER_ERROR });
            break;
        case "api":
            return ({ message: "Unable to perform API call", code: httpStatus.BAD_REQUEST });
            break
        case 3:
            return ({ message: "Password should have more than 8 alphanumerical characters", code: httpStatus.BAD_REQUEST });
            break;
        case "limit":
            return ({ message: "This limit isn't allowed - Max limit = 25", code: httpStatus.BAD_REQUEST });
            break;
        case "notAllowed":
            return ({ message: "Not allowed to access this resource", code: httpStatus.FORBIDDEN });
            break;
        case "followCoin":
            return ({ message: "You already follow this coin", code: httpStatus.BAD_REQUEST });
            break;
        case "user":
            return ({ message: "This username already exist", code: httpStatus.BAD_REQUEST });
            break;

        default:
            return ({ message: "Internal server error", code: httpStatus.INTERNAL_SERVER_ERROR })
            break;
    }
}