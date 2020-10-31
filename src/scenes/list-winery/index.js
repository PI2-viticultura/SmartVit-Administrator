import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import "./style.css";
import DataTable from "react-data-table-component";
import {Button, Input, Box} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListWinerys() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/winery");
  };
  
  let winerys = [];

  const getWinerys = async () => {
    await apiWinery.get("/winery",
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        winerys = res.data.filter((element) => typeof element.name === "string");
        setData(winerys);
      }).catch((error) => {
      });
  };

  const changeStatus = async (id) => {
    await apiWinery.patch("/winery/" + id,
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
    let winery_list = [];

    const startWinerys = async () => {
      await apiWinery.get("/winery",
        {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          winery_list = res.data.filter((element) => typeof element.name === "string");
          setData(winery_list);
        }).catch((error) => {
        });
    };
    startWinerys();
  }, []);


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
      <Box className="p-5" bg="#FFFFFF" rounded="md">
        <div className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
          <Button className="button-new" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVA VINÍCOLA</Button>
          <Input className="input-newWinery" placeholder="Basic usage" w="65%" borderColor="#919FA7"/>
        </div>
        <div className="winerys">
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

export default ListWinerys;