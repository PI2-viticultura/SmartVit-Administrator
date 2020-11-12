import React, { useState } from "react";

import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Select
} from "@chakra-ui/core";

import apiUser from "../../services/api-user";
import apiWinery from "../../services/api-winery";
import retirarMask from "../../utils/masks";
import "./style.css";


function RegisterUser() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [situation, setSituation] = useState("");
    const [wineryId, setWineryId] = useState("");
    const [winery, setWinery] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [nameField, setNamefield] = useState("");
    const [cpfField, setCpfField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [paswordField, setPasswordField] = useState("");
    const [typeField, setTypeField] = useState("");
    const [situationField, setSituationField] = useState("");

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);


    React.useEffect(() => {
        let wineryList = [];

        const getWinery = async () => {
            await apiWinery.get("/winery",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                wineryList = res.data.filter((element) => typeof element.name === "string");
                setWinery(wineryList);
            }).catch((error) => {
            });
        };
        getWinery();
    }, []);

    const handleValidationName = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexName = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setNamefield(true);
            setName(null);
            return;
        }

        if (value.length < 10) {
            setNamefield(true);
            setName(null);
            return;
        }

        if (!regexName.exec(value)) {
            setNamefield(true);
            setName(null);
            return;
        }

        setNamefield(false);
        setName(value);
    };

    const handleValidationCpf = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexCpf = new RegExp(/(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{11}$)/);

        if (value.trim() === "") {
            setCpfField(true);
            setCpf(null);
            return;
        }

        if (!regexCpf.exec(value)) {
            setCpfField(true);
            setCpf(null);
            return;
        }

        setCpfField(false);
        setCpf(retirarMask(value));
    }
    const handleValidationEmail = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (value.trim() === "") {
            setEmailField(true);
            setEmail(null);
            return;
        }

        if (!regexEmail.exec(value)) {
            setEmailField(true);
            setEmail(null);
            return;
        }

        setEmailField(false);
        setEmail(value);
    }
    const handleValidationPassword = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexPassword = new RegExp(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/);

        if (value.trim() === "") {
            setPasswordField(true);
            setPassword(null);
            return;
        }

        if (!regexPassword.exec(value)) {
            setPasswordField(true);
            setPassword(null);
            return;
        }

        setPasswordField(false);
        setPassword(value);
    }
    const handleValidationType = (event) => {
        event.preventDefault();
        const { value } = event.target;

        if (value.trim() === "") {
            setTypeField(true);
            setType(null);
            return;
        }

        setTypeField(false);
        setType(value);
    }
    const handleValidationSituation = (event) => {
        event.preventDefault();
        const { value } = event.target;

        if (value.trim() === "") {
            setSituationField(true);
            setSituation(null);
            return;
        }

        setSituationField(false);
        setSituation(value);
    }

    const makeRegister = async () => {
        await apiUser.post("/user", {
            name,
            cpf,
            email,
            password,
            type,
            situation,
            winery_id: wineryId
        },
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                setError("");
                setSuccess("success");
            }).catch((error) => {
                setError("error");
                setSuccess("");
            });
    }

    return (
        <div className="main">
            {success === "success" ?
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! Seu cadastro foi realizado com sucesso!
                </Alert> : null}
            <Box className="box-user" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar Usuário
                    </Heading>
                </div>
                <div>
                    <FormControl className="fieldName" isRequired>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input isInvalid={nameField} name="name" placeholder="Nome" onChange={(e) => { handleValidationName(e); }} />
                    </FormControl>

                    <FormControl className="fieldCpf" isRequired>
                        <FormLabel htmlFor="cpf">CPF</FormLabel>
                        <Input isInvalid={cpfField} id="cpf" placeholder="CPF" onChange={(e) => { handleValidationCpf(e); }} />
                    </FormControl>

                    <FormControl className="fieldEmail" isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input isInvalid={emailField} id="email" placeholder="E-mail" onChange={(e) => { handleValidationEmail(e); }} />
                    </FormControl>

                    <FormControl className="fieldPassword" isRequired>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup size="md">
                            <Input type={show ? "text" : "password"} isInvalid={paswordField} id="password" placeholder="Senha" onChange={(e) => { handleValidationPassword(e); }} />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl className="fieldType" isRequired>
                        <FormLabel htmlFor="type">Tipo</FormLabel>
                        <Input isInvalid={typeField} id="type" placeholder="Tipo" onChange={(e) => { handleValidationType(e); }} />
                    </FormControl>
                    <FormControl className="fieldSituation" isRequired>
                        <FormLabel htmlFor="situation">Situação</FormLabel>
                        <Input isInvalid={situationField} id="situation" placeholder="Situação" onChange={(e) => { handleValidationSituation(e); }} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="winery">Vinícola</FormLabel>
                        <Select id="winery" onChange={(e) => { setWineryId(e.target.value); console.log(e.target.value) }}>
                            {
                                winery.map((win) => <option key={win._id.$oid} value={win._id.$oid}>{win.name}</option>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => makeRegister()}>CADASTRAR</Button>
                </div>
            </Box>
        </div >
    );
}


export default RegisterUser;