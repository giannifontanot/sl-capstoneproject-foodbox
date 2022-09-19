INSERT INTO food (id, cuisine, description, image_url, is_enabled, food_name, price)values(1, 'MEXICAN', '1 Receta de la abuelita de mole verde', 'tinyurl.com/moleVerdeImage','Y', '1 Mole Verde', 10);
INSERT INTO food (id, cuisine, description, image_url, is_enabled, food_name, price)values(5, 'MEXICAN', '5 Receta de la abuelita de mole verde', 'tinyurl.com/moleVerdeImage','Y', '5 Mole Verde', 50);
INSERT INTO food (id, cuisine, description, image_url, is_enabled, food_name, price)values(2, 'MEXICAN', '2Receta de la abuelita de mole verde', 'tinyurl.com/moleVerdeImage','Y', '2 Mole Verde', 20);
INSERT INTO food (id, cuisine, description, image_url, is_enabled, food_name, price)values(3, 'MEXICAN', '3 Receta de la abuelita de mole verde', 'tinyurl.com/moleVerdeImage','Y', '3 Mole Verde', 30);
INSERT INTO food (id, cuisine, description, image_url, is_enabled, food_name, price)values(4, 'MEXICAN', '4 Receta de la abuelita de mole verde', 'tinyurl.com/moleVerdeImage','Y', '4 Mole Verde', 40);

insert into client(id,contact,email,password,username)values(1,"21480945441","elmerhomero@123.com","notiene", "yomerito");

insert into box (id, food_id)values(1,1);
insert into box (id, food_id)values(1,2);
insert into box (id, food_id)values(1,3);
insert into box (id, food_id)values(1,4);

insert into box (id, food_id)values(2,1);
insert into box (id, food_id)values(2,2);


insert into orden(id,status,box_id,client_id)values(1,"READY", 1,1);
insert into orden(id,status,box_id,client_id)values(2,"PEND", 2,1);



Hibernate:

drop table if exists box
    Hibernate:

drop table if exists client
    Hibernate:

drop table if exists food
    Hibernate:

drop table if exists orden
    Hibernate:

create table box (
                     id bigint not null auto_increment,
                     food_id integer,
                     primary key (id)
) engine=InnoDB
Hibernate:

create table client (
                        id bigint not null auto_increment,
                        contact bigint,
                        email varchar(255),
                        password varchar(255),
                        username varchar(255),
                        primary key (id)
) engine=InnoDB
Hibernate:

create table food (
                      id integer not null auto_increment,
                      cuisine varchar(255),
                      description varchar(255),
                      food_name varchar(255),
                      image_url varchar(255),
                      is_enabled varchar(255),
                      price bigint,
                      primary key (id)
) engine=InnoDB
Hibernate:

create table orden (
                       box_id bigint not null,
                       client_id bigint not null,
                       id bigint not null,
                       status varchar(255),
                       primary key (box_id, client_id, id)
) engine=InnoDB
Hibernate:

alter table orden
    add constraint UK_rb6npe7305gao860lxnuj2g7t unique (box_id)
    Hibernate:

alter table box
    add constraint FKry8rla6994n8hd9579ia6a7k8
        foreign key (food_id)
            references food (id)
    Hibernate:

alter table orden
    add constraint FKev4ou7yydtyartj534k0v82gx
        foreign key (box_id)
            references box (id)
    Hibernate:

alter table orden
    add constraint FKdkqdxtdujrqslotkp947lgvqy
        foreign key (client_id)
            references client (id)