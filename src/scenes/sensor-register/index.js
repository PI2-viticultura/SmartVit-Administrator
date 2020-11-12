import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

function RegisterSensor(){
    const [identifier, setIdentifier] = useState("");
    const [type, setType] = useState("");
    const [systemId, setSystemId] = useState("");
    const [systems, setSystems] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const makeRequest = async () => {
        await apiWinery.post("/sensor", {
            identifier,
            type,
            system_id: systemId
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setError("");
            setSuccess("success");
            setIdentifier("");
            setType("");
            setSystemId("");
        }).catch((error) => {
            setError("error");
            setSuccess("");
        });
    };

    React.useEffect(() => {
        let systemList = [];

        const getSystem = async () => {
            await apiWinery.get("/system",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                systemList = res.data.filter((element) => typeof element.name === "string");
                setSystems(systemList);
            }).catch((error) => {
            });
        };
        getSystem();
    }, []);

    return (
        <div className="main">
            {success === "success" &&
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! O cadastro do sensor foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar sensor
                </Alert>
            }
            <Box className="p-5" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar sensor
                    </Heading>
                </div>
                <FormControl isRequired>
                    <FormLabel htmlFor="identificador">Identificador:</FormLabel>
                    <Input id="identificador" placeholder="Identificador" onChange={(e) => {setIdentifier(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="tipo">Tipo:</FormLabel>
                    <Input id="tipo" placeholder="Tipo" onChange={(e) => {setType(e.target.value);}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="winery">Sistema</FormLabel>
                    <Select id="system" onChange={(e) => { setSystemId(e.target.value); console.log(e.target.value) }}>
                        {
                            systems.map((system) => <option key={system._id.$oid} value={system._id.$oid}>{system.name}</option>)
                        }
                    </Select>
                </FormControl>
                <div className="buttonArea">
                    <button className="buttonCadastrarVinicola" onClick={() => makeRequest()}>CADASTRAR SENSOR</button>
                </div>
            </Box>
        </div>
    );
}

export default RegisterSensor;