-- CreateTable
CREATE TABLE `admin` (
    `id_admin` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `username` VARCHAR(64) NULL,
    `password` VARCHAR(256) NULL,
    `email` VARCHAR(128) NULL,
    `sales` BOOLEAN NULL DEFAULT true,
    `edit` BOOLEAN NULL DEFAULT true,
    `creates` BOOLEAN NULL DEFAULT true,
    `archive` BOOLEAN NULL DEFAULT true,
    `stats` BOOLEAN NULL DEFAULT true,
    `user_details` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_restaurant` (
    `id_ar` VARCHAR(64) NOT NULL DEFAULT uuid(),
    `id_admin` VARCHAR(64) NULL,
    `id_restaurant` VARCHAR(64) NULL,

    INDEX `id_admin`(`id_admin`),
    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_ar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_hours` (
    `id_business_hours` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `day` VARCHAR(32) NULL,
    `open_hour` TIME(3) NULL,
    `close_hour` TIME(0) NULL,
    `id_restaurant` VARCHAR(64) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_business_hours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deliver_options` (
    `id_deliver_opt` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `delivery_price` INTEGER NULL,
    `min_order` INTEGER NULL,
    `collection` BOOLEAN NULL,
    `delivery_fee` INTEGER NULL,
    `evereat_fee` INTEGER NULL,
    `id_restaurant` VARCHAR(64) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_deliver_opt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discount` (
    `id_discount` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `discount` INTEGER NULL,
    `start_date` DATE NULL DEFAULT '2023-11-20',
    `end_date` DATE NULL DEFAULT '2023-11-30',
    `with_code` BOOLEAN NULL DEFAULT false,
    `code` VARCHAR(64) NULL,
    `max_users` INTEGER NULL DEFAULT 0,
    `id_restaurant` VARCHAR(64) NULL,
    `id_dish` VARCHAR(64) NULL,

    INDEX `id_dish`(`id_dish`),
    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_discount`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dish` (
    `id_dish` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(64) NULL,
    `id_menu` VARCHAR(64) NULL,

    INDEX `id_menu`(`id_menu`),
    PRIMARY KEY (`id_dish`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extra` (
    `id_extra` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(64) NULL,
    `id_dish` VARCHAR(64) NULL,

    INDEX `id_dish`(`id_dish`),
    PRIMARY KEY (`id_extra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gift` (
    `id_gift` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `id_discount` VARCHAR(64) NULL,

    INDEX `id_discount`(`id_discount`),
    PRIMARY KEY (`id_gift`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id_menu` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `id_restaurant` VARCHAR(64) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_menu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id_order` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `date` DATE NULL,
    `hour` TIME(0) NULL,
    `paid` BOOLEAN NULL,
    `id_user` VARCHAR(64) NULL,
    `id_restaurant` VARCHAR(64) NULL,
    `id_rider` VARCHAR(64) NULL,
    `id_state` VARCHAR(64) NULL,
    `id_payment_method` VARCHAR(64) NULL,

    INDEX `id_payment_method`(`id_payment_method`),
    INDEX `id_restaurant`(`id_restaurant`),
    INDEX `id_rider`(`id_rider`),
    INDEX `id_state`(`id_state`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_state` (
    `id_state` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `state` VARCHAR(256) NULL,

    PRIMARY KEY (`id_state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_variant` (
    `id_ov` VARCHAR(64) NOT NULL DEFAULT uuid(),
    `id_order` VARCHAR(64) NULL,
    `id_variant` VARCHAR(64) NULL,

    INDEX `id_order`(`id_order`),
    INDEX `id_variant`(`id_variant`),
    PRIMARY KEY (`id_ov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_method` (
    `id_payment_method` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `payment_method` VARCHAR(256) NULL,

    PRIMARY KEY (`id_payment_method`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant` (
    `id_restaurant` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `business_name` VARCHAR(1024) NULL,
    `street_number` INTEGER NULL,
    `route` VARCHAR(256) NULL,
    `city` VARCHAR(256) NULL,
    `state` VARCHAR(256) NULL,
    `gmap_latitude` VARCHAR(256) NULL,
    `gmap_longitude` VARCHAR(256) NULL,
    `email` VARCHAR(128) NULL,
    `telephone` VARCHAR(64) NULL,
    `logo` VARCHAR(256) NULL,
    `archived` BOOLEAN NULL,

    PRIMARY KEY (`id_restaurant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_photo` (
    `id_foto` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `type` VARCHAR(64) NULL,
    `path` VARCHAR(256) NULL,
    `id_restaurant` VARCHAR(64) NULL,
    `id_variant` VARCHAR(64) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    INDEX `id_variant`(`id_variant`),
    PRIMARY KEY (`id_foto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id_review` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `stars` INTEGER NULL,
    `date` DATE NULL,
    `text` VARCHAR(2048) NULL,
    `id_user` VARCHAR(64) NULL,
    `id_restaurant` VARCHAR(64) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_review`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rider` (
    `id_rider` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(64) NULL,
    `surname` VARCHAR(64) NULL,
    `email` VARCHAR(128) NULL,
    `password` VARCHAR(256) NULL,
    `street_number` INTEGER NULL,
    `route` VARCHAR(256) NULL,
    `city` VARCHAR(256) NULL,
    `state` VARCHAR(256) NULL,
    `mean_transport` VARCHAR(64) NULL,
    `id_restaurant` VARCHAR(64) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_rider`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(64) NULL,
    `surname` VARCHAR(64) NULL,
    `email` VARCHAR(128) NULL,
    `telephone` VARCHAR(64) NULL,
    `password` VARCHAR(256) NULL,
    `street_number` INTEGER NULL,
    `route` VARCHAR(256) NULL,
    `city` VARCHAR(256) NULL,
    `state` VARCHAR(256) NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variant` (
    `id_variant` VARCHAR(64) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(64) NULL,
    `img` VARCHAR(64) NULL,
    `price` INTEGER NULL DEFAULT 599,
    `id_dish` VARCHAR(64) NULL,

    INDEX `id_dish`(`id_dish`),
    PRIMARY KEY (`id_variant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin_restaurant` ADD CONSTRAINT `admin_restaurant_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin_restaurant` ADD CONSTRAINT `admin_restaurant_ibfk_2` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `business_hours` ADD CONSTRAINT `business_hours_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `deliver_options` ADD CONSTRAINT `deliver_options_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `discount` ADD CONSTRAINT `discount_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dish`(`id_dish`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `discount` ADD CONSTRAINT `discount_ibfk_2` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dish` ADD CONSTRAINT `dish_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu`(`id_menu`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `extra` ADD CONSTRAINT `extra_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dish`(`id_dish`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gift` ADD CONSTRAINT `gift_ibfk_1` FOREIGN KEY (`id_discount`) REFERENCES `discount`(`id_discount`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`id_rider`) REFERENCES `rider`(`id_rider`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_4` FOREIGN KEY (`id_state`) REFERENCES `order_state`(`id_state`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_5` FOREIGN KEY (`id_payment_method`) REFERENCES `payment_method`(`id_payment_method`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_variant` ADD CONSTRAINT `order_variant_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order`(`id_order`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_variant` ADD CONSTRAINT `order_variant_ibfk_2` FOREIGN KEY (`id_variant`) REFERENCES `variant`(`id_variant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_photo` ADD CONSTRAINT `restaurant_photo_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_photo` ADD CONSTRAINT `restaurant_photo_ibfk_2` FOREIGN KEY (`id_variant`) REFERENCES `variant`(`id_variant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rider` ADD CONSTRAINT `rider_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurant`(`id_restaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `variant` ADD CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dish`(`id_dish`) ON DELETE NO ACTION ON UPDATE NO ACTION;

