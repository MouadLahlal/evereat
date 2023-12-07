const jwt = require("jsonwebtoken");
const { supabase } = require("./../db");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ServerError, ClientError } = require("../customclass/Error");

const authentication = (req, res, next) => {
	try {
		var authHeader = req.headers["authorization"];
		var token = authHeader.split(" ")[1];
	} catch (error) {
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
	}

	if (!token)
		next(new ClientError(StatusCodes.FORBIDDEN));
	else {
		jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
			if (err)
				return next(
					new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err)
				);
			else if (new Date(decodedToken.exp * 1000) > new Date()) {
				req.id = decodedToken.id;
				let { data, error } = await supabase
					.from(decodedToken.type === "admin" ? "admin" : "user")
					.select("*")
					.eq(
						decodedToken.type === "admin" ? "id_admin" : "id_user",
						decodedToken.id
					);

				if (error)
					return next(
						new ServerError(
							StatusCodes.INTERNAL_SERVER_ERROR,
							error.message
						)
					);
				if (data.length > 0) {
					next();
				} else
					return res
						.status(StatusCodes.FORBIDDEN)
						.json({ message: ReasonPhrases.FORBIDDEN });
			} else
				return next(
					new ClientError(
						StatusCodes.UNAUTHORIZED
					)
				);
		});
	}
};

module.exports = authentication;
