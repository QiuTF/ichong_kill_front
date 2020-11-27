<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>玩家列表</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-table :columns="columns" :data-source="userList">
        <template slot="avatar" slot-scope="text, record">
          <div>
            <a-avatar icon="user" :src="record.avatar"/>
          </div>
        </template>
        <template slot="is_playing" slot-scope="text, record">
          <div>
            <a-switch :checked="record.is_playing === 1 ? true:false" @change="onChange(record.id,record.is_playing)"/>
          </div>
        </template>
        <template slot="action" slot-scope="text, record">
          <div>
            <a href="javascript:;" @click="handleDeleteClick(record)" style="color: red"
               :disabled="is_manage === 'admin' ? false:true">
              删除
            </a>
          </div>
        </template>
      </a-table>
      <a-modal
          v-model="visible"
          :title="id?'编辑玩家':'新增玩家'"
          on-ok="handleOk"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCancel">
            取消
          </a-button>
          <a-button
              key="submit"
              type="primary"
              :loading="loading"
              @click="handleOk"
          >
            保存
          </a-button>
        </template>
        <div style="display: flex; align-items: center; height: 80px">
          <div>玩家姓名：</div>
          <div style="display: flex;flex: 1">
            <a-input
                v-model="player"
                placeholder="请输入玩家姓名"
            />
          </div>
        </div>
      </a-modal>
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
          title: '头像',
          dataIndex: 'avatar',
          scopedSlots: {customRender: 'avatar'},
        },
        {
          title: '姓名',
          dataIndex: 'player'
        },
        {
          title: '游戏中',
          dataIndex: 'is_playing',
          scopedSlots: {customRender: 'is_playing'},
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
      visible: false,
      loading: false,
      userList: [],
      id: null,
      player: '',
      is_manage: window.sessionStorage.getItem('manage'),
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    getUsers() {
      fetch('http://local.pandakill/api/players', {
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
    handleDeleteClick(record) {
      this.$confirm({
        title: '确认操作',
        content: '确认后将无法撤回',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          fetch(`http://local.pandakill/api/players/${record.id}`, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
          }).then((response) => {
            response.json().then((result) => {
              if (response.ok) {
                this.$message.success('删除成功')
                this.getUsers()
              } else {
                this.$message.error(result.message)
              }
            })
          })
        }
      })
    },
    onChange(id, is_playing) {
      fetch(`http://local.pandakill/api/players/${id}?is_playing=${is_playing}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.$message.success('操作成功')
            this.getUsers()
          } else {
            this.$message.error(result.message)
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

.record {
  flex: none;
  margin-bottom: 10px;
}
</style>