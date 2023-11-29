const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ClientError, ServerError } = require("../../customclass/Error");

const login = (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) { return next(new ClientError(StatusCodes.BAD_REQUEST)) }

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("SELECT id_user, email, password FROM user WHERE email=?", [email], async (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                else if (result.length > 0) {
                    let access = await bcrypt.compare(password, result[0].password);
                    if (access) {
                        let token = jwt.sign({"id":result[0].id_user}, "namtambao", { expiresIn: '2d' });
                        return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, token:token});
                    } else {
                        next(new ClientError(StatusCodes.NOT_FOUND));
                    }
                } else {
                    next(new ClientError(StatusCodes.NOT_FOUND));
                }
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const register = async (req, res, next) => {
    const {name, surname, email, telephone, password, address} = req.body;

    if (!name || !surname || !email || !telephone || !password || !address) { next(new ClientError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)); }

    let hashed_password = await bcrypt.hash(password, await bcrypt.genSalt());

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query(
            `INSERT INTO user (name, surname, email, telephone, password, address)
            VALUES (?, ?, ?, ?, ?, ?);`,
            [name, surname, email, telephone, hashed_password, address], (err, result) => {
                if (err) next(StatusCodes.INTERNAL_SERVER_ERROR, err);
                else if (result.affectedRows > 0) {
                    return res.status(200).json({message: ReasonPhrases.OK});
                }
                else {
                    next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, "unknown error : account not registered"));
                }
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

module.exports = {login, register};