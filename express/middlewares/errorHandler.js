const errors ={
    VALIDATION_ERROR:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    SERVER_ERROR:500
}
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case errors.VALIDATION_ERROR:
            res.join({
                title : "validation failure",
                message : err.message,
            });
            break;
        case errors.NOT_FOUND:
            res.join({
                title : "not found",
                message : err.message,
            });
            break;
        case errors.FORBIDDEN:
            res.join({
                title : "forbidden",
                message : err.message,
            });
            break;
        case errors.SERVER_ERROR:
            res.join({
                title : "server error",
                message : err.message,
            });
            break;
        case errors.UNAUTHORIZED:
            res.join({
                title : "unauthorized",
                message : err.message,
            });
            break;
            default:
                break;
    };
}
module.exports = errorHandler;