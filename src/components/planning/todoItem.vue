<template>

  <van-swipe-cell>

    <div class="todo_content" @click="toDetailPage(sendData.id)">
      <div class="left">
        <van-checkbox v-model="sendData.state" icon-size="7vw" @click.stop="">复选框</van-checkbox>
      </div>
      <div class="right">
        <div class="content"> {{ sendData.content }} </div>
        <div class="schedule" v-if="sendData.children.length != 0">{{ schedule }}</div>
        <div class="remark" v-if="sendData.remark != ''"> {{ sendData.remark }} </div>
        <div class="time" align="right">{{ sendData.creationDate }} {{ sendData.creationTime }}</div>
        <div class="grade"
          :style="{ backgroundColor: sendData.grade == 0 ? '#adadad' : sendData.grade == 1 ? '#4672fa' : sendData.grade == 2 ? '#ffaf00' : '#e03d39' }">
          {{ gradeFn() }}</div>
      </div>
    </div>

    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" @click="piniaTodo.deleteTodo(sendData.id)" />
    </template>

  </van-swipe-cell>

</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect } from "vue";
// import _ from 'lodash'
import { useState } from "@/stores";
import { userTodo } from '@/stores/todo'
import { todoType, Child } from '@/utils/Type'
import { useRouter, useRoute } from "vue-router";

const state = useState()
const piniaTodo = userTodo()
const router = useRouter()   //创建路由器实例
const route = useRoute()   //创建路由器实例
const props = defineProps<{  //父组件传来的数据
  sendData: todoType
}>()

// 变量 ======================= 
let children: Child[] = reactive([])
let checked = ref('0') // 单选框 v-m
let schedule = ref('')

// 计算子任务 分数
const scheduleFn = (): string => {
  let temp = 0
  props.sendData.children.map(t => {
    if (t.state == true) {
      temp++
    }
  })
  return `${temp}/${props.sendData.children.length}`
}

// 点击跳转详细界面
const toDetailPage = (id: string) => {
  router.push({
    path: '/todoDetail',
    query: {
      id
    }
  })
}

const gradeFn = (): string | undefined => {
  switch (props.sendData.grade) {
    case 0: return '无优先级';
      break;
    case 1: return '低优先级';
      break;
    case 2: return '中优先级';
      break;
    case 3: return '高优先级';
      break;
  }
}

onMounted(() => {
  console.log('挂载完成');
  children = props.sendData.children
  schedule.value = scheduleFn()
})
onUnmounted(() => {
  console.log('卸载之后');
})
onUpdated(() => {
  console.log('数据发生了更新')
})

</script>

<style lang="scss" scoped>
// 变量
$todo_list_item: v-bind('state.todo_list_item'); // 列表节点 背景色

// .goods-card {
//   margin: 0;
// }

.delete-button {
  height: 100%;
  background-color: #e03131;
  border: none;
  border-radius: 5px;
}

.todo_content {
  width: 96vw;
  background-color: $todo_list_item;
  border-radius: 10px;
  margin: 1.5vh auto;
  box-sizing: border-box;
  padding: 2vh 5vw;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 3px 2px #ddd;
  position: relative;

  .grade {
    // background-color: $gradeColor;
    position: absolute;
    padding: 0.7vh 2vw;
    border-radius: 999px;
    font-size: 12px;
    top: 0;
    left: 3vw;
    transform: translate(0, -50%);
  }

  .left {
    width: 10%;
    color: #d87c43;
  }

  .right {
    width: 90%;

    .content {
      font-size: 18px;
      font-weight: bold;
      color: #33a2ce;
      margin-bottom: 0.5vh;
    }

    .schedule {
      font-size: 14px;
      color: #d87c43;
      margin-bottom: 0.5vh;
    }

    .remark {
      font-size: 15px;
      color: #767676;
    }

    .time {
      transform: translate(0, 50%);
      font-size: 12px;
      color: #767676;
    }
  }


}
</style>
