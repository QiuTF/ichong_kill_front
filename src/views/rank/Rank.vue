<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>rank排行榜</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-table :columns="columns" :data-source="userList">
        <template slot="name" slot-scope="text, record">
          <div>
            {{ record.player }}
            <a-tag color="red" v-if="record.countsnum.fails > 2">
              {{ record.countsnum.fails }}连败
            </a-tag>
            <a-tag color="green" v-if="record.countsnum.wins > 2">
              {{ record.countsnum.wins }}连胜
            </a-tag>
          </div>
        </template>
        <template slot="rate" slot-scope="text, record">
          <div>
            {{ record.rate + '%' }}
          </div>
        </template>
        <template slot="action" slot-scope="text, record">
          <div>
            <router-link
                :to="`/rank/detail/${record.player_id}`"
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
          dataIndex: 'player_id'
        },
        {
          title: '玩家姓名',
          dataIndex: 'player',
          scopedSlots: {customRender: 'name'},
        },
        {
          title: '玩家总得分',
          dataIndex: 'score'
        },
        {
          title: '胜场',
          dataIndex: 'wins'
        },
        {
          title: '负场',
          dataIndex: 'fail'
        },
        {
          title: '胜率',
          dataIndex: 'rate',
          scopedSlots: {customRender: 'rate'},
        },
        {
          title: 'mvp次数',
          dataIndex: 'mvp'
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
      fetch('http://local.pandakill/api/rank', {
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
    }
  }
}
</script>

<style scoped>
#breadcrumb {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>