<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="S1角色胜率" :bordered="false" hoverable>
          <a-table :columns="roleColumns" :data-source="roleList" :pagination="false">
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="S1赛季奖励" :bordered="false">
          <a-table :columns="chooseColumns" :data-source="chooseList" :pagination="false">
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="S1赛季结算" :bordered="false">
          <a-table :columns="endColumns" :data-source="endList" :pagination="false">
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      icon: require('../assets/headerBG.png'),
      endList: [
        {
          index: '第一名',
          name: '唐峰'
        },
        {
          index: '第二名',
          name: '汪俊'
        },
        {
          index: '第三名',
          name: '荔枝'
        }
      ],
      endColumns: [
        {
          title: '排名',
          dataIndex: 'index'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
      ],
      chooseList: [
        {
          index: '第一名',
          times: 8
        },
        {
          index: '第二名',
          times: 5
        },
        {
          index: '第三名',
          times: 3
        }
      ],
      chooseColumns: [
        {
          title: '排名',
          dataIndex: 'index'
        },
        {
          title: '选择身份次数',
          dataIndex: 'times'
        },
      ],
      roleList: [
        {
          index: '第一名',
          role: '狼人'
        },
        {
          index: '第二名',
          role: '守卫'
        },
        {
          index: '第三名',
          role: '预言家'
        }
      ],
      roleColumns: [
        {
          title: '排名',
          dataIndex: 'index'
        },
        {
          title: '角色',
          dataIndex: 'role'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>