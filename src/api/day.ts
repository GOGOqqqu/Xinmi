import axios from "../axios";

export const day = {
    getData: () => {
        return axios.request<any>({
            url: 'global/api/list/v3/android/zh-hans',
            method: 'get',
        })
    },
    getCode:()=>{
        return axios.request<any>({
            url:'nest/code',
            method: 'get',
        })
    },
    login:(code:any)=>{
        return axios.request<any>({
            url:'nest/user_login',
            method: 'post',
            data:{
                code:code
            }
        })
    },
}