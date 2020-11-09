<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a-button type="danger" @click="handleEndGame">结束游戏</a-button>
          <a-tooltip placement="topLeft" title="Prompt Text">
            当前游戏中人数：{{ playerNum }}
          </a-tooltip>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-table :columns="playerscolumns" :data-source="playerList" :pagination="false"
             size="small">
      <template slot="action" slot-scope="text, record">
        <div>
          <a-select
              v-model="role[record.id]"
              allowClear
              placeholder="请选择角色"
              style="width: 200px"
              :options="roles"
              @change="handleChange(record)">
          </a-select>
        </div>
      </template>
      <template slot="action1" slot-scope="text, record">
        <div>
          <a-radio v-model="mvp[record.id]"></a-radio>
        </div>
      </template>
      <template slot="action2" slot-scope="text, record">
        <div>
          <a-radio v-model="reward[record.id]" v-if="record.reward && record.reward.amount > 0"></a-radio>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {

  name: "Game",

  data() {
    return {
      playerscolumns: [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '游戏玩家',
          dataIndex: 'player'
        },
        {
          title: '游戏角色',
          dataIndex: 'player_id',
          scopedSlots: {customRender: 'action'},
        },
        {
          title: 'mvp',
          dataIndex: 'mvp_id',
          scopedSlots: {customRender: 'action1'},
        },
        {
          title: '选择身份',
          dataIndex: 'reward_id',
          scopedSlots: {customRender: 'action2'},
        },
      ],
      playerList: [],
      role: {},
      roles: [],
      mvp: {},
      reward: {},
      playerNum: 0
    }
  },

  mounted() {
    this.getRoles()
  },

  created() {
    this.getPlayers()
  },

  methods: {
    getPlayers() {
      fetch('http://local.pandakill/api/playing/players', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.playerList = result.data
            this.playerNum = result.data.length
          }
        })
      })
    },
    getRoles() {
      fetch('http://local.pandakill/api/roles', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            result.data.forEach((item) => {
              this.roles.push({
                label: item.name,
                key: item.id,
              })
            })
          }
        })
      })
    },
    handleEndGame() {
      this.$confirm({
        title: '确认操作',
        content: '确定结束游戏',
        onOk: () => fetch('http://local.pandakill/api/records', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
          },
          body: JSON.stringify({role: this.role, mvp: this.mvp, reward: this.reward}),
        }).then((response) => {
          response.json().then((result) => {
            if (response.ok) {
              this.$message.success('游戏已结束')
              this.$router.replace({path: '/records'})
            } else {
              this.$message.error('保存失败')
            }
          })
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