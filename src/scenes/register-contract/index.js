import React, { useState } from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
} from "@chakra-ui/core";

import apiAdmin from "../../services/api-admin";
import retirarMask from "../../utils/masks";
import "./style.css";


function RegisterContract() {
    const [contratante, setContratante] = useState("");
    const [cpf_cnpj, setCnpjCpf] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [status, setStatus] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [vinicola, setVinicola] = useState("");
    // eslint-disable-next-line
    const [error, setError] = useState("");
    // eslint-disable-next-line
    const [success, setSuccess] = useState("");


    const [contratante_field, setContratanteField] = useState("");
    const [cpfCnpj_field, setCpfCnpj_field] = useState("");
    const [endereco_field, setEndereco_field] = useState("");
    const [telefone_field, setTelefone_field] = useState("");
    const [status_field, setStatus_field] = useState("");
    const [dataInicio_field, setDataInicio_field] = useState("");
    const [dataFim_field, setDataFim_field] = useState("");
    const [vinicola_field, setVinicola_field] = useState("");

    const makeRegister = async () => {
        await apiAdmin.post("/contract", {
            contractor: contratante,
            cpf_cnpj,
            address: endereco,
            phoneNumber: telefone,
            status,
            initialDate: dataInicio,
            endDate: dataFim,
            winery: vinicola
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
    };

    const handleValidationContrante = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexName = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setContratanteField(true);
            setContratante(null);
            return;
        }

        if (value.length < 10) {
            setContratanteField(true);
            setContratante(null);
            return;
        }

        if (!regexName.exec(value)) {
            setContratanteField(true);
            setContratante(null);
            return;
        }

        setContratanteField(false);
        setContratante(value);
    }

    const handleValidationCpfCnpj = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regex = new RegExp(/(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)|(^\d{14}$)|(^\d{11}$)/);

        if (value.trim() === "") {
            setCpfCnpj_field(true);
            setCnpjCpf(null);
            return;
        }

        if (!regex.exec(value)) {
            setCpfCnpj_field(true);
            setCnpjCpf(null);
            return;
        }

        setCpfCnpj_field(false);
        setCnpjCpf(retirarMask(value));
    }

    const handleValidationEndereco = (event) => {
        event.preventDefault();
        const { value } = event.target;

        if (value.trim() === "") {
            setEndereco_field(true);
            setEndereco(null);
            return;
        }

        setEndereco_field(false);
        setEndereco(value);
    }

    const handleValidationTelefone = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexPhone = new RegExp(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/);

        if (value.trim() === "") {
            setTelefone_field(true);
            setTelefone(null);
            return;
        }

        if (!regexPhone.exec(value)) {
            setTelefone_field(true);
            setTelefone(null);
            return;
        }

        setTelefone_field(false);
        setTelefone(retirarMask(value));
    }

    const handleValidationStatus = (event) => {
        event.preventDefault();
        const { value } = event.target;

        if (value.trim() === "") {
            setStatus_field(true);
            setStatus(null);
            return;
        }

        setStatus_field(false);
        setStatus(value);
    }

    const handleValidationDataInicio = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexDate = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|Maio|Jul|Ago|Out|Dez)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Abr|Maio|Jun|Jul|Ago|Set|Out|Nov|Dez))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Fev))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Fev|Mar|Abr|Mai|Jun|Jul|Ago|Set))|(?:1[0-2]|(?:Out|Nov|Dez)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);

        if (value.trim() === "") {
            setDataInicio_field(true);
            setDataInicio(null);
            return;
        }

        if (!regexDate.exec(value)) {
            setDataInicio_field(true);
            setDataInicio(null);
            return;
        }

        setDataInicio_field(false);
        setDataInicio(value);
    }

    const handleValidationDataFim = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexDate = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|Maio|Jul|Ago|Out|Dez)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Abr|Maio|Jun|Jul|Ago|Set|Out|Nov|Dez))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Fev))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Fev|Mar|Abr|Mai|Jun|Jul|Ago|Set))|(?:1[0-2]|(?:Out|Nov|Dez)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);

        if (value.trim() === "") {
            setDataFim_field(true);
            setDataFim(null);
            return;
        }

        if (!regexDate.exec(value)) {
            setDataFim_field(true);
            setDataFim(null);
            return;
        }

        setDataFim_field(false);
        setDataFim(value);
    }

    const handleValidationVinicola = (event) => {
        event.preventDefault();
        const { value } = event.target;

        if (value.trim() === "") {
            setVinicola_field(true);
            setVinicola(null);
            return;
        }

        setVinicola_field(false);
        setVinicola(value);
    }


    return(
        <div className="main">
            {success === "success" &&
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! Seu cadastro foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar
                </Alert>
            }
            <Box className="box-contrato" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar Contrato
                    </Heading>
                </div>
                <div>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field_contratante" isRequired>
                            <FormLabel htmlFor="contratante">Contratante</FormLabel>
                            <Input isInvalid={contratante_field} name="contratante" placeholder="contratante" onChange={(e) => { handleValidationContrante(e); }} />
                        </FormControl>
                        <FormControl className="cpf_cnpj" isRequired>
                            <FormLabel htmlFor="cpf_cnpj">CPF/CNPJ</FormLabel>
                            <Input isInvalid={cpfCnpj_field} id="cpf_cnpj" placeholder="CPF/CNPJ" onChange={(e) => { handleValidationCpfCnpj(e); }} />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field-endereco" isRequired>
                            <FormLabel htmlFor="endereco">Endereço</FormLabel>
                            <Input isInvalid={endereco_field} id="endereco" placeholder="Endereço" onChange={(e) => { handleValidationEndereco(e); }} />
                        </FormControl>
                        <FormControl className="field-phone" isRequired>
                            <FormLabel htmlFor="telefone">Telefone</FormLabel>
                            <Input isInvalid={telefone_field} id="telefone" type="tel" placeholder="Telefone" onChange={(e) => { handleValidationTelefone(e); }} />
                        </FormControl>
                    </Grid>
                    <FormControl isRequired>
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Input isInvalid={status_field} id="status" placeholder="Status" onChange={(e) => { handleValidationStatus(e); }} />
                    </FormControl>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field-dataInicio" isRequired>
                            <FormLabel htmlFor="dataInicio">Data Início</FormLabel>
                            <Input isInvalid={dataInicio_field} id="dataInicio" placeholder="Data Início" onChange={(e) => { handleValidationDataInicio(e); }} />
                        </FormControl>
                        <FormControl className="field-dataFim" isRequired>
                            <FormLabel htmlFor="dataFim">Data Fim</FormLabel>
                            <Input isInvalid={dataFim_field} id="dataFim" placeholder="Data Fim" onChange={(e) => { handleValidationDataFim(e); }} />
                        </FormControl>
                    </Grid>
                    <FormControl isRequired>
                        <FormLabel htmlFor="vinicola">Vinicola</FormLabel>
                        <Input isInvalid={vinicola_field} id="vinicola" placeholder="Vinicola" onChange={(e) => { handleValidationVinicola(e); }} />
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button className="button-register" variantColor="primary" size="md" w="25%" onClick={() => makeRegister()}>CADASTRAR</Button>
                </div>
            </Box>
        </div>
    )
}

export default RegisterContract;
