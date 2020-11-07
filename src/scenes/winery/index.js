import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Heading,
    Button,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/core";
import apiWinery from "../../services/api-winery";
import "../../globals/globalStyle.css";

function Winery(){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contract_id, setContractId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const makeRequest = async () => {
        await apiWinery.post("/winery", {
            name,
            address,
            contract_id
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setError("");
            setSuccess("success");
            setName("");
            setAddress("");
            setContractId("");
        }).catch((error) => {
            setError("error");
            setSuccess("");
        });
    };

    return (
        <div className="main">
            {success === "success" &&
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! Seu cadastro de vinícola foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar vinícola
                </Alert>
            }
            <Box className="p-5" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar vinícola
                    </Heading>
                </div>
                <FormControl isRequired>
                    <FormLabel htmlFor="status">Nome:</FormLabel>
                    <Input id="nome" placeholder="Nome" onChange={(e) => {setName(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="status">Endereço:</FormLabel>
                    <Input id="Endereco" placeholder="Endereço" onChange={(e) => {setAddress(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="status">ID do Contrato:</FormLabel>
                    <Input id="contract" placeholder="ID do Contrato" onChange={(e) => {setContractId(e.target.value);}} />
                </FormControl>
                <div className="button-box">
                    <Button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => makeRequest()}>CADASTRAR VINÍCOLA</Button>
                </div>
            </Box>
        </div>
    );
}

export default Winery;
