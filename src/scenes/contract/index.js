import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Button, Input, Grid, Divider, Text } from "@chakra-ui/core";
import "./style.css";

function Contratos() {
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
    return (
        <div className="main">
            <Box className="p-5" bg="#FFFFFF" rounded="md" h="35.48125em">
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
                <Grid  className="column-atrib" templateColumns="repeat(4, 1fr)">
                    <Text fontSize="1em" color="gray">{people[0].contrato}</Text>
                    <Text fontSize="1em" color="gray">{ people[0].contratante }</Text>
                    <Text fontSize="1em" color="gray">{people[0].data}</Text>
                    <Grid templateColumns="repeat(2, 1fr)">

                    </Grid>
                </Grid>
                <Divider borderColor="#C4C4C4"/>

            </Box >
        </div >
    );
}

export default Contratos;