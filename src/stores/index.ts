import { defineStore } from "pinia";
import { ref } from "vue";
interface timeStatistics {
    year?:number,
    month?:number,
    week?:number,
    day:number,
    hour?:number,
    min?:number,
    sec?:number
}

interface remainderTodo{
    title:string,
    frequency:number, 
    show:boolean,  
    frequencyName:string,  
    num:number
}


export const useState = defineStore('main',{
    state:()=>{
        return{
            dark:false,   //主题 false为默认 true为开启黑夜模式
            now:'',  //当天的时间 年月日
            week: 0, // 星期几
            h:0, //时
            m:0, //分
            s:0, //秒
            birthTime:'',  //出生时间 且存储到localStorage中
            lifetime:80,   //预估寿命
            age:0,  //现在的年龄
            isOnSetting:true,  //是否正在设置出生日期以及预估寿命 默认开启
            timeStatistics:{   //生之钟时间统计
                year:0,
                month:0,
                week:0,
                day:0,
                hour:0,
                min:0,
            } as timeStatistics,
            diffTimeStatistics:{    //死之钟时间统计
                year:0,
                month:0,
                day:0,
                sec:0,
            } as timeStatistics,
            isDeathClock:false,   //现在显示的是否为死之钟
            showToast:ref(false),
            showLoading:ref(false),
            remainderTodo:[ //余生todo
                {
                    title:'做爱',
                    frequency:2/7,  //一周两次 时间频率计算 分日 周 月 年
                    show:true,  //是否显示出来
                    frequencyName:'周',  //频率词
                    num:2   //数量
                },
                {
                    title:'打游戏',
                    frequency:2/1,  //一天两次 时间频率计算 分日 周 月 年
                    show:true,  //是否显示出来
                    frequencyName:'天',  //频率词
                    num:2   //数量
                },
                {
                    title:'写日记',
                    frequency:1/1,  //一天两次 时间频率计算 分日 周 月 年
                    show:false,  //是否显示出来
                    frequencyName:'天',  //频率词
                    num:1  //数量
                },
                {
                    title:'吃饭',
                    frequency:3/1,  //一天两次 时间频率计算 分日 周 月 年
                    show:false,  //是否显示出来
                    frequencyName:'天',  //频率词
                    num:3  //数量
                }
            ] as Array<remainderTodo>
        }
    },

    getters: {
        bg() {  //背景颜色
            if (this.dark) {
                return '#1c1c1e'
            }
            else {
                return '#fff'
            }
        },
        LightBg(){  //浅色背景
            if (this.dark) {
                return '#303030'
            }
            else{
                return '#fefefe'
            }
        },
        color(){  //字体颜色
            if (this.dark) {
                return '#fff'
            }
            else {
                return '#1c1c1e'
            }
        },
        LightColor() {
            if (this.dark) {
                return '#fefefe'
            }
            else{
                return '#303030'
            }
        },
        cardBg(){
            if (this.dark) {
                return 'rgba(45,45,45,0.8)'
            }
            else{
                return 'rgba(220,220,220,0.8)'
            }
        },
        todoBg(){
            if (this.dark) {
                return 'rgba(255, 255, 255, 0.08)'
            }
            else{
                return 'rgba(60,60,60,0.3)'
            }
        },
        todo_header() { // 规划 页头颜色
            if (this.dark) {
                return '#222222'
            }
            else {
                return '#03a9f3'
            }
        },
        todo_list() { // 规划 列表背景
            if (this.dark) {
                return '#2d2e30'
            }
            else {
                return '#f7f7f7'
            }
        },
        todo_list_item() { // 规划 列表小项背景
            if (this.dark) {
                return '#222222'
            }
            else {
                return '#ffffff'
            }
        },
        todo_list_caed() { // 规划 时间卡片
            if (this.dark) {
                return 'to right, #223160, #1b2864'
            }
            else {
                return 'to right, #23b3bf, #02aaf3'
            }
        },
        todo_set_caed() { // 规划 添加小卡片
            if (this.dark) {
                return '#222123'
            }
            else {
                return '#f2f2f2'
            }
        },
        todo_add_bg() { // 规划 添加小卡片
            if (this.dark) {
                return '#3b3b3b'
            }
            else {
                return '#ffffff'
            }
        },
        todo_addBtn() {
            if (this.dark) {
                return '#1c1c1e'
            }
            else {
                return '#03a9f3'
            }
        },
        year(): string {
            return this.now.split('-')[0]
        },
        month(): string {
            return this.now.split('-')[1]
        },
        day(): string {
            return this.now.split('-')[2]
        },
        secDeg(): string {
            return this.s * 6 + 'deg'
        },
        minDeg(): string {
            return this.m * 6 + this.s / 60 * 6 + 'deg'
        },
        hourDeg(): string {
            return this.h % 12 * 30 + this.m / 60 * 30 + 'deg'
        },
        weekC(): string | undefined { // 将 数字week 转换成 文字
            switch (this.week) {
                case 0: return '周日';
                    break;
                case 1: return '周一';
                    break;
                case 2: return '周二';
                    break;
                case 3: return '周三';
                    break;
                case 4: return '周四';
                    break;
                case 5: return '周五';
                    break;
                case 6: return '周六';
                    break;
            }
        },
        // weekC(): string { // 将 数字week 转换成 文字
        //     const w = {
        //         0: '周日',
        //         1: '周一',
        //         2: '周二',
        //         3: '周三',
        //         4: '周四',
        //         5: '周五',
        //         6: '周六'
        //     }
        //     return w[this.week]
        // },

    },

    actions:{
        sewNow(val:string){
            this.now = val
        },
        setWeek(val: number) {
            this.week = val
        },
        setHour(val: number) {
            this.h = val
        },
        setMin(val: number) {
            this.m = val
        },
        setSec(val: number) {
            this.s = val
        },
        setBirthTime(val: string) {  //修改出生日期
            this.birthTime = val
        },
        setLifetime(val: number) {  //修改预估寿命
            this.lifetime = val
        },
        switchIsOnSetting() {   //切换当前设置状态
            this.isOnSetting = !this.isOnSetting
        },
        setAge(val:number){  //设置当前年龄
            this.age = val
        },
        setTimeStatistics(val:timeStatistics){  //设置时间统计
            this.timeStatistics = val
        },
        switchDeathClock(){
            this.isDeathClock = !this.isDeathClock
        },
        isShowToast(){
            this.showToast = !this.showToast
        },
        setDiffTimeStatistics(val:timeStatistics){
            this.diffTimeStatistics = val
        },
    },
    persist: {
        enabled: true,
        strategies: [
        {
            storage: localStorage,
            paths: ['dark','birthTime','lifetime','isOnSetting','age','remainderTodo']
        },
        ]
    }
})