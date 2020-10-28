import React, {useEffect, useState} from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import apiAdmin from "../../services/api-admin";
import "./style.css";
import DataTable from "react-data-table-component";
import {Heading, Box} from "@chakra-ui/core";

function ListOrders() {
  const [data, setData] = useState([]);
  let orders = [];

  const getOrders = async () => {
    await apiAdmin.get("/orders",
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          orders = res.data.filter((element) => typeof element.description === "string");
          setData(orders);
        }).catch((error) => {
        });
  };

  useEffect(() => {
    getOrders();
  });

  const changeStatus = async (orderId) => {
    await apiAdmin.patch("/orders/" + orderId,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          getOrders();
        }).catch((error) => {
        });
  };
  
  const columns = [
    {
      name: "Descrição",
      selector: "description",
      sortable: true,
    },
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Telefone",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Ação",
      cell: (row) => row.status === 0 ? <button className="nao-atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaTimes/></button> : <button className="atendido" onClick={() => changeStatus(row._id["$oid"])}> <FaCheck/></button>,
      selector: "status",
      sortable: true,
    },
  ];

  return (
      <div className="main">
        <Box className="p-5" bg="#FFFFFF" rounded="md">
          <div className="title-box">
              <Heading as="h3" size="md">
                Solicitações
              </Heading>
          </div>
          <DataTable
            columns={columns}
            data={data}
            defaultSortField="Descrição"
            pagination={true}
          />
        </Box>
      </div>
  );
}

export default ListOrders;