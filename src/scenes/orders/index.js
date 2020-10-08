import React, {useEffect, useState} from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import api from "../../services/api";
import './style.css';
import DataTable, { createTheme } from 'react-data-table-component';

function ListOrders() {
  const [data, setData] = useState([]);
  let test = []

  const get_orders = async () => {
    await api.get("/orders",
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          test = res.data.filter(element => typeof element.description == 'string');
          setData(test);
        }).catch((error) => {
            console.log("Error");
        });
  };

  useEffect(() => {
    get_orders();
  }, []);

  const change_status = async (order_id) => {
    await api.patch("/orders/" + order_id,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
          get_orders();
        }).catch((error) => {
            console.log("Error");
        });
  };
  
  const columns = [
    {
      name: 'Descrição',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: 'phoneNumber',
      sortable: true,
    },
    {
      name: 'Ação',
      cell: (row) => row.status == 0 ? <button className="nao-atendido" onClick={() => change_status(row._id['$oid'])}> <FaTimes/></button> : <button className="atendido" onClick={() => change_status(row._id['$oid'])}> <FaCheck/></button>,
      selector: 'status',
      sortable: true,
    },
  ];

  return (
      <div className="orders"> 
          <div className="div-title"> 
            <span className="title">Solicitações</span>
          </div>
          <DataTable
            columns={columns}
            data={data}
            defaultSortField="Descrição"
            pagination={true}
          />
      </div>
  );
}

export default ListOrders;