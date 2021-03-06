import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiWinery from "../../services/api-winery";
import * as GoIcons from "react-icons/go";
import {IconContext} from "react-icons";
import "./style.css";
import DataTable from "react-data-table-component";
import {Text, Box, Input} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function ListSensors() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const pushToRegister = async () => {
    history.push("/sensor-register");
};

  let sensors = [];

  const pushToEdit = (id) => {
    history.push({
        pathname: "/sensor-edit",
        state: { isEdit: true}
    });
  };

  const getSensors = async () => {
    await apiWinery.get("/sensor",
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        sensors = res.data.filter((element) => typeof element.identifier === "string");
        setData(sensors);
      }).catch((error) => {
      });
  };

  const changeStatus = async (id) => {
    await apiWinery.patch("/sensor/" + id,
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
      name: <Text fontSize="md"> Editar</Text>,
      selector: "id",
      cell: (row) => <IconContext.Provider value={{className: "react-icons"}}>
       <GoIcons.GoPencil onClick={pushToEdit}/>
        </IconContext.Provider>
    },
    {
      name: "Identificador",
      selector: "identifier",
      sortable: true,
    },
    {
      name: <Text fontSize="md"> Status</Text>,
      cell: (row) => row.active === false ? <span>Desativado</span> : <span>Ativado</span>,
      sortable: true,
      selector: "active",
    },
    {
      name: <Text fontSize="md"> Ação</Text>,
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
