import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiSupport from "../../services/api-support";
import "./style.css";
import DataTable from "react-data-table-component";
import {Box, Input} from "@chakra-ui/core";

function ListSupport() {
  const [data, setData] = useState([]);


  useEffect(() => {
    let support = [];
    const getSupport = async () => {
      await apiSupport.get("/support",
        {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          support = res.data;
          console.log(support)
          setData(support);
        }).catch((error) => {
        });
    };
    getSupport();
  }, []);


  const columns = [
    {
      name: "Problema",
      selector: "problem",
      sortable: true,
    },
    {
      name: "Descrição",
      sortable: true,
      selector: "description",
    },
    {
      name: "Prioridade",
      sortable: true,
      selector: "priority",
    },
    {
      name: "Ação",
      cell: (row) => row.active === false ? <button className="nao-atendido" onClick={() => console.log(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => console.log(row._id["$oid"])}> <FaCheck/></button>,
      sortable: true,
      selector: "id",
      
    },
  ];

  return (
    <div className="main">
      <Box className="p-5" bg="#FFFFFF" rounded="md">
        <div className="grid-header" gap={6}>
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

export default ListSupport;
