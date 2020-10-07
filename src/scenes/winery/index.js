import React, {useState} from 'react';

import api from '../../services/api';
import '../../globals/globalStyle.css';

function Winery(){
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contract_id, setContractId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const makeRequest = async () => {
        await api.post('/winery', {
            name,
            address,
            contract_id
        },
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then(res => {
            setError('');
            setSuccess('success');
        }).catch(error => {
            setError('error');
            setSuccess('');
        })
    }

    return (
        <div className="board">
            <div className="inputName">
                <div className="labelContainer">
                    <p className="labelText">Nome:</p>
                </div>
                    <input type="text" maxLength='50' onChange={e => {setName(e.target.value)}}></input>
            </div>
            <div className="inputAddress">
                <div className="labelContainer">
                    <p className="labelText">Endereço:</p>
                </div>
                    <input type="text" maxLength='200' onChange={e => {setAddress(e.target.value)}}></input>
            </div>
            <div className="inputId">
                <div className="labelContainer">
                    <p className="labelText">ID do Contrato:</p>
                </div>
                    <input type="text" maxLength='24' onChange={e => {setContractId(e.target.value)}}></input>
            </div>
            <div className="buttonArea">
                <button className="buttonCadastrarVinicola" onClick={() => makeRequest()}>CADASTRAR VINÍCOLA</button>
            </div>
        </div>
    )
}

export default Winery;
