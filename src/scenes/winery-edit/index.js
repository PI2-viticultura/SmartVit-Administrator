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

function EditWinery() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [nameField, setNameField] = useState("");
    const [addressField, setAddressField] = useState("");

    const [wineryId, setId] = useState(String);

    const local = useLocation();

    useEffect(() => {
        if (local.state.isEdit) {
            setId(local.state.wineryId);
        }
    }, [local]);


    const handleValidationName = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let regexName = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setNameField(true);
            setName(null);
            return;
        }

        if (!regexName.exec(value)) {
            setNameField(true);
            setName(null);
            return;
        }

        setNameField(false);
        setName(value);
    };
    const handleValidationAddress = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const regexAddress = new RegExp(/^[a-z ,.'-]+$/i);

        if (value.trim() === "") {
            setAddressField(true);
            setAddress(null);
            return;
        }

        if (!regexAddress.exec(value)) {
            setAddressField(true);
            setAddress(null);
            return;
        }

        setAddressField(false);
        setAddress(retirarMask(value));
    };
    const makeEdit = async () => {
        if (wineryId === null || wineryId === undefined) {
            setSuccess(null);
            return;
        }
        await apiWinery.put("/winery/" + wineryId, {
            name,
            address
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
                    Parabéns! Você alterou a vinícola com sucesso!
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
                        Editar Vinícola
                    </Heading>
                </div>
                <div>
                    <FormControl className="fieldName" isRequired>
                        <FormLabel htmlFor="name">Nome: </FormLabel>
                        <Input isInvalid={nameField} id="name" placeholder="Nome" onChange={(e) => { handleValidationName(e); }} />
                    </FormControl>

                    <FormControl className="fieldAddress" isRequired>
                        <FormLabel htmlFor="address">Endereço: </FormLabel>
                        <Input isInvalid={addressField} id="address" placeholder="Endereço" onChange={(e) => { handleValidationAddress(e); }} />
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button className="button-new" variantColor="primary" size="md" w="25%" onClick={() => makeEdit()}>Atualizar</Button>
                </div>
            </Box>
        </div >
    );
}

export default EditWinery;
