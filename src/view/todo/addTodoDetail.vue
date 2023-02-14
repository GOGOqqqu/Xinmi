<template>

  <div class="addTodoDetail">
    <header>

      <div class="quit" @click="$router.back">
        <svg t="1673476744234" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1361" width="30" height="30">
          <path
            d="M521.28 918.72L160 557.44c-24.96-24.96-24.96-65.6 0-90.56l361.28-361.6L566.4 150.4 205.12 511.68 566.4 872.96l-45.12 45.12z"
            fill="#ffffff" p-id="1362"></path>
          <path d="M192 480h704v64H192z" fill="#ffffff" p-id="1363"></path>
        </svg>
      </div>

      <div class="title">
        添加目标
      </div>



      <div class="submit" @click="clickSubmit">
        <van-icon name="success" size="30" />
      </div>
    </header>

    <main>
      <div class="set_basic">
        <div class="title">基础信息</div>

        <!-- 清单tag -->
        <div class="tags" ref="tags">
          <div class="tag" v-for="e in piniaTodo.Inventories" :key="e">
            <van-tag style="margin: 1vh 2vw 0 0;" :plain="e != setData.inventory" :key="e" @click="clickTag(e)"
              size="large" type="primary">
              {{ e }}
            </van-tag>
          </div>

          <div class="tag">
            <van-tag style="margin: 1vh 2vw 0 0;" size="large" type="primary" @click="popupShow = true"><van-icon
                name="plus" size="15" /></van-tag>
          </div>

        </div>

        <!-- 目标内容 -->
        <div class="set_content">
          <div class="input-group">
            <input required type="text" name="text" autocomplete="off" class="input" v-model="setData.content">
            <label class="user-label">待办事项</label>
          </div>
        </div>

        <!-- 显示等级 -->
        <div class="showGrade">
          <van-popover v-model:show="showPopover" :actions="actions" placement="bottom" @select="onSelect">
            <template #reference>

              <svg t="1673645268124" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1714" width="32" height="32">
                <path
                  d="M817.066667 618.666667H172.8V106.666667h644.266667c29.866667 0 49.066667 34.133333 32 61.866666L746.666667 341.333333c-8.533333 12.8-8.533333 29.866667 0 42.666667l102.4 172.8c17.066667 27.733333-2.133333 61.866667-32 61.866667z"
                  :fill="gradeColor" p-id="1715"></path>
                <path
                  d="M236.8 917.333333h-10.666667c-32 0-59.733333-25.6-59.733333-59.733333V106.666667h128v750.933333c2.133333 34.133333-25.6 59.733333-57.6 59.733333z"
                  :fill="gradeColor" p-id="1716"></path>
              </svg>
              <span :style="{ color: gradeColor }">优先级: {{ gradeText }}</span>
            </template>
          </van-popover>
          <!-- <div class="gradeText" :style="{ color: gradeColor }">{{ gradeText }}</div> -->
        </div>

        <!-- 目标备注 -->
        <div class="set_content">
          <div class="input-group">
            <input required type="text" name="text" autocomplete="off" class="input" v-model="setData.remark">
            <label class="user-label">备注</label>
          </div>
        </div>


      </div>

      <div class="set_child" ref="autoAnimate">
        <div class="title">添加子任务</div>
        <template v-for="item in children">
          <div class="show_target">
            <div class="text">
              {{ item.content }}
            </div>
            <div class="del" @click="delTarget(item.content)"><van-icon name="cross" /></div>
          </div>
        </template>

        <div class="input-group">
          <input type="text" class="input" v-model="childInp" placeholder="您的子任务" autocomplete="off">
          <input class="button--submit" value="添加" type="submit" @click="submitChildTarget">
        </div>
      </div>
    </main>

    <!-- 添加清单弹窗 -->
    <van-popup v-model:show="popupShow" round :style="{ padding: '64px' }">
      <div class="group">
        <input required type="text" class="input" v-model="inpInventory">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>清单名</label>
      </div>
      <van-button round type="success" color="#03a9f3" @click="addInventory">确定</van-button>
    </van-popup>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect } from "vue";
import { useState } from "@/stores";
import { userTodo } from '@/stores/todo'
import dayjs from 'dayjs'
import { todoType, Child } from '@/utils/Type'
import { showToast } from 'vant';
import { useAutoAnimate } from "@formkit/auto-animate/vue"
import router from "@/router";

const state = useState()
const piniaTodo = userTodo()
const [autoAnimate] = useAutoAnimate()
const [tags] = useAutoAnimate()

// 变量 ============================ 变量

let children: Child[] = reactive([])
let childInp = '' // v-model 子目标
let setData: todoType = reactive({
  id: '',
  inventory: '默认',
  content: '',
  remark: '',
  creationDate: '',
  creationTime: '',
  state: false,
  grade: 0,
  children
})

let popupShow = ref(false); // 弹出层popup 开关
let inpInventory = '' // v-model 新清单的名字

const showPopover = ref(false); // 等级旗子气泡展示
let gradeColor = ref("#6b6b6b");
let gradeText = ref('无优先级')
const gradeColors = ["#6b6b6b", "#4872fa", "#ffb001", "#e13e39"]
const actions = [
  { text: '无优先级', grade: 0 },
  { text: '低优先级', grade: 1 },
  { text: '中优先级', grade: 2 },
  { text: '高优先级', grade: 3 },
];

// 方法 =============================== 方法

interface actionType {
  grade: number,
  text: string
}
// 展开旗子气泡
const onSelect = (action: actionType) => {
  // showToast(action.text);
  gradeColor.value = gradeColors[action.grade]
  gradeText.value = actions[action.grade].text
  setData.grade = action.grade
}

// 添加一个清单tag
const addInventory = () => {
  if (inpInventory == '') {
    return
  }
  piniaTodo.Inventories.push(inpInventory)
  inpInventory = ''
  popupShow.value = false
}

// 点击一个tag
const clickTag = (e: any) => {
  setData.inventory = e
}

// 提交子目标
const submitChildTarget = () => {
  if (childInp == '') {
    return
  }
  let temp = {
    state: false,
    content: childInp
  }
  children.push(temp)
  childInp = ''
}

// 删除一个子任务
const delTarget = (val: string) => {
  let index = children.findIndex(t => {
    return t.content == val
  })
  children.splice(index, 1)
}

// 点击提交整个todo
const clickSubmit = () => {
  console.log('点击提交')
  if (setData.content == '') {
    return
  }

  let a = dayjs().format(`YYYY-MM-DD`)
  console.log('a', a)
  setData.creationDate = dayjs().format(`YYYY-MM-DD`)
  setData.creationTime = dayjs().format(`HH:mm:ss`)
  setData.id = new Date().getTime().toString()
  console.log('setData', setData)
  piniaTodo.todoList.push(setData)
  router.back()
}

// 生命周期 ===================== 
onMounted(() => {
  console.log('挂载完成');
})
onUnmounted(() => {
  console.log('卸载之后');
})
onUpdated(() => {
  console.log('数据发生了更新')
})

</script>

<style lang="scss" scoped>
$bg: v-bind('state.todo_add_bg');
$font: v-bind('state.color');
$todo_header: v-bind('state.todo_header');
$todo_set_caed: v-bind('state.todo_set_caed');

.addTodoDetail {
  height: 100vh;
  width: 100vw;

  header {
    width: 100vw;
    height: 6vh;
    background-color: $todo_header;
    color: white;
    display: flex;
    align-items: center;

    .quit {
      margin-left: 2vw;
    }

    .title {
      font-size: 25px;
      margin-left: 4vw;
    }

    .submit {
      margin-left: 45vw;
    }
  }

  main {
    width: 100vw;
    height: calc(100vh - 6vh);
    box-sizing: border-box;
    background-color: $bg;
    padding: 1vh 2vw 0;
    overflow: scroll;

    &>div {
      width: 96vw;
      background-color: $todo_set_caed;
      margin-bottom: 2vh;
      padding: 1vh 2vw;
      border-radius: 8px;
      box-shadow: 0px 0px 3px 2px #eee;

      .title {
        font-size: 18px;
        color: $font;
        margin-bottom: 1vh;
      }
    }


    .set_basic {

      &>div {
        margin-bottom: 2.5vh;
      }

      .tags {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }

      .showGrade {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 18px;

        :deep(.van-popover__wrapper) {
          display: flex;
          align-items: center;
        }

        .gradeText {
          transform: translateX(-50%);
        }
      }

    }

    .set_child {

      .show_target {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $bg;
        padding: 2vh 2vw;
        border-radius: 8px;
        margin-bottom: 1vh;


        .text {
          width: 85%;

        }

        .del {
          width: 15%;
          text-align: center;
        }
      }

      .input-group {
        display: flex;
        align-items: center;
        position: relative;

        .input {
          min-height: 50px;
          max-width: 100%;
          padding: 0 1rem;
          color: #6b6b6b;
          font-size: 15px;
          border: 1px solid #515151;
          border-radius: 6px 0 0 6px;
          background-color: transparent;
        }

        .button--submit {
          min-height: 50px;
          padding: .5em 1em;
          border: none;
          border-radius: 0 6px 6px 0;
          background-color: #1989fa;
          color: #fff;
          font-size: 15px;
          cursor: pointer;
          transition: background-color .3s ease-in-out;
          position: absolute;
          right: 0;
        }

        .input:focus,
        .input:focus-visible {
          border-color: #3898EC;
          outline: none;
        }
      }

    }

    // .set_time {}
  }

  ::v-deep(.van-popup) {
    background-color: $bg;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .group {
      margin-bottom: 2vh;
    }
  }
}

.input-group {
  position: relative;

  .input {
    width: 82vw;
    border: solid 2px #9e9e9e;
    border-radius: 8px;
    background: none;
    padding: 1rem;
    font-size: 1rem;
    color: #6b6b6b;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .user-label {
    position: absolute;
    left: 15px;
    color: #6b6b6b;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input:focus,
  input:valid {
    outline: none;
    border: 2px solid #1a73e8;
  }

  .input:focus~label,
  input:valid~label {
    transform: translateY(-50%) scale(0.8);
    background-color: $todo_set_caed;
    padding: 0 .2em;
    color: #2196f3;
  }
}

.group {
  position: relative;


  .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 200px;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
  }

  .input:focus {
    outline: none;
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .input:focus~label,
  .input:valid~label {
    top: -20px;
    font-size: 14px;
    color: #5264AE;
  }

  .bar {
    position: relative;
    display: block;
    width: 200px;
  }

  .bar:before,
  .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264AE;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  .input:focus~.bar:before,
  .input:focus~.bar:after {
    width: 50%;
  }

  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .input:focus~.highlight {
    animation: inputHighlighter 0.3s ease;
  }

  @keyframes inputHighlighter {
    from {
      background: #5264AE;
    }

    to {
      width: 0;
      background: transparent;
    }
  }
}
</style>
