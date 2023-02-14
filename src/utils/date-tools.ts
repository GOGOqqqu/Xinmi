export const getChineseMouth = (m: number): string => {
    switch (m) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return '';
    }
}
export const getChineseMouths = (m: string) => {
    switch (m) {
        case '1':
            return "阅读";
        case '2':
            return "连载";
        case '3':
            return "问答";
        case '4':
            return "音乐";
        case '5':
            return "影视";
        case '8':
            return "电台";
        default:
            return "";
    }
}
export const categoryNames = (m: string) => {
    switch (m) {
        case '1':
            return "essay";
        case '2':
            return "serialcontent";
        case '3':
            return "question";
        case '4':
            return "music";
        case '5':
            return "movie";
        case '8':
            return "radio";
        default:
            return "";
    }
}
// 获取时间
export const getime = () => {
    let date = new Date()
    let f: string | number = date.getFullYear()
    let m: string | number = date.getMonth() + 1
    let d: string | number = date.getDate()
    m = m >= 10 ? m : '0' + m
    d = d >= 10 ? d : '0' + d

    return (f + '-' + m + '-' + d)
}
export const getMAndDObj = (dateStr: string) => {
    let date = new Date(dateStr)
    let f: string | number = date.getFullYear()
    let m: string | number = date.getMonth() + 1
    let d: string | number = date.getDate()

    return {
        f: f ,
        m: m ,
        d: d 
    }
}
// 返回月份
export const returnMonth = (dateStr: string) => {
    let date = new Date(dateStr)

    let m: string | number = date.getMonth() + 1

    return `${m}`
}


// 获取前一个月
export const getThePreviousMont = (dateStr: string) => {
    let date = new Date(dateStr)

    let y: string | number = date.getFullYear()
    let m: string | number = date.getMonth() + 1

    y =  m - 1 <= 0 ? y - 1 : y
    m = m - 1 <= 0 ? 11 + m : m - 1
    m = m > 10 ? m : '0' + m 
    return `${y}-${m}`
}

// 获取前一天
export const getPrevDate = (dateStr: string) => {
    let date = new Date(dateStr)
    date.setDate(date.getDate() - 1)

    let y: string | number = date.getFullYear()
    let m: string | number = date.getMonth() + 1
    let d: string | number = date.getDate()

    m = m >= 10 ? m : '0' + m
    d = d >= 10 ? d : '0' + d


    return `${y}-${m}-${d}`
}
export const getPrevMonth = (dateStr: string) => {
    let date = new Date(dateStr)

    let y: string | number = date.getFullYear()
    let m: string | number = date.getMonth() +1

    m = m >= 10 ? m : '0' + m


    return `${y}-${m}`
}