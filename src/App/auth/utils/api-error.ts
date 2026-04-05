// class ApiError extends Error {
//   statusCode: number;
//   isOperational: boolean;

//   constructor(statusCode: number, message: string) {
//     super(message);
//     this.name = "ApiError";
//     this.statusCode = statusCode;
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }

//   static badRequest(message = "Bad Request") {
//     return new ApiError(400, message);
//   }

//   static unauthorized(message = "Unauthorized") {
//     return new ApiError(401, message);
//   }
//   static conflict(message = "Conflict") {
//     return new ApiError(409, message);
//   }
//   static forbidden(message = "forbidden") {
//     return new ApiError(403, message);
//   }
//   static notfound(message = "notfound") {
//     return new ApiError(404, message);
//   }
//   static serverError(message = "server Error") {
//     return new ApiError(500, message);
//   }
// }

// export default ApiError;




class ApiError extends Error {
    public statusCode : number
    public success: boolean
    public errors : any[]

    constructor(
        statusCode : number,
        message : string,
        errors: any[]= [],
        stack: string =" "
    ) {
        super(message)
        this.statusCode= statusCode
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    static badRequest(message ='Bad Request', errors: any[]=[]){
        return new ApiError( 400, message, errors)
    }

    static unauthorized (message='Unauthorized'){
        return new ApiError(401, message)
    }
    static forbidden (message='Forbidden'){
        return new ApiError(403, message)
    }
    static notFound(message='Not Found'){
        return new ApiError(404, message)
    }
    static conflict(message='Conflict'){
        return new ApiError(409, message)
    }
    static internalError(message='Internal Server Error'){
        return new ApiError(500, message)
    }
}


export default ApiError;