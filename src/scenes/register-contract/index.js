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

import './style.css'


function RegisterContract() {
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
                            <Input id="contratante" placeholder="contratante" />
                        </FormControl>
                        <FormControl className="cpf_cnpj" isRequired>
                            <FormLabel htmlFor="cpf_cnpj">CPF/CNPJ</FormLabel>
                            <Input id="cpf_cnpj" placeholder="CPF/CNPJ" />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field-endereco" isRequired>
                            <FormLabel htmlFor="endereco">Endereço</FormLabel>
                            <Input id="endereco" placeholder="Endereço" />
                        </FormControl>
                        <FormControl className="field-phone" isRequired>
                            <FormLabel htmlFor="telefone">Telefone</FormLabel>
                            <Input id="telefone" placeholder="Telefone" />
                        </FormControl>
                    </Grid>
                    <FormControl isRequired>
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Input id="status" placeholder="Status" />
                    </FormControl>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <FormControl className="field-dataInicio" isRequired>
                            <FormLabel htmlFor="dataInicio">Data Início</FormLabel>
                            <Input id="dataInicio" placeholder="Data Início" />
                        </FormControl>
                        <FormControl className="field-dataFim" isRequired>
                            <FormLabel htmlFor="dataFim">Data Fim</FormLabel>
                            <Input id="dataFim" placeholder="Data Fim" />
                        </FormControl>
                    </Grid>
                    <FormControl isRequired>
                        <FormLabel htmlFor="vinicola">Vinicola</FormLabel>
                        <Input id="vinicola" placeholder="Vinicola" />
                    </FormControl>
                </div>
                <div className="button-box">
                    <Button variantColor="primary" size="md" w="25%">CADASTRAR</Button>
                </div>
            </Box>
        </div>
    )
}

export default RegisterContract
