import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
} from "@chakra-ui/core";

import apiUser from "../../services/api-user";
import retirarMask from "../../utils/masks";
import "./style.css";




function EditUser() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [situation, setSituation] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [nameField, setNamefield] = useState("");
    const [cpfField, setCpfField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [paswordField, setPasswordField] = useState("");
    const [typeField, setTypeField] = useState("");
    const [situationField, setSituationField] = useState("");

    const [userId, setId] = useState(String);

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const location = useLocation();

    const cpfCnpj = (value) => {
 
        //Remove tudo o que não é dígito
        value=value.replace(/\D/g,"")
      
        if (value.length <= 14) { //CPF
      
            //Coloca um ponto entre o terceiro e o quarto dígitos
            value=value.replace(/(\d{3})(\d)/,"$1.$2")
      
            //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
            value=value.replace(/(\d{3})(\d)/,"$1.$2")
      
            //Coloca um hífen entre o terceiro e o quarto dígitos
            value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
      
        } else { //CNPJ
      
            //Coloca ponto entre o segundo e o terceiro dígitos
            value=value.replace(/^(\d{2})(\d)/,"$1.$2")
      
            //Coloca ponto entre o quinto e o sexto dígitos
            value=value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
      
            //Coloca uma barra entre o oitavo e o nono dígitos
            value=value.replace(/\.(\d{3})(\d)/,".$1/$2")
      
            //Coloca um hífen depois do bloco de quatro dígitos
            value=value.replace(/(\d{4})(\d)/,"$1-$2")
      
        }
      
        return value
      
      }


    useEffect(() => {
        if (location.state.isEdit) {
            setId(location.state.userId);
            location.state.user.cpf = cpfCnpj(location.state.user.cpf)
        }
    }, [location]);


    const handleValidationName = (event) => {
        //location.state.user.name == null;
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

    const makeEdit = async () => {
        if (userId === null || userId === undefined) {
            setSuccess(null);
            return;
        }
        await apiUser.put("/user/" + userId, {
            name,
            cpf,
            email,
            password,
            type,
            situation
        },
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                setError("");
                setSuccess("success");
                setId(null);
                location.state = null;
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
                    Parabéns! Você alterou o usuário com sucesso!
                </Alert> : null}
            {
                error === "error" ?
                    <Alert status="error" variant="solid">
                        <AlertIcon />
                    Ops! Ocorreu algum erro :(
                </Alert> : null}
            <Box className="box-user" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Editar Usuário
                    </Heading>
                </div>
                <div>
                    <FormControl className="fieldName" isRequired>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input isInvalid={nameField} name="name" value={location.state.user.name} placeholder="Nome"  onClick={ (e) => { location.state.user.name = null }} onChange={(e) => { handleValidationName(e); }} />
                    </FormControl>

                    <FormControl className="fieldCpf" isRequired>
                        <FormLabel htmlFor="cpf">CPF</FormLabel>
                        <Input isInvalid={cpfField} id="cpf" value={location.state.user.cpf} placeholder="CPF"  onClick={ (e) => { location.state.user.cpf = null }} onChange={(e) => { handleValidationCpf(e); }} />
                    </FormControl>

                    <FormControl className="fieldEmail" isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input isInvalid={emailField} id="email" value={location.state.user.email} placeholder="E-mail" onClick={ (e) => { location.state.user.email = null }} onChange={(e) => { handleValidationEmail(e); }} />
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
                        <Input isInvalid={typeField} id="type" value={location.state.user.type} placeholder="Tipo"  onClick={ (e) => { location.state.user.type = null }} onChange={(e) => { handleValidationType(e); }} />
                    </FormControl>
                    <FormControl className="fieldSituation" isRequired>
                        <FormLabel htmlFor="situation">Situação</FormLabel>
                        <Input isInvalid={situationField} id="situation" value={location.state.user.situation} placeholder="Situação"  onClick={ (e) => { location.state.user.situation = null }} onChange={(e) => { handleValidationSituation(e); }} />
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => makeEdit()}>Atualizar</Button>
                </div>
            </Box>
        </div >
    );
}


export default EditUser;