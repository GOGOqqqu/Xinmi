export interface AuthorInformation {
  user_name: string
  web_url: string
}

export interface StoryType {
  forward: string
  item_id: string
  title: string
  pic_info: string
  words_info: string
  img_url: string
  like_count: string
  audio_url: string
  volume: string
  category: string
  id: string
  author: Array<AuthorInformation>
}


// 天气信息
export interface GetWeathers {
  city_name: string
  climate: string
  date: string
  temperature: string
}
// 表示指定日期下的所有信息
export interface SpecifyDates {
  data: Array<SpecifyDate>
}

export interface SpecifyDate {
  weather: Array<GetWeathers>
  content_list: Array<StoryType>
  date: string
}

// 
export interface SmonthDate {
  date: string
}

// 表示指定日期下 的月份的所有信息
export interface SpecifyMonthType {
  cover: string
  date: string
  id: number
}
// 加载总月份信息 
export interface SpecifyMonthTypes {
  monthDate : string
  informations: Array<SpecifyMonthType>
}

export interface SpecifyMonth {
  date: Array<SpecifyMonthType>
}

export interface AuthorList {
  web_url: string
  user_name: string
  desc: string
  anchor: string
  audio: string
}

export interface JsonContent {
  editor: string
  copyright: string
  desc: string
  simple_author: Array<string>
  content:string
}

// 详情页信息
export interface contentDetails {
  title: string
  home_image: string
  anchor: string
  audio: string
  author_list: Array<AuthorList>
  id: string
  json_content: Array<JsonContent>
  web_url: string

} 
// 详情页信息
export interface stringNumber {
  title: string | number
}

// 详情页信息
export interface userInformation {
  user_name: string 
  web_url:string
}

// 评论 articleReview
export interface stateArticleReview {
  content: string
  created_at:string
  praisenum :number
  user:Array<userInformation>
  quote:string
}