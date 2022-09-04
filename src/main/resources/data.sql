CREATE TABLE USERS
(
    USER_ID       INTEGER      NOT NULL,
    USERNAME     VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    primary key (USER_ID)
);

insert into users (USER_ID, USERNAME, PASSWORD)
values (1, 'admin', 'admin');

insert into users (USER_ID, USERNAME, PASSWORD)
values (2, 'userd', 'user');

CREATE TABLE PRODUCTS
(
    PRODUCT_ID       INTEGER      NOT NULL,
    PRODUCT_NAME     VARCHAR(255) NOT NULL,
    PRODUCT_CATEGORY VARCHAR(255) NOT NULL,
    primary key (PRODUCT_ID)
);

insert into products (PRODUCT_ID, PRODUCT_NAME, PRODUCT_CATEGORY)
values (1, 'lamp', 'home');
insert into products (PRODUCT_ID, PRODUCT_NAME, PRODUCT_CATEGORY)
values (2, 'chair', 'home');
insert into products (PRODUCT_ID, PRODUCT_NAME, PRODUCT_CATEGORY)
values (3, 'table', 'home');
insert into products (PRODUCT_ID, PRODUCT_NAME, PRODUCT_CATEGORY)
values (4, 'fan', 'home');
insert into products (PRODUCT_ID, PRODUCT_NAME, PRODUCT_CATEGORY)
values (5, 'wipers', 'car');
insert into products (PRODUCT_ID, PRODUCT_NAME, PRODUCT_CATEGORY)
values (6, 'tires', 'car');

CREATE TABLE BAGS
(
    bag_id     INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    primary key (bag_id, product_id)
);

insert into Bags (bag_id, product_id)
values (1, 1);
insert into Bags (bag_id, product_id)
values (1, 2);
insert into Bags (bag_id, product_id)
values (1, 5);
insert into Bags (bag_id, product_id)
values (1, 6);

CREATE TABLE PURCHASES
(
    USER_ID INTEGER NOT NULL,
    BAG_ID INTEGER NOT NULL,
    PURCHASE_DATE timestamp,
    primary key (USER_ID, BAG_ID)
);

insert into PURCHASES (USER_ID, BAG_ID, PURCHASE_DATE)
values (1, 1, now());
