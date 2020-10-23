import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

import { Box, Button, Input, Grid, Divider, Text } from "@chakra-ui/core";
import "./style.css";
import api from "../../services/api";
import { Scrollbars } from "react-custom-scrollbars";




function Users() {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [success, setSuccess] = useState("");

    const makeGetUser = async () => {
        await api.get("/user",
            {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }).then((res) => {
                setUsers(res.data);
                setSuccess("success");
                return res;
            }).catch((error) => {
                setError("error");
                return error;
            });
    };

    const changeStatus = async (userId) => {
        await api.patch("/users/" + userId,
        {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }).then((res) => {
            setSuccess("success");
            makeGetUser();
            return res;
        }).catch((error) => {
            setError("error");
            return error;
        });
    };

    useEffect(() => {
        if (users.length === 0) {
            makeGetUser();
        }
        return;
    });

    const pushToRegister = () => {
        history.push({
            pathname: "/user-register"
        });
    }

    const pushToEdit = (id) => {
        history.push({
            pathname: "/user-edit",
            state: { isEdit: true, userId: id }
        });
    }

    
    return (
        <div className="main">
            <Box className="box-user" bg="#FFFFFF" rounded="md" h="35.48125em" width={[
                "100%", // base
            ]} fontSize={["sm", "md", "lg", "xl"]}>
                <Grid className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
                    <Button className="button-newuser" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO USUÁRIO</Button>
                    <Input className="input-newUser" placeholder="Basic usage" w="65%" borderColor="#919FA7" />
                </Grid>
                <Grid className="column-name" templateColumns="repeat(5, 1fr)">
                    <Text fontSize="1em" color="gray">Nome</Text>
                    <Text fontSize="1em" color="gray">Email</Text>
                    <Text fontSize="1em" color="gray">Telefone</Text>
                    <Text fontSize="1em" color="gray">Vinícola</Text>
                    <Text fontSize="1em" color="gray">Ação</Text>
                </Grid>
                <Divider borderColor="#615B5B" />
                <Scrollbars style={{ height: "30vh" }}>
                    {users.map(user => (
                        <div>
                            <Grid className="column-name-item" templateColumns="repeat(5, 1fr)">
                                <Text fontSize="1em" color="gray">{user.name}</Text>
                                <Text fontSize="1em" color="gray" className="email">{user.email}</Text>
                                <Text fontSize="1em" color="gray">40028922</Text>
                                <Text fontSize="1em" color="gray">Fix after</Text>
                                <Grid templateColumns="repeat(2, 1fr)">
                                    <Button className="btn-edit" onClick={() => pushToEdit(user._id.$oid)}>Editar</Button>
                                    <Button className="btn-del" onClick={() => changeStatus(user._id.$oid)}> {user.situation === 0 ? "Ativar" : "Desativar"}</Button>
                                </Grid>
                            </Grid>
                            <Divider borderColor="#615B5B" />
                        </div>
                    ))}
                </Scrollbars>
            </Box >
        </div >
    );

}

export default Users;