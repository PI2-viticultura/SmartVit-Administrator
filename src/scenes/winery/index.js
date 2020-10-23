import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
} from "@chakra-ui/core";
import apiWinery from "../../services/api-winery";
import "../../globals/globalStyle.css";

function Winery(){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contractId, setContractId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const makeRequest = async () => {
        await apiWinery.post("/winery", {
            name,
            address,
            contractId
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setError("");
            setSuccess("success");
            setName("");
            setAddress("");
            setContractId("");
        }).catch((error) => {
            setError("error");
            setSuccess("");
        });
    };

    return (
        <div className="board">
            {success === "success" &&
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    Parabéns! Seu cadastro de vinícola foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar vinícola
                </Alert>
            }
            <div className="inputName">
                <div className="labelContainer">
                    <p className="labelText">Nome:</p>
                </div>
                    <input type="text" maxLength='50' value={name} onChange={(e) => {setName(e.target.value);}}></input>
            </div>
            <div className="inputAddress">
                <div className="labelContainer">
                    <p className="labelText">Endereço:</p>
                </div>
                    <input type="text" maxLength='200' value={address} onChange={(e) => {setAddress(e.target.value);}}></input>
            </div>
            <div className="inputId">
                <div className="labelContainer">
                    <p className="labelText">ID do Contrato:</p>
                </div>
                    <input type="text" maxLength='24' value={contractId} onChange={(e) => {setContractId(e.target.value);}}></input>
            </div>
            <div className="buttonArea">
                <button className="buttonCadastrarVinicola" onClick={() => makeRequest()}>CADASTRAR VINÍCOLA</button>
            </div>
        </div>
    );
}

export default Winery;
