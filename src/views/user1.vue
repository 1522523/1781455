<template>
  <div class="manage">
    
    <el-dialog
        :title="operateType === 'add' ? '新增' : '更新'"
        :visible="isShow"><!--.sync是一个双向绑定的属性，但是由于不能属性突变将。sync去掉-->
        <!-- 表单组件 -->
      <common-form
          :form-label="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
      ></common-form>

      <div  class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>

    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <!-- 搜索框 -->
      <common-form
          :form-label="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table
        :table-data="tableData"
        :table-label="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
    ></common-table>

  </div>
</template>

<script>
import CommonForm from '../../src/components/CommonForm'
import CommonTable from "../../src/components/CommonTable"
//调用接口getuser
import {getUser} from "../../api/data"

export default {
  name: 'User',
  data() {
    return {
      operateType: 'add',
      isShow: false,
      //数组中有几个对象就表示要利用公用表单组件创造出多少个小对象（可能是input型的也可能是其他类型的）
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],

      //对应传过来的参数：row,指的是table中的一行内容
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      },


      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      //搜索框对象
      searchForm: {
        keyword: ''
      },

      //table中的内容，是一个数组
      tableData: [],

      //table的列名
      tableLabel: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'sexLabel',
          label: '性别',
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        },
      ],
      //下方的分页实现
      config: {
        page: 1,
        total: 30,
        loading:false,
      },
    }
  },
  components: {
    CommonForm,
    CommonTable,
  },

  methods: {

    confirm() {
      //向接口发送数据，并打印出接口返回出来的数据
      //this在这里表示的是向表单中填入的东西（表单对象） 
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(this)
          this.isShow = false
          //等同于getList(this)
          this.getList() 
        })
      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },


    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      }
    },

    //向接口请求table表格数据
    getList(name = '') {
      //表示是否显示加载状态。
      this.config.loading = true
      //如果表单对象不为空的话，就从第一页开始
      name ? (this.config.page = 1) : ''
      //调用接口（向接口传入一个对象）
      getUser({
        page: this.config.page,
        name
      }).then(({data: res}) => {//接口返回的 res是一个对象，表示的编辑或者删除操作之后，表格中的内容
        //res:{code: 20000, count: 200, list: Array(20) count是指总数，list中是一页中的20条数据
        //js高阶函数map:
        console.log(res);
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        //在编辑或者删除过后，重新定义总数据数 total
        this.config.total = res.count
        this.config.loading = false
      })
    },


    editUser(row) {
      this.isShow = true
      this.operateType = 'edit'
      console.log(row)
      //row指的是table中的要操作的哪一行的内容，是一个对象（编辑或者删除）
      //写这句话的目的是使编辑对话框弹出的时候input里就有内容
      this.operateForm = row  
    },

    delUser(row) {
      this.$confirm('此操作将永久删除此组件，是否继续？','提示', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id
        this.$http.post('/user/del',{
          id: id
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
  },
  //生命周期函数
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>