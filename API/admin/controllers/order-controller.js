const { supabase } = require("../../db");
const { ServerError, ClientError } = require("../../customclass/Error");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const getOrders = async (req, res, next) => {
	const id_restaurant = req.params.id;

	let { data, error } = await supabase
		.from("order")
		.select("*")
		.eq("id_restaurant", id_restaurant);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res
		.status(StatusCodes.OK)
		.json({ message: ReasonPhrases.OK, content: data });
};

const getOrder = async (req, res, next) => {
	const { id_restaurant, id_order } = req.params;

	let { data, error } = await supabase
		.from("order")
		.select("*")
		.eq("id_restaurant", id_restaurant)
		.eq("id_order", id_order);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res
		.status(StatusCodes.OK)
		.json({ message: ReasonPhrases.OK, content: data[0] });
};

const updateOrder = async (req, res, next) => {
	const id_state = req.body.id_state;
	const { id_restaurant, id_order } = req.params;

	let { error } = await supabase
		.from("order")
		.update({
			id_state,
			id_restaurant,
		})
		.eq("id_order", id_order);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

module.exports = {
	getOrders,
	getOrder,
	updateOrder,
};
