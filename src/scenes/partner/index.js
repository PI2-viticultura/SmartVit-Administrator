import React, {useEffect, useState} from "react";
import {Input} from "@chakra-ui/core";
import apiAdmin from "../../services/api-admin";
import "./style.css";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import {Heading, Box} from "@chakra-ui/core";

function ListPartner() {
  const [data, setData] = useState([]);
  const [filtereData, setFiltereData] = useState([]);
  const history = useHistory();
  let partners = [];

  const search = (event) => {
    event.preventDefault();
    const { value } = event.target;

    if (value !== ""){
      let filteredF = data.filter((element) => (element.name.toUpperCase().includes(value.toUpperCase())) || 
                                                (element.address.toUpperCase().includes(value.toUpperCase())) || 
                                                (element.type.toUpperCase().includes(value.toUpperCase())) || 
                                                (element.phoneNumber.toUpperCase().includes(value.toUpperCase())) 
                                  );
      setFiltereData(filteredF);
    }else{
      setFiltereData(data);
    }
  };

  useEffect(() => {
    const getPartnersx = async () => {    
        await apiAdmin.get("/partners",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
              
              partners = res.data;
              setData(partners);
              setFiltereData(partners);
            }).catch((error) => {
            });
     };

    getPartnersx();
  }, []);

  const pushToRegister = () => {
    history.push({
        pathname: "/register-partner"
    });
  };
  
  const columns = [   
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
    {
        name: "Endereço",
        selector: "address",
        sortable: true,
      },
    {
      name: "Telefone",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Especialidade",
      selector: "type",
      sortable: true,
    },
  ];

  return (
      <div className="main">
        <Box className="p-5" bg="#FFFFFF" rounded="md">
          <div className="title-box">
              <Heading as="h3" size="md">
                Parceiros
              </Heading>
              <Input className="input-filter" placeholder="Pesquisar" w="50%" borderColor="#919FA7" onChange={(e) => search(e)}/>
              <button className="button-new" size="md" w="30%" onClick={() => pushToRegister()}>NOVO</button>
          </div>
          
          <DataTable
            columns={columns}
            data={filtereData}
            defaultSortField="Nome"
            pagination={true}
          />
        </Box>
      </div>
  );
}

export default ListPartner;