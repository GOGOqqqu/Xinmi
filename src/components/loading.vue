<template>
    <Teleport to="body">
        <van-toast v-model:show="state.showLoading" style="padding: 0">
            <template #message>
                <div class="toast">
                    <div class="icon">
                        <van-loading />
                    </div>
                    <div class="text">正在加载中</div>
                </div>
            </template>
        </van-toast>
    </Teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";
//import { 使用的函数名 } from '@vueuse/core'   //引入vueuse中的函数使用
import { useState } from "@/stores";  //引入pinia
//console.log('setup执行了');




const state = useState()  //创建仓库实例 可直接调用pinia的方法修改state

</script>

<style lang="scss" scoped>
.toast {
    display: flex;
    width: 40vmin;
    height: 40vmin;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;

    .text {
        margin-top: 2vh;
        font-size: 4vmin;
    }
}
</style>