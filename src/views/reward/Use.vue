<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>身份使用记录</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-table :columns="columns" :data-source="rewardUseList">
        <template slot="action" slot-scope="text, record">
          <div>
            <a href="javascript:;" @click="handleDeleteClick(record)" style="color: red"
               :disabled="is_manage === 'admin' ? false:true">
              删除
            </a>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
export default {

  name: "RewardUse",

  data() {
    return {
      columns: [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '姓名',
          dataIndex: 'player.player'
        },
        {
          title: '使用角色',
          dataIndex: 'role.name'
        },
        {
          title: '使用时间',
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
      rewardUseList: [],
      is_manage: window.sessionStorage.getItem('manage'),
    }
  },

  created() {
    this.getRewardUse()
  },

  methods: {
    getRewardUse() {
      fetch('http://local.pandakill/api/reward/use', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.rewardUseList = result.data
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
          fetch(`http://local.pandakill/api/reward/use/${record.id}`, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
          }).then((response) => {
            response.json().then((result) => {
              if (response.ok) {
                this.$message.success('删除成功')
                this.getRewardUse()
              } else {
                this.$message.error(result.message)
              }
            })
          })
        }
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