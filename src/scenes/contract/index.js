import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import * as GoIcons from "react-icons/go";
import {IconContext} from "react-icons";
import { Box, Input, Text } from "@chakra-ui/core";
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

    const changeStatus = async (contractId) => {
        await apiAdmin.patch("/contract/" + contractId,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            makeGetContract();
        }).catch((error) => {
        });
    };

    useEffect(() => {
        let contractsList = [];

        const getContract = async () => {
            await apiAdmin.get("/contracts",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                contractsList = res.data.filter((element) => typeof element.contractor === "string");
                setData(contractsList);
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

    const pushToEdit = (id) => {
      history.push({
          pathname: "/contract-edit",
          state: { isEdit: true}
      });
    };

    const columns = [
    {
      name: <Text fontSize="md"> Editar</Text>,
      selector: "id",
      cell: (row) => <IconContext.Provider value={{className: "react-icons"}}>
      <GoIcons.GoPencil onClick={pushToEdit}/>
      </IconContext.Provider>
    },
    {
      name: <Text fontSize="md"> Contratante</Text>,
      sortable: true,
      selector: "contractor",
    },
    {
      name: <Text fontSize="md"> Data</Text>,
      sortable: true,
      selector: "initialDate",
    },
    {
      name: <Text fontSize="md"> Cancelar Contrato?</Text>,
      cell: (row) => row.status === 0 ? <button className="nao-atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      sortable: true,
      selector: "cancel",
    },
  ];

    return (
        <div className="main">
            <Box className="p-5" bg="#FFFFFF" rounded="md">
                <div className="grid-header" gap={6}>
                    <button className="button-new" size="md" w="30%" onClick={() => pushToRegister()}>NOVO CONTRATO</button>
                    <Input className="input-new" placeholder="Pesquisar" w="65%" borderColor="#919FA7"/>                   
                </div>

                <DataTable
                    columns={columns}
                    data={data}
                    defaultSortField="Contratante"
                    pagination={true}
                />
            </Box >
        </div >
    );
}

export default Contratos;
