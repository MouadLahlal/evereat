const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { supabase } = require("../../db");
const { v4: uuid } = require("uuid");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ClientError, ServerError } = require("../../customclass/Error");

const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ClientError(StatusCodes.BAD_REQUEST));
	}

	let { data, error } = await supabase
		.from("user")
		.select(`*`)
		.eq("email", email);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	if (data.length > 0) {
		let access = await bcrypt.compare(password, data[0].password);
		if (access) {
			let token = jwt.sign(
				{ id: data[0].id_user, type: "user" },
				process.env.JWT_KEY,
				{ expiresIn: "2d" }
			);
			return res
				.status(StatusCodes.OK)
				.json({ message: ReasonPhrases.OK, token: token });
		} else {
			return next(new ClientError(StatusCodes.NOT_FOUND));
		}
	} else {
		return next(new ClientError(StatusCodes.NOT_FOUND));
	}
};

const register = async (req, res, next) => {
	const {
		name,
		surname,
		email,
		telephone,
		password,
		city,
		route,
		street_number,
		cap,
		state,
	} = req.body;

	if (
		!name ||
		!surname ||
		!email ||
		!telephone ||
		!password ||
		!city ||
		!route ||
		!street_number ||
		!cap ||
		!state
	) {
		return next(
			new ClientError(StatusCodes.BAD_REQUEST)
		);
	}

	let hashed_password = await bcrypt.hash(password, await bcrypt.genSalt());

	let { error } = await supabase.from("user").insert({
		id_user: uuid(),
		name,
		surname,
		email,
		telephone,
		password: hashed_password,
		city,
		route,
		street_number,
		cap,
		state,
	});

	console.error(error);
	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

module.exports = { login, register };