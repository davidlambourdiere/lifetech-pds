CREATE TABLE lifetech.healthhistoric (
id SERIAL PRIMARY KEY,
optlock TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
hearthrate VARCHAR(255),
systolic VARCHAR(255),
diastolic VARCHAR(255),
sugarlevel VARCHAR(255),
stepcounter VARCHAR(255),
startdate TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
strapid VARCHAR(255)
);


CREATE TABLE lifetech.personprofile (
  Id SERIAL PRIMARY KEY,
  nom varchar(300) NOT NULL,
  prenom varchar(300) NOT NULL,
  age BIGINT NOT NULL,
  adress varchar(300) NOT NULL,
  postal_code int NOT NULL,
  adress_email varchar(300) NOT NULL,
  tel_number int NOT NULL,
  chronic_disease varchar(300) NOT NULL,
  estimated_mobility int NOT NULL,
  smoking boolean NOT NULL,
  smoking_time float NOT NULL,
  drinker boolean NOT NULL,
  medical_emergencies boolean NOT NULL,
  Hobbies varchar(300) NOT NULL,
  revenue float NOT NULL,
  profile varchar(300) NOT NULL

);
