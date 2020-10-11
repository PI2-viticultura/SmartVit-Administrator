import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./style.css";
import DataTable from "react-data-table-component";

function ListWinerys() {
  const [data, setData] = useState([]);
  let winerys = [];

  const getWinerys = async () => {
    await api.get("/winery",
      {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }).then((res) => {
        winerys = res.data.filter(element => typeof element.name === "string");
        setData(winerys);
      }).catch((error) => {
      });
  };

  useEffect(() => {
    getWinerys();
  }, []);


  const columns = [
    {
      name: "Vinícola",
      selector: "winery",
      sortable: true,
    },
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
  ];

  return (
    <div className="winerys">
      <DataTable
        columns={columns}
        data={data}
        defaultSortField="name"
        pagination={true}
      />
    </div>
  );
}

export default ListWinerys;