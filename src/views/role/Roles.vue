<template>
  <div>
    <div id="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>角色列表</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <a-col>
        <template>
          <div class="record" v-show="is_manage === 'admin' ? true:false">
            <a-button type="primary" @click="showModal">新增角色</a-button>
          </div>
        </template>
      </a-col>
      <a-table :columns="columns" :data-source="userList">
        <template slot="action" slot-scope="text, record">
          <div>
            <a href="javascript:;" @click="showModal(record)" :disabled="is_manage === 'admin' ? false:true">
              编辑
            </a>
            <a href="javascript:;" @click="handleDeleteClick(record)" style="color: red"
               :disabled="is_manage === 'admin' ? false:true">
              删除
            </a>
          </div>
        </template>
      </a-table>
      <a-modal
          v-model="visible"
          :title="id?'编辑角色':'新增角色'"
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
          <div>角色名称：</div>
          <div style="display: flex;flex: 1">
            <a-input
                v-model="role"
                placeholder="请输入角色名称"
            />
          </div>
        </div>
        <div style="display: flex; align-items: center; height: 80px">
          <div>角色属性：</div>
          <div style="display: flex;flex: 1">
            <a-select style="width: 100%" @change="handleChange">
              <a-select-option value="1">
                坏人
              </a-select-option>
              <a-select-option value="2">
                好人
              </a-select-option>
            </a-select>
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
          title: '角色',
          dataIndex: 'name'
        },
        {
          title: '角色属性',
          dataIndex: 'role_type',
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
      visible: false,
      loading: false,
      id: null,
      role: '',
      role_type: null,
      is_manage: window.sessionStorage.getItem('manage'),
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    getUsers() {
      fetch('http://local.pandakill/api/roles', {
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
    showModal(record) {
      this.id = record.id
      this.role = record.name
      this.visible = true
    },
    handleCancel(e) {
      this.visible = false
    },
    handleOk(e) {
      this.loading = true

      fetch('http://local.pandakill/api/roles', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({id: this.id, role: this.role, role_type: this.role_type}),
      }).then((response) => {
        response.json().then((result) => {
          if (response.ok) {
            this.$message.success(this.id ? '修改成功' : '新增成功')
            this.getUsers()
          } else {
            this.$message.error(result.message)
          }
        })
      })

      this.visible = false
      this.loading = false
    },
    handleDeleteClick(record) {
      this.$confirm({
        title: '确认操作',
        content: '确认后将无法撤回',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          fetch(`http://local.pandakill/api/roles/${record.id}`, {
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
    handleChange(value) {
      this.role_type = value
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