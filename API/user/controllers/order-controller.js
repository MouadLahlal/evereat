const { v4: uuid } = require("uuid");
const { supabase } = require("../../db");
const { ServerError, ClientError } = require("../../customclass/Error");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const placeOrder = async (req, res, next) => {
	// const id_user = req.id;
	const { id_user, paid, id_restaurant, id_payment_method, order } = req.body;
	
	/*
		aggiungere campo nel database in cui salvare le informazioni del dispositivo
		che ha effettuato l'ordine
	*/
	const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	let { data, error } = await supabase
		.from("order")
		.insert({
			id_order: uuid(),
			date: new Date().toLocaleDateString("it-IT"),
			hour: new Date().toLocaleTimeString("it-IT"),
			paid,
			id_user,
			id_restaurant,
			// id_state: 0,
			// id_payment_method,
		})
		.select();

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res
		.status(StatusCodes.OK)
		.json({ message: ReasonPhrases.OK, content: data });
};

const editOrder = async (req, res, next) => {
	const { paid } = req.body;
	const id_order = req.params.id_order;

	let { error } = await supabase
		.from("order")
		.update({
			paid,
		})
		.eq("id_order", id_order);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

module.exports = {
	placeOrder,
	editOrder,
};
