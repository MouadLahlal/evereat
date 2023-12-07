const { supabase } = require("../../db");
const { v4: uuid } = require("uuid");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ServerError, ClientError } = require("../../customclass/Error");

const newMenu = async (req, res, next) => {
	const id_restaurant = req.body.id_restaurant;

	if (!id_restaurant) return next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase.from("menu").insert({
		id_menu: uuid(),
		id_restaurant,
	});

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const newDish = async (req, res, next) => {
	const { name, id_menu } = req.body;

	if (!name || !id_menu) next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase.from("dish").insert({
		id_dish: uuid(),
		name,
		id_menu,
	});

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const newVariant = async (req, res, next) => {
	const { name, img } = req.body;
	const { id_dish } = req.params;

	if (!name || !img || !id_dish)
		next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase.from("variant").insert({
		id_variant: uuid(),
		name,
		img,
		id_dish,
	});

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const newExtra = async (req, res, next) => {
	const { name } = req.body;
	const { id_dish } = req.params;

	if (!name || !id_dish) next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase.from("extra").insert({
		id_extra: uuid(),
		name,
		id_dish,
	});

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const updateDish = async (req, res, next) => {
	const { name, id_menu } = req.body;
	const id_dish = req.params.id;

	if (!name || !id_menu || !id_dish)
		next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase
		.from("dish")
		.update({
			name,
			id_menu,
		})
		.eq("id_dish", id_dish);

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const updateVariant = async (req, res, next) => {
	const { name, img, id_dish } = req.body;
	const id_variant = req.params.id;

	if (!name || !img || !id_dish || !id_variant)
		next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase
		.from("dish")
		.update({
			name,
			img,
			id_dish,
		})
		.eq("id_variant", id_variant);

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const updateExtra = async (req, res, next) => {
	const { name, id_dish } = req.body;
	const id_extra = req.params.id;

	if (!name || !id_dish || !id_extra)
		next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase
		.from("extra")
		.update({
			name,
			id_dish,
		})
		.eq("id_extra", id_extra);

	if (error)
		return next(
			new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
		);
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

module.exports = {
	newMenu,
	newDish,
	newVariant,
	newExtra,
	updateDish,
	updateVariant,
	updateExtra,
};
