import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import api from "../../services/api";
import "./style.css";
import DataTable from "react-data-table-component";
import {Button, Grid, Input} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListWinerys() {
  const [data, setData] = useState([]);
  const [filtereData, setFiltereData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/winery");
};
  
  let winerys = [];

  const getWinerys = async () => {
    await api.get("/winery",
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        winerys = res.data.filter((element) => typeof element.name === "string");
        setData(winerys);
        setFiltereData(winerys);
      }).catch((error) => {
      });
  };

  const search = (event) => {
    event.preventDefault();
    const { value } = event.target;

    if (value !== ""){
      let filteredF = data.filter((element) => (element.name.toUpperCase().includes(value.toUpperCase())) 
                                || (element.active && "FUNCIONANDO".includes(value.toUpperCase()))
                                || (!element.active && "DESATIVADA".includes(value.toUpperCase())));
      setFiltereData(filteredF);
    }else{
      setFiltereData(data);
    }
  };

  const changeStatus = async (id) => {
    await api.patch("/winery/" + id,
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        getWinerys();
      }).catch((error) => {
        getWinerys();
      });
  };

  useEffect(() => {
    getWinerys();
  });


  const columns = [
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => row.active === false ? <span>Desativada</span> : <span>Funcionando</span>,
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
          <Button className="button-newWinery" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVA VINÍCOLA</Button>
          <Input className="input-newWinery" placeholder="Pesquisar" w="65%" borderColor="#919FA7" onChange={(e) => search(e)}/>
        </Grid>
      <div className="winerys">
        <DataTable
          columns={columns}
          data={filtereData}
          defaultSortField="name"
          pagination={true}
        />
      </div>
    </div>
  );
}

export default ListWinerys;