import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
} from "@chakra-ui/core";
import api from "../../services/api-winery";
import "../../globals/globalStyle.css";

function RegisterSystem(){
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [status, setStatus] = useState("");
    const [wineryId, setWineryId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const makeRequest = async () => {
        await api.post("/winery", {
            latitude,
            longitude,
            status,
            wineryId
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setError("");
            setSuccess("success");
            setLatitude("");
            setLongitude("");
            setStatus("");
            setWineryId("");
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
                    Parabéns! O cadastro do sistema foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar sistema
                </Alert>
            }
            <div className="inputLatitude">
                <div className="labelContainer">
                    <p className="labelText">Latitude:</p>
                </div>
                    <input type="text" maxLength='50' value={latitude} onChange={(e) => {setLatitude(e.target.value);}}></input>
            </div>
            <div className="inputLongitude">
                <div className="labelContainer">
                    <p className="labelText">Longitude:</p>
                </div>
                    <input type="text" maxLength='50' value={longitude} onChange={(e) => {setLongitude(e.target.value);}}></input>
            </div>
            <div className="inputStatus">
                <div className="labelContainer">
                    <p className="labelText">Status:</p>
                </div>
                    <input type="text" maxLength='50' value={status} onChange={(e) => {setStatus(e.target.value);}}></input>
            </div>
            <div className="inputId">
                <div className="labelContainer">
                    <p className="labelText">Id Vinícola:</p>
                </div>
                    <input type="text" maxLength='50' value={wineryId} onChange={(e) => {setWineryId(e.target.value);}}></input>
            </div>
            <div className="buttonArea">
                <button className="buttonCadastrarVinicola" onClick={() => makeRequest()}>CADASTRAR SISTEMA</button>
            </div>
        </div>
    );
}

export default RegisterSystem;
