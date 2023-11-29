const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()


async function main() {
    await prisma.admin.create({
        data: {
            username: 'admin',
            password: '$2b$10$FVNlc5vu8PoyPJp7..v43uP5YLjVFp6T.vHrhXb3a2soY7o9RoeMe',
            creates: true,
            archive: true,
            sales: true,
            edit: true,
            stats: true,
            user_details: true
        },
    })
    
    await prisma.restaurant.create({
        data: {
            business_name: "Samsara & Nirvana",
            email: "samsara.nirvana@gmail.com",
            telephone: "3334569847",
            city: "Capo Verde",
            route: "Via dell'Atman",
            street_number: 43,
            state: "Repubblica democratica del Congo",
            gmap_latitude: "4.2546365",
            gmap_longitude: "6.7890482",
            logo: "somesite/someroute/someendpoint/someimage",
            archived: false,
            business_hours: {
                create: {
                    day: "Monday",
                    open_hour: new Date(2023, 10, 17, 8, 0, 0),
                    close_hour: new Date(2023, 10, 17, 12, 0, 0),
                }
            },
            deliver_options: {
                create: {
                    delivery_price: 550,
                    delivery_fee: 627,
                    evereat_fee: 327,
                    collection: false,
                    min_order: 2500
                }
            },
            reviews: {
                create: {
                    date: new Date(2023, 10, 17),
                    stars: 4,
                    text: "Bel ristorante",
                    user: {
                        create: {
                            name: "Marco",
                            surname: "Bonassi",
                            email: "marco.bonassi@gmail.com",
                            password: "$2b$10$FVNlc5vu8PoyPJp7..v43uP5YLjVFp6T.vHrhXb3a2soY7o9RoeMe",
                            telephone: "3334789564",
                            state: "Burkina Faso",
                            city: "New Delhi",
                            route: "Via Leovinci da Nardo",
                            street_number: 17,
                        }
                    }
                }
            }
        }
    })

    const res = await prisma.restaurant.findMany({
        include: {
            business_hours: true,
            deliver_options: true,
            reviews: {
                include: {
                    user: true
                }
            }
        }
    });

    console.log(res[0].business_hours);
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })