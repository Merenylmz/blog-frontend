import axios from "axios";

const CommonAPI = async({url, parameters, method, inputs}: {url: string, parameters?: string, method: string, inputs?:object}) => {
    let data;
    switch (method) {
        case "GET":
            const getRes = await axios.get(`${url}/${parameters ? parameters: ""}`);
            data = await getRes.data;
            break;
        case "ADD":
            const addRes = await axios.post(`${url}`, inputs);
            data = await addRes.data;
            break;
        case "EDIT":
            const editRes = await axios.put(`${url}/${parameters ? parameters: ""}`, inputs);
            data = editRes.data;
            break;
        case "DELETE": 
            const deleteRes = await axios.delete(`${url}/${parameters ? parameters: ""}`);
            data = deleteRes.data;
        default:
            return data;
    }

    return data;
}

export default CommonAPI;