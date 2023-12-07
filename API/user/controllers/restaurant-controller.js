const db = require("../../db");
const { v4: uuid } = require("uuid");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ServerError, ClientError } = require("../../customclass/Error");
const { supabase } = require("../../db");

const getAll = async (req, res, next) => {
	let { data, error } = await supabase.from("restaurant").select(`
        *,
        reviews (*),
        deliver_options (*)
    `);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res
		.status(StatusCodes.OK)
		.json({ message: ReasonPhrases.OK, content: data });
};

const getOne = async (req, res, next) => {
	const { id_restaurant } = req.params;

	let { data, error } = await supabase
		.from("restaurant")
		.select(
			`
            *,
            menu (
                *,
                dish (
                    *,
                    variant (*),
                    extra (*)
                )
            ),
            reviews (*),
            deliver_options (*)
        `
		)
		.eq("id_restaurant", id_restaurant);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res
		.status(StatusCodes.OK)
		.json({ message: ReasonPhrases.OK, content: data });
};

const postReview = async (req, res, next) => {
	const { stars, date, text, id_user } = req.body;
	const { id_restaurant } = req.params;

	if (!stars || !date || !text || !id_user)
		return next(new ClientError(StatusCodes.BAD_REQUEST));

	let { error } = await supabase.from("reviews").insert({
		id_review: uuid(),
		stars,
		date,
		text,
		id_user,
		id_restaurant,
	});

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const setFavourite = (req, res, next) => {
	const {} = req.body;

	// verificare i parametri richiesti

	db.getConnection((error, connection) => {
		// salvare il ristorante da qualche parte
	});
};

module.exports = {
	getAll,
	getOne,
	postReview,
};
