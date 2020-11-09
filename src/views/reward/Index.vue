<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>赛季奖励</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-col>
        <template>
          <div class="record" v-show="is_manage === 'admin' ? true:false">
            <a-button type="primary" @click="showModal">编辑奖励</a-button>
          </div>
        </template>
      </a-col>
      <a-table :columns="columns" :data-source="rewardList">
        <template slot="action" slot-scope="text, record">
          <div>
            <a href="javascript:;" @click="showModal(record)" :disabled="is_manage === 'admin' ? false:true">
              编辑
            </a>
          </div>
        </template>
      </a-table>
      <a-modal
          v-model="visible"
          :title="id?'编辑奖励':'新增奖励'"
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
            <a-select
                v-model="player_id"
                allowClear
                placeholder="请选择玩家"
                :options="player"
                style="width: 100%"
            />
          </div>
        </div>
        <div style="display: flex; align-items: center; height: 80px">
          <div>身份次数：</div>
          <div style="display: flex;flex: 1">
            <a-input
                v-model="amount"
                placeholder="请输入身份次数"
            />
          </div>
        </div>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
export default {

  name: "Reward",

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
          title: '奖励类型',
          dataIndex: 'type'
        },
        {
          title: '使用次数',
          dataIndex: 'amount',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
        }
      ],
      visible: false,
      loading: false,
      rewardList: [],
      player: [],
      id: null,
      player_id: '',
      amount: '',
      is_manage: window.sessionStorage.getItem('manage'),
    }
  },

  created() {
    this.getReward()
  },
  mounted() {
    this.getPlayerList()
  },
  methods: {
    getReward() {
      fetch('http://local.pandakill/api/reward', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.rewardList = result.data
          }
        })
      })
    },
    showModal(record) {
      this.id = record.id
      this.player_id = record.player_id
      this.amount = record.amount
      this.visible = true
    },
    handleCancel(e) {
      this.visible = false
    },
    handleOk(e) {
      this.loading = true

      fetch('http://local.pandakill/api/reward', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({id: this.id, player_id: this.player_id, amount: this.amount}),
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.$message.success(this.id ? '修改成功' : '新增成功')
            this.getReward()
          } else {
            this.$message.error(result.message)
          }
        })
      })
      this.visible = false
      this.loading = false
    },
    getPlayerList() {
      fetch('http://local.pandakill/api/player/select', {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            const data = []

            result.data.forEach((item) => {
              data.push({
                key: item.id,
                label: item.player,
              })
            })
            this.player = data
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