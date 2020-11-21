import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Heading,
    Button,
    FormControl,
    Select,
    FormLabel,
    Input
} from "@chakra-ui/core";
import apiWinery from "../../services/api-winery";
import apiAdmin from "../../services/api-admin";
import "../../globals/globalStyle.css";

function Winery(){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contract_id, setContractId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [contracts, setContracts] = useState([]);

    const makeRequest = async () => {
        await apiWinery.post("/winery", {
            name,
            address,
            // eslint-disable-next-line camelcase
            contract_id: contractId 
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

    React.useEffect(() => {
        let contractsList = [];

        const getContract = async () => {
            await apiAdmin.get("/contracts",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                contractsList = res.data.filter((element) => typeof element.contractor === "string");
                setContracts(contractsList);
            }).catch((error) => {
            });
        };
        getContract();
    }, []);

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
                    <FormLabel htmlFor="contract">Contrato</FormLabel>
                    <Select id="contract" onChange={(e) => { setContractId(e.target.value); }}>
                        {
                            contracts.map((contract) => <option value={contract._id.$oid}>{contract.contractor}</option>)
                        }
                    </Select>
                </FormControl>
                <div className="button-box">
                    <Button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => makeRequest()}>CADASTRAR VINÍCOLA</Button>
                </div>
            </Box>
        </div>
    );
}

export default Winery;
