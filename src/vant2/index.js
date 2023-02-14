import {
    Tabbar,
    TabbarItem, //引入标签栏
    Button,
    Tab, //标签页
    Tabs,
    Swipe,
    SwipeItem, //轮播模块
    Grid,
    GridItem, //宫格
    Icon,
    Popup, //弹窗
    Image as VanImage, //vant图片
    Slider, //滑块 用于播放器
    Popover, //气泡弹窗
    ActionSheet, //动作面板
    Search, //搜索栏
    Collapse,
    CollapseItem, //下拉菜单
    Sticky, //粘性定位
    Rate, //评分 
    DropdownMenu,
    DropdownItem, //下拉菜单
    List, //列表
    Cell,
    CellGroup,
    Sidebar,
    SidebarItem, //侧边导航
    Toast, //轻提示  用于loading
    GoodsAction, //商品导航
    GoodsActionIcon, //商品导航
    GoodsActionButton, //商品导航
    NoticeBar, //通知栏
    SubmitBar, //商品提交栏
    Checkbox, //复选框
    Stepper, //步进器
    Dialog, //弹窗
    Step, // 步骤条
    Steps, // 步骤条
    SwipeCell, //滑动单元格
    Divider, //分割线
    Progress, //进度条
    Switch, //开关
    Area, //省市区选择
    Empty, // 空状态
    PullRefresh, // 下拉刷新
} from 'vant'

const UIComponents = [Tabbar, TabbarItem, Button, Tab, Tabs, Swipe, SwipeItem, Grid, GridItem, Icon, Popup, VanImage, Slider, Search, Popover, ActionSheet, Collapse, CollapseItem, Sticky, Rate, DropdownMenu, DropdownItem, List, Cell, CellGroup, Sidebar, SidebarItem, Toast, GoodsAction, GoodsActionIcon, GoodsActionButton, NoticeBar, SubmitBar, Checkbox, Stepper, Dialog, Step, Steps, SwipeCell, Divider, Progress, Switch, Area ,Empty, PullRefresh]



const VantUIPlugin = {};

VantUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default VantUIPlugin