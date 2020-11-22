import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Alert,
    AlertIcon,
    Box,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    Select
} from "@chakra-ui/core";

import apiAdmin from "../../services/api-admin";
import "./style.css";


function RegisterPartner() {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [tipo, setTipo] = useState("Engenheiro Agrônomo");
    // eslint-disable-next-line
    const [error, setError] = useState("");
    // eslint-disable-next-line
    const [success, setSuccess] = useState("");
    const history = useHistory();
    const types = [{value: "Engenheiro Agrônomo", name: "Engenheiro Agrônomo"},
                   {value: "Agrônomo", name: "Agrônomo"}, 
                   {value: "Técnico Agrícola", name: "Técnico Agrícola"},
                   {value: "Engenheiro Florestal", name: "Engenheiro Florestal"}
                  ];

    const makeRegister = async () => {
        await apiAdmin.post("/partner", {
            name: nome, 
            address: endereco,
            phoneNumber: telefone,
            type: tipo
        },
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                setError("");
                setSuccess("success");
                history.push({
                    pathname: "/partner"
                });
            }).catch((error) => {
                setError("error");
                setSuccess("");
            });
    };

    const pushToReturn = () => {
        history.push({
            pathname: "/partner"
        });
    };

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
            <Box className="p-5" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar Parceiro
                    </Heading>
                </div>
                <div>
                    <Grid templateColumns="repeat(1, 1fr)">
                        <FormControl className="field_nome" isRequired>
                            <FormLabel htmlFor="nome">Nome</FormLabel>
                            <Input name="nome" placeholder="Nome do parceiro" onChange={(e) => {  setNome(e.target.value); }} />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="address" isRequired>
                            <FormLabel htmlFor="address">Endereço</FormLabel>
                            <Input id="address" placeholder="R. 12 de Outubro, Renato Gonçakes" onChange={(e) => { setEndereco(e.target.value); }} />
                        </FormControl>
                        <FormControl className="field-telefone" isRequired>
                            <FormLabel htmlFor="telefone">Telefone</FormLabel>
                            <Input id="telefone" type="tel" placeholder="Telefone" onChange={(e) => { setTelefone(e.target.value); }} />
                        </FormControl>
                    </Grid>
                    <Grid>

                        <FormControl className="field-tipo" isRequired>
                            <FormLabel htmlFor="tipo">Especialidade</FormLabel>
                            <Select id="tipo" onChange={(e) => { setTipo(e.target.value); }}>
                                {
                                    types.map((type) => <option key={type.name} value={type.value}>{type.name}</option>)
                                }
                            </Select>
                       </FormControl>
                    </Grid>
                </div>
                <div className="button-box">
                    <button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => pushToReturn()}>VOLTAR</button>
                    <button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => makeRegister()}>CADASTRAR</button>
                </div>
            </Box>
        </div>
    );
}

export default RegisterPartner;
