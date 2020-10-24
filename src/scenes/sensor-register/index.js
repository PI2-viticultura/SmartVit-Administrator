import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Alert,
    AlertIcon,
} from "@chakra-ui/core";
import api from "../../services/api-winery";
import "../../globals/globalStyle.css";

function RegisterSensor(){
    const [location, setLocation] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [type, setType] = useState("");
    const [situation, setSituation] = useState("");
    const [lastRegister, setLastRegister] = useState("");
    const [systemId, setSystemId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const makeRequest = async () => {
        await api.post("/winery", {
           location,
           identifier,
           type,
           situation,
           lastRegister,
           systemId
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setError("");
            setSuccess("success");
            setLocation("");
            setIdentifier("");
            setType("");
            setSituation("");
            setLastRegister("");
            setSystemId("");
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
                    Parabéns! O cadastro do sensor foi realizado com sucesso!
                </Alert>
            }
            {error === "error" &&
                <Alert status="error" variant="solid">
                    <AlertIcon />
                    Erro ao cadastrar sensor
                </Alert>
            }
            <div className="inputLocation">
                <div className="labelContainer">
                    <p className="labelText">Localização:</p>
                </div>
                    <input type="text" maxLength='50' value={location} onChange={(e) => {setLocation(e.target.value);}}></input>
            </div>
            <div className="inputIdentifier">
                <div className="labelContainer">
                    <p className="labelText">Identificador:</p>
                </div>
                    <input type="text" maxLength='50' value={identifier} onChange={(e) => {setIdentifier(e.target.value);}}></input>
            </div>
            <div className="inputType">
                <div className="labelContainer">
                    <p className="labelText">Tipo:</p>
                </div>
                    <input type="text" maxLength='50' value={type} onChange={(e) => {setType(e.target.value);}}></input>
            </div>
            <div className="inputSituation">
                <div className="labelContainer">
                    <p className="labelText">Situação:</p>
                </div>
                    <input type="text" maxLength='50' value={situation} onChange={(e) => {setSituation(e.target.value);}}></input>
            </div>
            <div className="inputId">
                <div className="labelContainer">
                    <p className="labelText">Id Sistema:</p>
                </div>
                    <input type="text" maxLength='50' value={systemId} onChange={(e) => {setSystemId(e.target.value);}}></input>
            </div>
            <div className="periodContainer">
                <div className="periodInnerContainer">
                    <div className="inputMensagem periodInput">
                        Último Registro <br/>
                        <DatePicker selected={lastRegister} onChange={date => {setLastRegister(date)}}> </DatePicker>
                    </div>
                </div>
            </div>
            <div className="buttonArea">
                <button className="buttonCadastrarVinicola" onClick={() => makeRequest()}>CADASTRAR SENSOR</button>
            </div>
        </div>
    );
}

export default RegisterSensor;