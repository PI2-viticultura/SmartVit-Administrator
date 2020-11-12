import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import "./style.css";
import * as GoIcons from "react-icons/go";
import {IconContext} from "react-icons";
import DataTable from "react-data-table-component";
import {Button, Input, Box, Text} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListWinerys() {
  const [data, setData] = useState([]);
  const [filtereData, setFiltereData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/winery");
  };  
  let winerys = [];

  const pushToEdit = (id) => {
    history.push({
        pathname: "/winery-edit",
        state: { isEdit: true}
    });
  };

  const getWinerys = async () => {
    await apiWinery.get("/winery",
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
    let wineryList = [];

    const startWinerys = async () => {
      await apiWinery.get("/winery",
        {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          wineryList = res.data.filter((element) => typeof element.name === "string");
          setData(wineryList);
          setFiltereData(wineryList);
        }).catch((error) => {
        });
    };
    startWinerys();
  }, []);

  const columns = [
    {
      name: <Text fontSize="md"> Editar</Text>,
      selector: "id",
      cell: (row) => <IconContext.Provider value={{className: "react-icons"}}>
       <GoIcons.GoPencil onClick={pushToEdit}/>
        </IconContext.Provider>
    },
    {
      name: <Text fontSize="md"> Nome</Text>,
      selector: "name",
      sortable: true,
    },
    {
      name: <Text fontSize="md"> Status</Text>,
      cell: (row) => row.active === false ? <span>Desativada</span> : <span>Funcionando</span>,
      selector: "active",
      sortable: true,
    },
    {
      name: <Text fontSize="md"> Ação</Text>,
      cell: (row) => row.active === false ? <button className="nao-atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      selector: "id",
      sortable: true,
    },
  ];

  return (
    <div className="main">
      <Box className="p-5" bg="#FFFFFF" rounded="md">
        <div className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
          <button className="button-new" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVA VINÍCOLA</button>
          <Input className="input-new" placeholder="Pesquisar" w="65%" borderColor="#919FA7" onChange={(e) => search(e)}/>
        </div>
        <div className="winerys">
          <DataTable
            columns={columns}
            data={filtereData}
            defaultSortField="name"
            pagination={true}
          />
        </div>
      </Box>
    </div>
  );
}

export default ListWinerys;