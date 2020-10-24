import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import "./style.css";
import DataTable from "react-data-table-component";
import {Button, Grid, Input} from "@chakra-ui/core";
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
      selector: "active",
      sortable: true,
    },
    {
      name: "Ação",
      cell: (row) => row.active === false ? <button className="nao-atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      selector: "id",
      sortable: true,
    },
  ];

  return (
    <div className="main">
        <Grid className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
          <Button className="button-newWinery" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO SENSOR</Button>
          <Input className="input-newWinery" placeholder="Basic usage" w="65%" borderColor="#919FA7"/>
        </Grid>
      <div className="sensors">
        <DataTable
          columns={columns}
          data={data}
          defaultSortField="name"
          pagination={true}
        />
      </div>
    </div>
  );
}

export default ListSensors;
