import React, {useEffect, useState} from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import {Input} from "@chakra-ui/core";
import apiAdmin from "../../services/api-admin";
import "./style.css";
import DataTable from "react-data-table-component";
import {Heading, Box} from "@chakra-ui/core";

function ListOrders() {
  const [data, setData] = useState([]);
  const [filtereData, setFiltereData] = useState([]);

  let orders = [];

  const getOrders = async () => {    
    await apiAdmin.get("/orders",
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          
          orders = res.data;
          setData(orders);
          setFiltereData(orders);
        }).catch((error) => {
        });
  };

  const search = (event) => {
    event.preventDefault();
    const { value } = event.target;

    if (value !== ""){
      let filteredF = data.filter((element) => (element.name.toUpperCase().includes(value.toUpperCase())) || 
                                                (element.description.toUpperCase().includes(value.toUpperCase())) || 
                                                (element.email.toUpperCase().includes(value.toUpperCase())) || 
                                                (element.phoneNumber.toUpperCase().includes(value.toUpperCase())) 
                                  );
      setFiltereData(filteredF);
    }else{
      setFiltereData(data);
    }
  };

  useEffect(() => {   
    getOrders();
  }, []);

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
          <Input className="input-filter" placeholder="Pesquisar" w="50%" borderColor="#919FA7" onChange={(e) => search(e)}/>
          <DataTable
            columns={columns}
            data={filtereData}
            defaultSortField="Descrição"
            pagination={true}
          />
        </Box>
      </div>
  );
}

export default ListOrders;