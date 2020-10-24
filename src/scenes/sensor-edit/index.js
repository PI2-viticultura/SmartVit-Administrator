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

import apiWinery from "../../services/api-winery";
import retirarMask from "../../utils/masks";
import "./style.css";


function EditSensor() {
    const [location, setLocation] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [type, setType] = useState("");
    const [situation, setSituation] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [locationField, setLocationField] = useState("");
    const [identifierField, setIdentifierField] = useState("");
    const [typeField, setTypeField] = useState("");
    const [situationField, setSituationField] = useState("");

    const [sensorId, setId] = useState(String);

    const local = useLocation();

    useEffect(() => {
        if (local.state.isEdit) {
            setId(local.state.sensorId);
        }
    }, [local]);


    const handleValidationLocation = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexLocation = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setLocationField(true);
            setLocation(null);
            return;
        }

        if (!regexLocation.exec(value)) {
            setLocationField(true);
            setLocation(null);
            return;
        }

        setLocationField(false);
        setLocation(value);
    };
    const handleValidationIdentifier = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexIdentifier = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setIdentifierField(true);
            setIdentifier(null);
            return;
        }

        if (!regexIdentifier.exec(value)) {
            setIdentifierField(true);
            setIdentifier(null);
            return;
        }

        setIdentifierField(false);
        setIdentifier(retirarMask(value));
    };
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
    };
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
    };

    const makeEdit = async () => {
        if (sensorId === null || sensorId === undefined) {
            setSuccess(null);
            return;
        }
        await apiWinery.put("/winery/" + sensorId, {
            location,
            identifier,
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
                    Parabéns! Você alterou o sensor com sucesso!
                </Alert> : null}
            {
                error === "error" ?
                    <Alert status="error" variant="solid">
                        <AlertIcon />
                    Ops! Ocorreu algum erro :(
                </Alert> : null}
            <Box className="box-sensor" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Editar Sensor
                    </Heading>
                </div>
                <div>
                    <FormControl className="fieldLocation" isRequired>
                        <FormLabel htmlFor="location">Localização: </FormLabel>
                        <Input isInvalid={locationField} id="location" placeholder="Localização" onChange={(e) => { handleValidationLocation(e); }} />
                    </FormControl>

                    <FormControl className="fieldIdentifier" isRequired>
                        <FormLabel htmlFor="identifier">Identificador: </FormLabel>
                        <Input isInvalid={identifierField} id="identifier" placeholder="Identificador" onChange={(e) => { handleValidationIdentifier(e); }} />
                    </FormControl>

                    <FormControl className="fieldSituation" isRequired>
                        <FormLabel htmlFor="situation">Situação</FormLabel>
                        <Input isInvalid={situationField} id="situation" placeholder="Situação" onChange={(e) => { handleValidationSituation(e); }} />
                    </FormControl>
                    
                    <FormControl className="fieldType" isRequired>
                        <FormLabel htmlFor="type">Tipo</FormLabel>
                        <Input isInvalid={typeField} id="type" placeholder="Tipo" onChange={(e) => { handleValidationType(e); }} />
                    </FormControl>
                    
                </div>
                <div className="button-box">
                    <Button className="button-register" variantColor="primary" size="md" w="25%" onClick={() => makeEdit()}>Atualizar</Button>
                </div>
            </Box>
        </div >
    );
}


export default EditSensor;
