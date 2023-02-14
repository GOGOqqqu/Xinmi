import axios from "../axios";

export const todo = {
    getData: () => {
        return axios.request<any>({
            url: 'one/one/channel/one/2022-05-05',
            method: 'get',
            // data:{
            //     page,
            //     pType
            // }
        })
    },
}