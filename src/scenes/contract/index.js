import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import { Box, Button, Input, Grid, Divider} from "@chakra-ui/core";
import "./style.css";
import apiAdmin from "../../services/api-admin";
import DataTable from "react-data-table-component";


function Contratos() {
    const [data, setData] = useState([]);
    const history = useHistory();
    let contracts = [];


    const makeGetContract = async () => {
        await apiAdmin.get("/contracts",
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            contracts = res.data.filter((element) => typeof element.contractor === "string");
            setData(contracts);
        }).catch((error) => {
        });
    };

    const changeStatus = async (contract_id) => {
        await apiAdmin.patch("/contract/" + contract_id,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            makeGetContract();
        }).catch((error) => {
        });
    };

    useEffect(() => {
        let contracts_list = [];

        const getContract = async () => {
            await apiAdmin.get("/contracts",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                contracts_list = res.data.filter((element) => typeof element.contractor === "string");
                setData(contracts_list);
            }).catch((error) => {
            });
        };
        getContract();
    }, []);

    const pushToRegister = () => {
        history.push({
            pathname: "/register"
        });
    };

    const columns = [
    {
      name: "Contratante",
      sortable: true,
      selector: "contractor",
    },
    {
      name: "Data",
      sortable: true,
      selector: "initialDate",
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
                <Grid className="grid-header" gap={6}>
                    <Button className="button-newContract" size="md" w="40%" onClick={() => pushToRegister()}>NOVO CONTRATO</Button>
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
