<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>游戏记录</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-table :columns="columns" :data-source="userList">
        <template slot="action" slot-scope="text, record">
          <div>
            <router-link
                :to="`/records/detail/${record.id}`"
            >详情
            </router-link>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
export default {

  name: "Users",

  data() {
    return {
      columns: [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '获胜方',
          dataIndex: 'winner'
        },
        {
          title: 'mvp玩家',
          dataIndex: 'player.player'
        },
        {
          title: '创建时间',
          dataIndex: 'created_at'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
        }
      ],
      userList: [],
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    getUsers() {
      fetch('http://local.pandakill/api/records', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.userList = result.data
          }
        })
      })
    },
  }
}
</script>

<style scoped>
#breadcrumb {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>