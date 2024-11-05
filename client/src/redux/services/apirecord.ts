import axios from "axios";
import server from "../../server";

const api = axios.create({
    baseURL: server,
    headers: {
        "Content-Type": "application/json",
    },
});

export const recordMovement = async (data: object) => {
    const response = await api.post("/inventory-movements", data , {withCredentials : true});
    return response.data;
};

export const getAllMovements = async () => {
    const response = await api.get("/inventory-movements" , {withCredentials : true});
    return response.data;
};

export const getMovementById = async (id: string) => {
    const response = await api.get(`/inventory-movements/${id}`  ,  {withCredentials : true});
    return response.data;
};
