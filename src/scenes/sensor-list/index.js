import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import "./style.css";
import DataTable from "react-data-table-component";
import {Box, Input} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListSensors() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/sensor-register");
};

  let sensors = [];

  const getSensors = async () => {
    await apiWinery.get("/winery",
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        sensors = res.data.filter((element) => typeof element.name === "string");
        setData(sensors);
      }).catch((error) => {
      });
  };

  const changeStatus = async (id) => {
    await apiWinery.patch("/winery/" + id,
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        getSensors();
      }).catch((error) => {
        getSensors();
      });
  };

  useEffect(() => {
    getSensors();
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
      sortable: true,
      selector: "active",
    },
    {
      name: "Ação",
      cell: (row) => row.active === false ? <button className="nao-atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      sortable: true,
      selector: "id",
      
    },
  ];

  return (
    <div className="main">
      <Box className="p-5" bg="#FFFFFF" rounded="md">
        <div className="grid-header" gap={6}>
          <button className="button-new" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO SENSOR</button>
          <Input className="input-new" placeholder="Pesquisar" w="65%" borderColor="#919FA7"/>
        </div>
        <div className="sensors">
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

export default ListSensors;
