import { defineStore } from "pinia";
import type { stringNumber,GetWeathers, contentDetails, SpecifyMonthType, SmonthDate,SpecifyMonthTypes } from "../types";

export const useStateOne = defineStore('main', {
    state: () => {
        return {
            dark: false,  //主题 false为默认 true为开启黑夜模式
            date: '', // 实时时间
            days: '',  // 日
            months: '',  //月
            monthDate: 9,  // 日历月份
            useMonth: '',  // 用来计算的月份 
            years: '', //年
            title: '', // 下个月的月份
            vHtml: '' , // v-html 文档
            userName: '', //作者名字
            webUrl : '' , //作者图片
            desc: '', //单位
            contentList: Array<contentDetails>,  // 请求到的日期信息下 的content_list 
            weather: Array<GetWeathers>,   // 请求到的日期信息的weather 天气信息
            // menu :Array<StoryType>     // 请求到的日期信息的content_list 剩下的
            id: '', // 文章id
            details: '', // 文章请求类型
            articleReview: '', // 评论
            text: '', // 文章类型
            content: '', // 文章内容
            cover: '',// 电台图片
            informations: Array<SpecifyMonthTypes>, // 月份信息
            city_name: '' ,//地球
            climate:'' , //对流层
            temperature: '', //温度
            src: "",
            showHied: false, // 控制播放
            duration: '00:00', // 音频总时长
            durations: 0, // 音频总时长
            currentTimes: '00:00',// 当前媒体元素的播放进度
            currentTime: 0,// 当前媒体元素的播放时长
            progressBar: 0 , //进度条
            shu: 0 , 
            showDisc: false, // flag 标记唱片小元素是否显示
            discImageArr: '../src/assets/one/float_player/float_player_pause.png',
            discImageIndex: 0,
            discTimer: null,
            closeAll: false, //离开artcle 全部关闭
            playShow: false,// 自定义音乐控制组件的显示隐藏属性

            titles: "",// 当前朗读文章标题

            anchor: "", // 当前文章的朗读者

            articlePath: "",// 当前文章的路由路径

            // 记录当前audio的播放暂停状态
            audioPlayState: false, // 默认没有播放

            // 记录当前audio是否循环播放
            needLoop: false, // 不循环
        }
    },

    getters: {
        bg() {
            if (this.dark) {
                return '#000'
            }
            else {
                return '#fff'
            }
        },
        color() {
            if (this.dark) {
                return '#fff'
            }
            else {
                return '#000'
            }
        }
    },

    actions: {
        toDayTheme() {  //切换到默认主题
            this.dark = false
        },
        toNightTheme() {  //切换到黑夜主题
            this.dark = true
        },
        switchTheme() {  //在默认主题和黑夜主题之间切换
            this.dark = !this.dark
        }
    }
})