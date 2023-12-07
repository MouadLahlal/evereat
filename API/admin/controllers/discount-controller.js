const { supabase } = require("../../db");
const { v4: uuid } = require("uuid");
const { StatusCodes, ReasonPhrases, OK } = require("http-status-codes");
const { ClientError, ServerError } = require("../../customclass/Error");

const newDiscount = async (req, res, next) => {
	const { discount, id_restaurant, id_dish } = req.body;

	if (!discount || !id_restaurant || !id_dish)
		next(
			new ClientError(StatusCodes.BAD_REQUEST)
		);

	let { error } = await supabase.from("discount").insert({
		id_discount: uuid(),
		discount,
		id_restaurant,
		id_dish,
	});

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const updateDiscount = async (req, res, next) => {
	const id_discount = req.params.id_discount;
	const { discount, id_restaurant, id_dish } = req.body;

	let { error } = await supabase
		.from("discount")
		.update({
			discount,
			id_restaurant,
			id_dish,
		})
		.eq("id_discount", id_discount);

	if (error) return next(new ServerError(StatusCodes.OK, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

module.exports = {
	newDiscount,
	updateDiscount,
};
