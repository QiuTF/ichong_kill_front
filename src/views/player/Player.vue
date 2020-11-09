<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>全部游戏详情</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-col>
        <template>
          <div class="record">
            <a-button type="primary" @click="showModal">新增对局</a-button>
            <a-modal
                title="新增对局"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
            >
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
              </a-table>
            </a-modal>
          </div>
        </template>
      </a-col>
      <a-table :columns="columns" :data-source="userList">
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
          title: '游戏记录id',
          dataIndex: 'record_id'
        },
        {
          title: '玩家ID',
          dataIndex: 'player_id'
        },
        {
          title: '玩家姓名',
          dataIndex: 'player.player'
        },
        {
          title: '玩家角色',
          dataIndex: 'player_role'
        },
        {
          title: '角色属性',
          dataIndex: 'role_type'
        },
        {
          title: '对局得分',
          dataIndex: 'score'
        },
        {
          title: '创建时间',
          dataIndex: 'created_at'
        },
      ],
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
      ],
      userList: [],
      playerList: [],
      role: {},
      roles: [],
      visible: false,
      confirmLoading: false,
      mvp: {},
    }
  },

  mounted() {
    this.getRoles()
  },

  created() {
    this.getUsers()
    this.getPlayers()
  },

  methods: {
    getUsers() {
      fetch('http://local.pandakill/api/player/records', {
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
    getPlayers() {
      fetch('http://local.pandakill/api/players', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.playerList = result.data
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
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      fetch('http://local.pandakill/api/records', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({role: this.role, mvp: this.mvp}),
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.$message.success('新增成功')
            this.visible = false
            this.getUsers()
          } else {
            this.$message.error(result.message)
            this.visible = false
          }
        })
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    handleChange(record) {
      console.log(this.role)
    },
  }
}
</script>

<style scoped>
#breadcrumb {
  margin-top: 0;
  margin-bottom: 10px;
}

.record {
  flex: none;
  margin-bottom: 10px;
}
</style>