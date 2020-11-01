import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import { Box, Button, Input, Grid, Divider} from "@chakra-ui/core";
import "./style.css";
import apiAdmin from "../../services/api-admin";
import DataTable from "react-data-table-component";


function Contratos() {
    const [data, setData] = useState([]);
    let contracts = [];
    const history = useHistory();


    const makeGetContract = async () => {
        await apiAdmin.get("/contracts",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                contracts = res.data.filter((element) => typeof element.contratante === "string");
                setData(contracts);
            }).catch((error) => {
            });
    };

    const changeStatus = async (contract_id) => {
        await this.api.patch("/contract/" + contract_id,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            makeGetContract();
        }).catch((error) => {
        });
    };

    useEffect(() => {
      makeGetContract();
    });

    const pushToRegister = () => {
        history.push({
            pathname: "/register"
        });
    };

    const columns = [
    {
      name: "Contrato",
      selector: "contrato",
      sortable: true,
    },
    {
      name: "Contratante",
      sortable: true,
      selector: "contratante",
    },
    {
      name: "Data",
      sortable: true,
      selector: "data",
    },
    {
      name: "Cancelar Contrato?",
      cell: (row) => row.status === 0 ? <button className="nao-atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      sortable: true,
      selector: "cancel",
    },
  ];

    return (
        <div className="main">
            <Box className="box-contrato" bg="#FFFFFF" rounded="md" h="35.48125em">
                <Grid className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
                    <Button className="button-newContract" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO CONTRATO</Button>
                    <Input className="input-newContract" placeholder="Basic usage" w="65%" borderColor="#919FA7"/>
                </Grid>
            <DataTable
            columns={columns}
            data={data}
            defaultSortField="Contratante"
            pagination={true}
            />
            <Divider borderColor="#C4C4C4"/>
            </Box >
        </div >
    );
}

export default Contratos;
