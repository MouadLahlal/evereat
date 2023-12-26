const { supabase } = require("../../db");
const { v4: uuid } = require("uuid");
const { ClientError, ServerError } = require("../../customclass/Error");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const bcrypt = require("bcrypt");

const newAdmin = async (req, res, next) => {
	const {
		username,
		password,
		email,
		sales,
		edit,
		creates,
		archive,
		stats,
		user_details,
		superadmin,
	} = req.body;

	if (
		!username ||
		!password ||
		!email ||
		sales === null ||
		edit === null ||
		creates === null ||
		archive === null ||
		stats === null ||
		user_details === null ||
		superadmin === null
	) {
		return next(new ClientError(StatusCodes.BAD_REQUEST));
	}

	let hashed_psw = await bcrypt.hash(password, await bcrypt.genSalt());
	let { data, error } = await supabase.from("admin").insert({
		id_admin: uuid(),
		username,
		password: hashed_psw,
		email,
		sales,
		edit,
		creates,
		archive,
		stats,
		user_details,
		superadmin,
	});

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const updateAdmin = async (req, res, next) => {
	const {
		username,
		email,
		sales,
		edit,
		creates,
		archive,
		stats,
		user_details,
		superadmin,
	} = req.body;
	const id_admin = req.params.id_admin;

	if (!id_admin) return next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase
		.from("admin")
		.update({
			username,
			email,
			sales,
			edit,
			creates,
			archive,
			stats,
			user_details,
			superadmin,
		})
		.eq("id_admin", id_admin);

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const getAll = async (req, res, next) => {
	let { data, error } = await supabase.from("admin").select("*");

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res
		.status(StatusCodes.OK)
		.json({ message: ReasonPhrases.OK, content: data });
};

module.exports = {
	newAdmin,
	updateAdmin,
	getAll,
};
