import { defineStore } from "pinia";
import { todoType } from '@/utils/Type'

export const userTodo = defineStore('userTodo', {
    state: () => {
        return {

            Inventories: ['默认', '清单1'], // 该时间内有什么清单表
            todoList: [
                {
                    id: '123456',
                    inventory: '默认', // 所属清单(不填 => 默认)
                    content: '主要内容 - 默认', // 在外面显示(简略描述目标哦, 必填)
                    remark: '', // 添加备注(选填)
                    creationDate: '2023-01-08', // 创建日期
                    creationTime: '22:27:44', // 创建时间
                    state: false,
                    grade: 0, // 优先级 (默认0 无优先级)
                    children: [ // 子目标(选填)
                        {
                            content: '任务内容',
                            state: false
                        },
                        {
                            content: '任务内容',
                            state: false
                        },
                    ],
                },
                {
                    id: '9874',
                    inventory: '清单1', // 所属清单(不填 => 默认)
                    content: '主要内容 - 默认', // 在外面显示(简略描述目标哦, 必填)
                    remark: '备注备注注备注一下下', // 添加备注(选填)
                    creationDate: '2023-05-08', // 创建日期
                    creationTime: '22:27:44', // 创建时间
                    state: false,
                    grade: 3, // 优先级 (默认0 无优先级)
                    children: [ // 子目标(选填)
                        {
                            content: '任务内容',
                            state: true,
                        },
                        {
                            content: '任务内容',
                            state: false,
                        },
                    ],
                },
                {
                    id: '12111',
                    inventory: '清单1', // 所属清单(不填 => 默认)
                    content: '主要内容 - 默认', // 在外面显示(简略描述目标哦, 必填)
                    remark: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注', // 添加备注(选填)
                    creationDate: '2023-05-08', // 创建日期
                    creationTime: '22:27:44', // 创建时间
                    state: false,
                    grade: 2, // 优先级 (默认0 无优先级)
                    children: [ // 子目标(选填)
                    ],
                },

            ]


        }
    },

    getters: {

    },

    actions: {
        todoFilter(id: string) {
            console.log('点击过滤', id)
            // let temp = this.todoList.data.findIndex(t => {
            //     return t.id == id
            // })
            // console.log('temp', temp)
            console.log('this.todoList.data[0]', this.todoList[1])
        },
        // todo的删除
        deleteTodo(id: string) {
            console.log('点击删除', id)
            let temp: todoType[] = []
            this.todoList.map(t => {
                if (t.id == id) {
                    return
                }
                temp = [...temp, t]
            })
            this.todoList = temp
        },
        clickTodo(id: string) {
            console.log('点击了一个todo', id)
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ['todoList', 'Inventories']
            },
        ]
    }
})