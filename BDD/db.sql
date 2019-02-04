--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: entrainement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entrainement (
    id bigint NOT NULL,
    createur bigint NOT NULL,
    joueur1 bigint,
    joueur2 bigint,
    joueur3 bigint,
    joueur4 bigint,
    joueur5 bigint,
    joueur6 bigint
);


ALTER TABLE public.entrainement OWNER TO postgres;

--
-- Name: entrainement_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entrainement_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entrainement_id OWNER TO postgres;

--
-- Name: id_type; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.id_type
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.id_type OWNER TO postgres;

--
-- Name: id_user; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.id_user
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.id_user OWNER TO postgres;

--
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team (
    id bigint NOT NULL,
    nom character(40) NOT NULL,
    manager bigint NOT NULL,
    logo text
);


ALTER TABLE public.team OWNER TO postgres;

--
-- Name: team_id_team; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.team_id_team
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_id_team OWNER TO postgres;

--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    id bigint NOT NULL,
    name character(100) NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Name: user_u_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_u_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_u_id_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint DEFAULT nextval('public.user_u_id_seq'::regclass) NOT NULL,
    fname character(64) NOT NULL,
    lname character(64) NOT NULL,
    mail character(64) NOT NULL,
    password character(64) NOT NULL,
    pseudo character(64) NOT NULL,
    birthdate date,
    idteam bigint
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: entrainement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entrainement (id, createur, joueur1, joueur2, joueur3, joueur4, joueur5, joueur6) FROM stdin;
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team (id, nom, manager, logo) FROM stdin;
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (id, name) FROM stdin;
1	Admin                                                                                               
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, fname, lname, mail, password, pseudo, birthdate, idteam) FROM stdin;
\.


--
-- Name: entrainement_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entrainement_id', 1, false);


--
-- Name: id_type; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.id_type', 1, false);


--
-- Name: id_user; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.id_user', 1, false);


--
-- Name: team_id_team; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_id_team', 1, false);


--
-- Name: user_u_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_u_id_seq', 1, false);


--
-- Name: entrainement entrainement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrainement
    ADD CONSTRAINT entrainement_pkey PRIMARY KEY (id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

