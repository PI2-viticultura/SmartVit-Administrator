import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import "./style.css";
import DataTable from "react-data-table-component";
import {Button, Grid, Input} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListSystems() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/system-register");
};
  
  let systems = [];

  const getSystems = async () => {
    await apiWinery.get("/winery",
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
    await apiWinery.patch("/winery/" + id,
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
      name: "Sistema",
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
      cell: (row) => row.active === false ? <button className="naoAtendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="Atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      sortable: true,
      selector: "id",
    },
  ];

  return (
    <div className="main">
        <Grid className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
          <Button className="button-newWinery" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO SISTEMA</Button>
          <Input className="input-newWinery" placeholder="Basic usage" w="65%" borderColor="#919FA7"/>
        </Grid>
      <div className="systems">
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

export default ListSystems;
