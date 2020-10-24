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


function EditSystem() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [status, setStatus] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [latitudeField, setLatitudeField] = useState("");
    const [longitudeField, setLongitudeField] = useState("");
    const [statusField, setStatusField] = useState("");

    const [systemId, setId] = useState(String);

    const local = useLocation();

    useEffect(() => {
        if (local.state.isEdit) {
            setId(local.state.systemId);
        }
    }, [local]);


    const handleValidationLatitude = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexLatitude = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setLatitudeField(true);
            setLatitude(null);
            return;
        }

        if (!regexLatitude.exec(value)) {
            setLatitudeField(true);
            setLatitude(null);
            return;
        }

        setLatitudeField(false);
        setLatitude(value);
    };
    const handleValidationLongitude = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexLongitude = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setLongitudeField(true);
            setLongitude(null);
            return;
        }

        if (!regexLongitude.exec(value)) {
            setLongitudeField(true);
            setLongitude(null);
            return;
        }

        setLongitudeField(false);
        setLongitude(retirarMask(value));
    };
    const handleValidationStatus = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexStatus = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setStatusField(true);
            setStatus(null);
            return;
        }

        if (!regexStatus.exec(value)) {
            setStatusField(true);
            setStatus(null);
            return;
        }

        setStatusField(false);
        setStatus(value);
    };

    const makeEdit = async () => {
        if (systemId === null || systemId === undefined) {
            setSuccess(null);
            return;
        }
        await apiWinery.put("/winery/" + systemId, {
            latitude,
            longitude,
            status
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
                    Parabéns! Você alterou o sistema com sucesso!
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
                        Editar Sistema
                    </Heading>
                </div>
                <div>
                    <FormControl className="fieldLatitude" isRequired>
                        <FormLabel htmlFor="latitude">Latitude: </FormLabel>
                        <Input isInvalid={latitudeField} id="latitude" placeholder="Latitude" onChange={(e) => { handleValidationLatitude(e); }} />
                    </FormControl>

                    <FormControl className="fieldLongitude" isRequired>
                        <FormLabel htmlFor="longitude">Longitude: </FormLabel>
                        <Input isInvalid={longitudeField} id="longitude" placeholder="Longitude" onChange={(e) => { handleValidationLongitude(e); }} />
                    </FormControl>

                    <FormControl className="fieldStatus" isRequired>
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Input isInvalid={statusField} id="status" placeholder="Status" onChange={(e) => { handleValidationStatus(e); }} />
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button className="button-register" variantColor="primary" size="md" w="25%" onClick={() => makeEdit()}>Atualizar</Button>
                </div>
            </Box>
        </div >
    );
}

export default EditSystem;
