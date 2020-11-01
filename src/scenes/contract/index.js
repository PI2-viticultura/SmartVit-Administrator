import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Box, Button, Input, Grid, Divider, Text } from "@chakra-ui/core";
import "./style.css";
import apiAdmin from "../../services/api-admin";

function Contratos() {
    const [contracts, setContracts] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const history = useHistory();
    const pushToRegister = async () => {
        history.push("/register");
    };
    const people = [
        {
            contrato: "Siques",
            contratante: "Eloa",
            data: "11-04-1658"
        }
    ];

    const makeGetContract = async () => {
        await apiAdmin.get("/contracts",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                setContracts(res.data);
                setSuccess("success");
                return res;
            }).catch((error) => {
                setError("error");
                return error;
            });
    };

    const changeStatus = async (contract_id) => {
        await this.api.patch("/contract/" + contract_id,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setSuccess("success");
            makeGetContract();
            return res;
        }).catch((error) => {
            setError("error");
            return error;
        });
    };

    return (
        <div className="main">
            <Box className="box-contrato" bg="#FFFFFF" rounded="md" h="35.48125em">
                <Grid className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
                    <Button className="button-newContract" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO CONTRATO</Button>
                    <Input className="input-newContract" placeholder="Basic usage" w="65%" borderColor="#919FA7"/>
                </Grid>
                <Grid className="column-name" templateColumns="repeat(4, 1fr)">
                    <Text fontSize="1em" color="gray">Contrato</Text>
                    <Text fontSize="1em" color="gray">Contratante</Text>
                    <Text fontSize="1em" color="gray">Data</Text>
                    <Text fontSize="1em" color="gray">Ação</Text>
                </Grid>
                <Divider borderColor="#615B5B" />
                {contracts.map(contract => (
                <div>
                <Grid  className="column-atrib" templateColumns="repeat(4, 1fr)">
                    <Text fontSize="1em" color="gray">{people[0].contrato}</Text>
                    <Text fontSize="1em" color="gray">{people[0].contratante }</Text>
                    <Text fontSize="1em" color="gray">{people[0].data}</Text>
                    <Grid templateColumns="repeat(2, 1fr)">
                    <Button className="btn-del" onClick={() => changeStatus(contract._id.$oid)}> {contract.status == 0 ? 'Ativar' : 'Desativar'}</Button>

                    </Grid>
                </Grid>
                </div>
                ))}
                <Divider borderColor="#C4C4C4"/>

            </Box >
        </div >
    );
}

export default Contratos;