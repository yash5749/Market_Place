class ApiError extends Error{
    constructor(
        statuscode,
        message = "Internal Server Error",
        error = [],
        stack = ""
    )

    {
        super(message),
        this.statuscode = statuscode,
        this.error = error
        this.data = null
        this.success = false
        this.message = message

        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export  {ApiError}