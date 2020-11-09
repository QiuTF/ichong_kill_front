<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a-tag color="#87d068">
            {{ player }}
          </a-tag>
          游戏记录
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-table :columns="columns" :data-source="userList">
        <template slot="player" slot-scope="text, record">
          <div>
            {{
              record.player.player
            }}
            <a-tag color="#87d068" v-if="record.score === 2">mvp
            </a-tag>
          </div>
        </template>
        <template slot="action" slot-scope="text, record">
          <div>
            <a-tag :color="record.score === 0 ? 'red' : 'green'">{{
                record.score === 0 ? '失败' : '胜利'
              }}
            </a-tag>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
export default {

  name: "rankDetail",

  data() {
    return {
      columns: [
        {
          title: '玩家id',
          dataIndex: 'player_id'
        },
        {
          title: '玩家姓名',
          dataIndex: 'player',
          scopedSlots: {customRender: 'player'},
        },
        {
          title: '游戏记录id',
          dataIndex: 'record_id'
        },
        {
          title: '玩家角色',
          dataIndex: 'player_role'
        },
        {
          title: '角色类型',
          dataIndex: 'role_type'
        },
        {
          title: '对局得分',
          dataIndex: 'score',
        },
        {
          title: '对局结果',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
        }
      ],
      userList: [],
      player: ''
    }
  },

  created() {
    this.getRankDetail()
  },

  methods: {
    getRankDetail() {
      fetch(`http://local.pandakill/api/rank/detail/${this.$route.params.id}`, {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.userList = result.data
            this.player = result.data[0].player.player
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