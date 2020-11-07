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
    Input
} from "@chakra-ui/core";

import apiAdmin from "../../services/api-admin";
import retirarMask from "../../utils/masks";

function EditContract() {
    const [contratante, setContratante] = useState("");
    const [cpf_cnpj, setCnpjCpf] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [status, setStatus] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [vinicola, setVinicola] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [contratanteField, setContratanteField] = useState("");
    const [cpf_cnpjField, setCpfCnpj_field] = useState("");
    const [enderecoField, setEndereco_field] = useState("");
    const [telefoneField, setTelefone_field] = useState("");
    const [statusField, setStatus_field] = useState("");
    const [dataInicioField, setDataInicio_field] = useState("");
    const [dataFimField, setDataFim_field] = useState("");
    const [vinicolaField, setVinicola_field] = useState("");

    const [contractId, setId] = useState(String);

    const local = useLocation();

    useEffect(() => {
        if (local.state.isEdit) {
            setId(local.state.contractId);
        }
    }, [local]);


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
        setTelefone(value);
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
    const makeEdit = async () => {
        if (contractId === null || contractId === undefined) {
            setSuccess(null);
            return;
        }
        await apiAdmin.put("/contract/" + contractId, {
            contratante,
            cpf_cnpj,
            endereco,
            telefone,
            status,
            dataInicio,
            dataFim,
            vinicola
        },
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                setError("");
                setSuccess("success");
                setId(null);
                local.state = null;
            }).catch((error) => {
                setError("error");
                setSuccess("");
            });
    };

    return (
        <div className="main-event">
            {success === "success" ?
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! Você alterou o contrato com sucesso!
                </Alert> : null}
            {
                error === "error" ?
                    <Alert status="error" variant="solid">
                        <AlertIcon />
                    Ops! Ocorreu algum erro :(
                </Alert> : null}
            <Box className="box-system" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Editar Contrato
                    </Heading>
                </div>
                <div>
                    <FormControl className="fieldContratante" isRequired>
                        <FormLabel htmlFor="contratante">Contratante: </FormLabel>
                        <Input isInvalid={contratanteField} id="contratante" placeholder="Contratante" onChange={(e) => { handleValidationContrante(e); }} />
                    </FormControl>

                    <FormControl className="fieldCpfCnpj" isRequired>
                        <FormLabel htmlFor="cpfcnpj">CPF/CNPJ: </FormLabel>
                        <Input isInvalid={cpf_cnpjField} id="cpfcnpj" placeholder="CPFCNPJ" onChange={(e) => { handleValidationCpfCnpj(e); }} />
                    </FormControl>

                    <FormControl className="endereco" isRequired>
                        <FormLabel htmlFor="endereco">Endereço: </FormLabel>
                        <Input isInvalid={enderecoField} id="endereco" placeholder="Endereco" onChange={(e) => { handleValidationEndereco(e); }} />
                    </FormControl>

                    <FormControl className="telefone" isRequired>
                        <FormLabel htmlFor="telefone">Telefone: </FormLabel>
                        <Input isInvalid={telefoneField} id="telefone" placeholder="Telefone" onChange={(e) => { handleValidationTelefone(e); }} />
                    </FormControl>

                    <FormControl className="status" isRequired>
                        <FormLabel htmlFor="status">Status: </FormLabel>
                        <Input isInvalid={statusField} id="status" placeholder="Status" onChange={(e) => { handleValidationStatus(e); }} />
                    </FormControl>

                    <FormControl className="datainicio" isRequired>
                        <FormLabel htmlFor="datainicio">Data Início: </FormLabel>
                        <Input isInvalid={dataInicioField} id="datainicio" placeholder="DataInicio" onChange={(e) => { handleValidationDataInicio(e); }} />
                    </FormControl>

                    <FormControl className="datafim" isRequired>
                        <FormLabel htmlFor="datafim">Data Fim: </FormLabel>
                        <Input isInvalid={dataFimField} id="datafim" placeholder="Datafim" onChange={(e) => { handleValidationDataFim(e); }} />
                    </FormControl>

                    <FormControl className="vinicola" isRequired>
                        <FormLabel htmlFor="vinicola">Vinícola: </FormLabel>
                        <Input isInvalid={vinicolaField} id="vinicola" placeholder="Vinicola" onChange={(e) => { handleValidationVinicola(e); }} />
                    </FormControl>

                </div>
                <div className="button-box">
                    <Button className="button-register" variantColor="primary" size="md" w="25%" onClick={() => makeEdit()}>Atualizar</Button>
                </div>
            </Box>
        </div >
    );
}

export default EditContract;
