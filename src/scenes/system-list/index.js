import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import "./style.css";
import DataTable from "react-data-table-component";
import {Box, Input} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListSystems() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/system-register");
};
  
  let systems = [];

  const getSystems = async () => {
    await apiWinery.get("/system",
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        systems = res.data.filter((element) => typeof element.name === "string");
        setData(systems);
      }).catch((error) => {
      });
  };

  const changeStatus = async (id) => {
    await apiWinery.patch("/system/" + id,
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        getSystems();
      }).catch((error) => {
        getSystems();
      });
  };

  useEffect(() => {
    getSystems();
  });


  const columns = [
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => row.active === false ? <span>Desativado</span> : <span>Ativado</span>,
      selector: "active",
      sortable: true,
    },
    {
      name: "Ação",
      cell: (row) => row.active === false ? <button className="naoAtendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="Atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      sortable: true,
      selector: "id",
    },
  ];

  const header = () => {
    return (
      <div className="grid-header" gap={6}>
        <button className="button-new" onClick={() => pushToRegister()}>NOVO SISTEMA</button>
        <Input className="input-new" placeholder="Pesquisar" w="65%" borderColor="#919FA7"/>
      </div>
    );
  };

  return (
    <div className="main">
      <Box className="p-5" bg="#FFFFFF" rounded="md">
        {header()}
        <div className="systems">
          <DataTable
            columns={columns}
            data={data}
            defaultSortField="name"
            pagination={true}
          />
        </div>
      </Box>
    </div>
  );
}

export default ListSystems;
