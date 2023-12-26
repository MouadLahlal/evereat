const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {ServerError, ClientError} = require("../customclass/Error");
const { supabase } = require("../db");

const authorization = (permission) => {
    return async (req, res, next) => {
        let {data, error} = await supabase
            .from('admin')
            .select('*')
            .eq('id_admin', req.id);
        
        if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
        if (data.length > 0) {
            if (data[0][permission] === true) next();
            else next(new ClientError(StatusCodes.UNAUTHORIZED));
        } else return next(new ClientError(StatusCodes.FORBIDDEN));
    }
};

module.exports = authorization;