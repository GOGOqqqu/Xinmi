<template>
  <main>
    <div class="date_card">

      <div class="data_time">
        {{ state.now }} - {{ state.weekC }}
      </div>

      <div class="target_num">
        该清单已经完成0个待办事项 (共5个)
      </div>

      <van-progress :percentage="50" :show-pivot="false" color="#ffffffB3" track-color="#0000001a" />

    </div>

    <div class="todo_list" ref="parent">
      <template v-auto-animate v-for="item in piniaTodo.todoList" :key="item.id">
        {{ selectInventories == item.inventory }}
        <div class="todo_item" v-if="item.state">
          <todoItem :sendData="item"></todoItem>
        </div>
      </template>
    </div>

  </main>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, reactive, watch, watchEffect } from "vue";
import todoItem from '@/components/planning/todoItem.vue'
// import _ from 'lodash'
import { userTodo } from '@/stores/todo'
import { useState } from "@/stores";
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const state = useState()
const piniaTodo = userTodo()
//===================================================
const [parent] = useAutoAnimate()
let selectInventories = ref('默认') // 被选中的清单
let showTodo = reactive({}) // 展示的todo

// ===================================================

onMounted(() => {
  console.log('挂载完成');

  showTodo = [...piniaTodo.todoList]
  console.log('showTodo', showTodo)
})
onUnmounted(() => {
  console.log('卸载之后');
})
onUpdated(() => {
  console.log('数据发生了更新')
})

</script>

<style lang="scss" scoped>
$todo_list: v-bind('state.todo_list'); // ;列表背景色
$todo_list_caed: v-bind('state.todo_list_caed'); // 时间卡片背景色

main {
  height: calc(100vh - 50px - 5vh);
  background-color: $todo_list;
  overflow: scroll;
  color: #fff;

  .date_card {
    width: 96vw;
    height: 15vh;
    background: linear-gradient($todo_list_caed);
    margin: 1vh auto;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 2vh 5vw;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    justify-content: space-around;

    .data_time {
      font-size: 20px;
    }

    .target_num {
      font-size: 14px;
    }
  }
}
</style>
