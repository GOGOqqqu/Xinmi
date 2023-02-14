import axios from "../axios";
export const one = {
    // 实时信息
    getData: (total: string) => {
        return axios.request<any>({
            url: `one/one/channel/one/${total}`,
            method: 'get',
        })
    },
    // 当前月份
    getMonth: (month: string) => {
        return axios.request<any>({
            url: `one/one/feeds/list/${month}`,
            method: 'get',
        })
    },

    // 详情页
    getComment: (comment: string) => {
        return axios.request<any>({
            url: `./one/one/${comment}`,
            method: 'get',
        })
    },
    // 详情页
    getComments: () => {
        return axios.request<any>({
            url: 'one/one/essay/htmlcontent/5763',
            method: 'get',
        })
    },
    getArticleReview: (comment: string) => {
        return axios.request<any>({
            url: `./one/one/comment/praiseandtime/${comment}`,
            method: 'get',
        })
    },

}