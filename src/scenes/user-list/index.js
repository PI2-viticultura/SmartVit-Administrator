import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

import { Box, Button, Input, Grid, Divider, Text } from "@chakra-ui/core";
import "./style.css";
import apiUser from "../../services/api-user";
import { Scrollbars } from "react-custom-scrollbars";


function Users() {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [success, setSuccess] = useState("");

    const makeGetUser = async () => {
        await apiUser.get("/user",
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
        await this.api.patch("/users/" + userId,
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

    const pushToEdit = (id, user) => {
        history.push({
            pathname: "/user-edit",
            state: { isEdit: true, userId: id, user: user }
        });
    }

    
    return (
        <div className="main">
            <Box className="p-5" bg="#FFFFFF" rounded="md">
                <div className="grid-header" templateColumns="repeat(2, 1fr)" gap={6}>
                    <Button className="button-new" variantColor="primary" size="md" w="40%" onClick={() => pushToRegister()}>NOVO USUÁRIO</Button>
                    <Input className="input-new" placeholder="Pesquisar" w="65%" borderColor="#919FA7"/>
                </div>
                <Grid className="column-name" templateColumns="repeat(4, 1fr)">
                    <Text fontSize="1em" color="gray">Nome</Text>
                    <Text fontSize="1em" color="gray">Email</Text>
                    <Text fontSize="1em" color="gray"></Text>
                    <Text fontSize="1em" color="gray">Ação</Text>
                </Grid>
                <Divider borderColor="#615B5B" />
                <Scrollbars style={{ height: "30vh" }}>
                    {users.map(user => (
                        <div>
                            <Grid className="column-name-item" templateColumns="repeat(3, 1fr)">
                                <Text fontSize="1em" color="gray">{user.name}</Text>
                                <Text fontSize="1em" color="gray" className="email">{user.email}</Text>
                                <Grid templateColumns="repeat(2, 1fr)">
                                    <Button className="btn-edit" onClick={() => pushToEdit(user._id.$oid, user)}>Editar</Button>
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