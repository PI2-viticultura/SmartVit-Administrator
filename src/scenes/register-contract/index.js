import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
} from "@chakra-ui/core";

import api from '../../services/api';
import './style.css'


function RegisterContract() {
    const [contratante, setContratante] = useState('');
    const [cpf_cnpj, setCnpjCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [status, setStatus] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [vinicola, setVinicola] = useState('');
    const [setError] = useState('');
    const [setSuccess] = useState('');

    const makeRegister = async () => {
        await api.post('/contrato', {
            contratante,
            cpf_cnpj,
            endereco,
            telefone,
            status,
            dataInicio,
            dataFim,
            vinicola
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
        <div className="main">
            <Box className="box-contrato" bg="#FFFFFF" rounded="md">
                <div className="title-box">
                    <Heading as="h3" size="md">
                        Cadastrar Contrato
                    </Heading>
                </div>
                <div>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl isRequired>
                            <FormLabel htmlFor="contratante">Contratante</FormLabel>
                            <Input id="contratante" placeholder="contratante" onChange={e => { setContratante(e.target.value) }}  />
                        </FormControl>
                        <FormControl className="cpf_cnpj" isRequired>
                            <FormLabel htmlFor="cpf_cnpj">CPF/CNPJ</FormLabel>
                            <Input id="cpf_cnpj" placeholder="CPF/CNPJ" onChange={e => { setCnpjCpf(e.target.value) }} />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field-endereco" isRequired>
                            <FormLabel htmlFor="endereco">Endereço</FormLabel>
                            <Input id="endereco" placeholder="Endereço" onChange={e => { setEndereco(e.target.value) }} />
                        </FormControl>
                        <FormControl className="field-phone" isRequired>
                            <FormLabel htmlFor="telefone">Telefone</FormLabel>
                            <Input id="telefone" type="tel" placeholder="Telefone" onChange={e => { setTelefone(e.target.value) }} />
                        </FormControl>
                    </Grid>
                    <FormControl isRequired>
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Input id="status" placeholder="Status" onChange={e => { setStatus(e.target.value) }} />
                    </FormControl>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field-dataInicio" isRequired>
                            <FormLabel htmlFor="dataInicio">Data Início</FormLabel>
                            <Input id="dataInicio" placeholder="Data Início" onChange={e => { setDataInicio(e.target.value) }} />
                        </FormControl>
                        <FormControl className="field-dataFim" isRequired>
                            <FormLabel htmlFor="dataFim">Data Fim</FormLabel>
                            <Input id="dataFim" placeholder="Data Fim" onChange={e => { setDataFim(e.target.value) }} />
                        </FormControl>
                    </Grid>
                    <FormControl isRequired>
                        <FormLabel htmlFor="vinicola">Vinicola</FormLabel>
                        <Input id="vinicola" placeholder="Vinicola" onChange={e => { setVinicola(e.target.value) }} />
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button variantColor="primary" size="md" w="25%" onClick={() => makeRegister()}>CADASTRAR</Button>
                </div>
            </Box>
        </div>
    )
}

export default RegisterContract
