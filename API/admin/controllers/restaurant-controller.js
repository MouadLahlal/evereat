const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { supabase } = require("../../db");
const { v4: uuid } = require("uuid");
const { ServerError, ClientError } = require("../../customclass/Error");

const newRestaurant = async (req, res, next) => {
	const {
		business_name,
		street_number,
		route,
		city,
		state,
		gmap_latitude,
		gmap_longitude,
		email,
		telephone,
		logo,
	} = req.body;
	const id_admin = req.id;

	if (
		!business_name ||
		!street_number ||
		!route ||
		!city ||
		!state ||
		!gmap_latitude ||
		!gmap_longitude ||
		!email ||
		!telephone ||
		!logo
	) {
		return next(
			new ClientError(StatusCodes.BAD_REQUEST)
		);
	}

	let { error } = await supabase.from("restaurant").insert({
		id_restaurant: uuid(),
		business_name,
		street_number,
		route,
		city,
		state,
		gmap_latitude,
		gmap_longitude,
		email,
		telephone,
		logo,
	});

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const updateRestaurant = async (req, res, next) => {
	const {
		id_restaurant,
		business_name,
		street_number,
		route,
		city,
		state,
		gmap_latitude,
		gmap_longitude,
		email,
		telephone,
		logo,
	} = req.body;

	let { error } = await supabase
		.from("restaurant")
		.update({
			business_name,
			street_number,
			route,
			city,
			state,
			gmap_latitude,
			gmap_longitude,
			email,
			telephone,
			logo,
		})
		.eq("id_restaurant", id_restaurant);

	if (error)
		return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const deleteRestaurant = (req, res, next) => {
	const id_restaurant = req.params.id;

	if (id_restaurant)
		next(
			new ClientError(StatusCodes.BAD_REQUEST)
		);

	// Per cancellare un ristorante ci sono due opzioni :
	// - La prima è cancellarlo dal database di produzione e salvare le sue informazioni su un'altro database o su altro sistema di memorizzazione
	// - La seconda opzione è inserire un campo booleano "archiviato", se è vero non deve essere letto in nessun caso
};

module.exports = { newRestaurant, updateRestaurant, deleteRestaurant };