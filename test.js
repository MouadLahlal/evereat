async function post(url = "", data = {}, token = "") {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

const admin = {
	username: "admin",
	email: "admin@admin.com",
	password: "admin"
};

const risto = {
	business_name:"Samira Kebab",
	street_number:"333",
	route:"Via Mefisto",
	city:"Marizzole",
	state:"Paese dei Balocchi",
	gmap_position:"h4k.4g.gwgwg4wgw.4wr",
	email:"samire@kebab.com",
	telephone:"33354786598",
	logo:"logo"
};

const dish = (id_menu) => {
	return {
		name: "Pasto col Tonno",
		id_menu:id_menu
	};
};

const variant = {
	name: "Pasta col Tonno al Pummarolo",
	img:"somesite/someloc/someimg"
};

const extra = {
	name: "Formaggio"
}

const discount = (id_restaurant, id_dish) => {
	return {
		discount: 10,
		id_restaurant: id_restaurant,
		id_dish: id_dish
	}
};

async function test() {
	let register = await post("http://localhost:3001/api/v1/admin/auth/register", admin);
	let login = await post("http://localhost:3001/api/v1/admin/auth/login", admin);
	let newrestaurant = await post("http://localhost:3001/api/v1/admin/restaurant", risto, login.token);
	let newmenu = await post("http://localhost:3001/api/v1/admin/menu/", {id_restaurant: newrestaurant.content.id_restaurant}, login.token);
	let newdish = await post("http://localhost:3001/api/v1/admin/menu/dish", dish(newmenu.content.id_menu), login.token);
	let newvariant = await post(`http://localhost:3001/api/v1/admin/menu/${newdish.content.id_dish}/variant`, variant, login.token);
	let newextra = await post(`http://localhost:3001/api/v1/admin/menu/${newdish.content.id_dish}/extra`, extra, login.token);
	let newdiscount = await post("http://localhost:3001/api/v1/admin/discount", discount(newrestaurant.content.id_restaurant, newdish.content.id_dish), login.token);
	
	console.log(register);
	console.log(login);
	console.log(newrestaurant);
	console.log(newmenu);
	console.log(newdish);
	console.log(newvariant);
	console.log(newextra);
	console.log(newdiscount);
}


test();