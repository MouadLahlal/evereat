const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { supabase } = require("../../db");
const { v4: uuid } = require("uuid");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ServerError, ClientError } = require("../../customclass/Error");

const login = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return next(new ClientError(StatusCodes.BAD_REQUEST));
	}

	let { data, error } = await supabase
		.from("admin")
		.select("id_admin, username, password")
		.eq("username", username);

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	if (data.length > 0) {
		let access = await bcrypt.compare(password, data[0].password);
		if (access) {
			let token = jwt.sign(
				{ id: data[0].id_admin, type: "admin" },
				process.env.JWT_KEY,
				{ expiresIn: "2d" }
			);
			return res
				.status(StatusCodes.OK)
				.json({ message: ReasonPhrases.OK, token: token });
		} else return next(new ClientError(StatusCodes.NOT_FOUND));
	} else return next(new ClientError(StatusCodes.NOT_FOUND));
};

const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password)
		return next(new ClientError(StatusCodes.BAD_REQUEST));

	let hashed_password = await bcrypt.hash(password, await bcrypt.genSalt());

	let { error } = await supabase.from("admin").insert({
		id_admin: uuid(),
		username,
		email,
		password: hashed_password,
	});

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: StatusCodes.OK });
};

module.exports = { login, register };
