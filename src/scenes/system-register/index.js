import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
    FormControl,
    Select,
    FormLabel,
    Box,
    Heading,
    Input
} from "@chakra-ui/core";
import apiWinery from "../../services/api-winery";
import "../../globals/globalStyle.css";

function RegisterSystem(){
    const [latitude, setLatitude] = useState("");
    const [name, setName] = useState("");
    const [longitude, setLongitude] = useState("");
    const [status, setStatus] = useState("");
    const [wineryId, setWineryId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [winery, setWinery] = useState([]);

    const makeRequest = async () => {
        await apiWinery.post("/system", {
            name,
            latitude,
            longitude,
            status,
            winery_id: wineryId // eslint-disable-next-line camelcase
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setError("");
            setSuccess("success");
            setLatitude("");
            setLongitude("");
            setStatus("");
            setWineryId("");
        }).catch((error) => {
            setError("error");
            setSuccess("");
        });
    };

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

    return (
        <div className="main">
            {success === "success" &&
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! O cadastro do sistema foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar sistema
                </Alert>
            }
            <Box className="p-5" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar sistema
                    </Heading>
                </div>
                <FormControl isRequired>
                    <FormLabel htmlFor="name">Name:</FormLabel>
                    <Input id="name" placeholder="Name" onChange={(e) => {setName(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="latitude">Latitude:</FormLabel>
                    <Input id="latitude" type="number" placeholder="Latitude" onChange={(e) => {setLatitude(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="longitude">Longitude:</FormLabel>
                    <Input id="longitude" type="number" placeholder="Longitude" onChange={(e) => {setLongitude(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="winery">Status</FormLabel>
                    <Select id="status" onChange={(e) => { setStatus(e.target.value); }}>
                        <option value="ativo">Ativo</option>
                        <option value="ativo">Desativo</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="winery">Vinícola</FormLabel>
                    <Select id="winery" onChange={(e) => { setWineryId(e.target.value); }}>
                        {
                            winery.map((win) => <option key={win._id.$oid} value={win._id.$oid}>{win.name}</option>)
                        }
                    </Select>
                </FormControl>
                <div className="buttonArea">
                    <button className="buttonCadastrarVinicola" onClick={() => makeRequest()}>CADASTRAR SISTEMA</button>
                </div>
            </Box>
        </div>
    );
}

export default RegisterSystem;
