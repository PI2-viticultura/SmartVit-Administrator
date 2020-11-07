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
    const [cpf_cnpjField, setCnpjCpfField] = useState("");
    const [enderecoField, setEnderecoField] = useState("");
    const [telefoneField, setTelefoneField] = useState("");
    const [statusField, setStatusField] = useState("");
    const [dataInicioField, setDataInicioField] = useState("");
    const [dataFimField, setDataFimField] = useState("");
    const [vinicolaField, setVinicolaField] = useState("");

    const [contractId, setId] = useState(String);

    const local = useLocation();

    useEffect(() => {
        if (local.state.isEdit) {
            setId(local.state.contractId);
        }
    }, [local]);


    const handleValidationContratante = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexContratante = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setContratanteField(true);
            setContratante(null);
            return;
        }

        if (!regexContratante.exec(value)) {
            setContratanteField(true);
            setContratante(null);
            return;
        }

        setContratanteField(false);
        setContratante(value);
    };
    const handleValidationCpfCnpj = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexCpfcnpj = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setCnpjCpf(true);
            setCnpjCpfField(null);
            return;
        }

        if (!regexCpfcnpj.exec(value)) {
            setCnpjCpfField(true);
            setCnpjCpf(null);
            return;
        }

        setCnpjCpf(false);
        setCnpjCpf(retirarMask(value));
    };
    const handleValidationEndereco = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexEndereco = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setEndereco(true);
            setEnderecoField(null);
            return;
        }

        if (!regexEndereco.exec(value)) {
            setEnderecoField(true);
            setEndereco(null);
            return;
        }

        setEndereco(false);
        setEndereco(retirarMask(value));
    };

    const handleValidationTelefone = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexTelefone = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setTelefone(true);
            setTelefoneField(null);
            return;
        }

        if (!regexTelefone.exec(value)) {
            setTelefoneField(true);
            setTelefone(null);
            return;
        }

        setTelefone(false);
        setTelefone(retirarMask(value));
    };
    const handleValidationStatus = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexStatus = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setStatus(true);
            setStatusField(null);
            return;
        }

        if (!regexStatus.exec(value)) {
            setStatusField(true);
            setStatus(null);
            return;
        }

        setStatus(false);
        setStatus(retirarMask(value));
    };
    const handleValidationDataInicio = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexDatainicio = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setDataInicio(true);
            setDataInicioField(null);
            return;
        }

        if (!regexDatainicio.exec(value)) {
            setDataInicioField(true);
            setDataInicio(null);
            return;
        }

        setDataInicio(false);
        setDataInicio(retirarMask(value));
    };
    const handleValidationDataFim = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexDatafim = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setDataFim(true);
            setDataFimField(null);
            return;
        }

        if (!regexDatafim.exec(value)) {
            setDataFimField(true);
            setDataFim(null);
            return;
        }

        setDataFim(false);
        setDataFim(retirarMask(value));
    };
    const handleValidationVinicola = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexVinicola = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setVinicola(true);
            setVinicolaField(null);
            return;
        }

        if (!regexVinicola.exec(value)) {
            setVinicolaField(true);
            setVinicola(null);
            return;
        }

        setVinicola(false);
        setVinicola(retirarMask(value));
    };
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
                        <Input isInvalid={contratanteField} id="contratante" placeholder="Contratante" onChange={(e) => { handleValidationContratante(e); }} />
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
