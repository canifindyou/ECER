<template>
  <el-dialog title="指令模板管理"
             top="160px"
             :visible.sync="manageOrders"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeAllModel">
    <hr class="boundary">
    <div class="body">
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span>指令模板</span>
        </div>
        <div class="ordersName" v-for="(item,index) in templateData"
             @click="selectOrder(item.id,item.name,index)">
          {{item.name}}
        </div>
        <div class="cardFooter"><i class="el-icon-delete" @click="showDelModel"></i><i class="el-icon-edit"
                                                                                       @click="modifyTemplate"></i>
        </div>
      </el-card>
      <div class="strategyContent">
        <el-table
          :data="tableData"
          height="270px">
          <el-table-column
            type="index"
            prop="id"
            label="编号"
            width="135px"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="name"
            label="指令名称">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <hr class="boundary">
    <del-order :delOrder="delOrder" :delId="selectId" @closeModel="closeModel"></del-order>
    <choose-brand :chooseBrand="chooseBrand" @closeModel="closeModel"></choose-brand>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAllModel">关 闭</el-button>
      <el-button type="success" @click="showBrandsList">导入指令模板</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import delOrder from './orders/delOrder'
  import chooseBrand from './orders/chooseBrand'

  export default {
    components: {
      delOrder,
      chooseBrand
    },
    data () {
      return {
        manageOrders: true,
        selectId: 0,
        key: 0,
        selectName: '',
        delOrder: false,
        chooseBrand: false,
        templateData: [],
        tableData: [],
      }
    },
    methods: {
      // 展示模板列表
      getTempList () {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'templates',
          success (data) {
            console.log(data)
            self.templateData = data
          }
        })
      },

      // 选中预设
      selectOrder (id, name, index) {
        let self = this
        this.selectId = id
        if (index) {
          this.key = index
        }
        this.selectName = name
        this.tableData = []
        this.$nextTick(function () {
          let ordersName = document.getElementsByClassName('ordersName')
          for (let i = 0; i < ordersName.length; i++) {
            let campus = ordersName[i].innerText.replace(/\s/g, '')// 清除按钮导致的回车
            if (name === campus) {//被选中
              ordersName[i].style.background = '#BBB'
            } else {
              ordersName[i].style.background = '#FFF'
            }
          }
        })
        $.ajax({
          type: 'GET',
          url: this.api + 'templates/' + id + '/instructs',
          success (data) {
            self.tableData = data
          }
        })
      },

      // 修改模板名称
      modifyTemplate () {
        let self = this
        // 将需要修改的div被输入框覆盖
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'ordersName')// 设置class属性
        newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
        div[0].insertBefore(newDiv, div[0].childNodes[this.key + 1])// 插入有input框的div
        div[0].childNodes[this.key + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].value = this.selectName// 确保焦点在文字后方
        newDiv.childNodes[0].focus()// input框获取焦点
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newTempName = newDiv.childNodes[0].value// 取值
          if (newTempName) {// 调用修改校区接口
            $.ajax({
              type: 'PUT',
              url: self.api + 'templates/' + self.selectId + '/' + newTempName,
              success (data) {
                self.getTempList()
                newDiv.remove()// 移除div
                div[0].childNodes[self.key + 1].style.display = 'block'// 显示修改后的div
                self.selectName = newTempName
              }
            })
          } else {
            self.$message.error('指令模板名不能为空！')
            newDiv.childNodes[0].focus()
          }
        })
      },

      // 展示删除模态框
      showDelModel () {
        this.delOrder = true
      },

      // 展示批量导入模板
      showBrandsList () {
        this.chooseBrand = true
      },

      // 关闭子级模态框
      closeModel () {
        this.delOrder = false
        this.chooseBrand = false
        this.getTempList()
      },

      closeAllModel () {
        this.manageOrders = false
        this.$emit('closeModel')
      }
    },
    mounted () {
      this.getTempList()
      this.selectOrder(this.templateData[0].id, this.templateData[0].name)
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';

  .el-dialog__wrapper >>> .el-dialog {
    width: 660px;
  }

  .body {
    margin: 15px auto;
    width: 95%;
    height: 280px;
  }

  .cardGroups {
    position: relative;
    float: left;
    margin: 0 0 0 9px;
    width: 33%;
    height: 100%;
    border: 1px solid #BBBBBB;
  }

  .cardGroups >>> .el-card__header {
    font-size: 16px;
    padding: 5px;
    text-align: center;
    background: #E8E8E8;
    border-bottom: 1px solid #BBBBBB;
  }

  .cardGroups >>> .el-card__body {
    height: 100%;
    overflow-y: auto;
    padding: 0;
    text-align: center;
  }

  .ordersName {
    padding: 5px;
    border-bottom: 1px solid #BBBBBB;
  }

  .cardFooter {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #BBBBBB;
  }

  .el-icon-edit {
    float: right;
    margin: 5px 0;
    font-size: 20px;
    color: #78AC3C;
  }

  .el-icon-delete {
    float: right;
    margin: 5px 7px 5px 5px;
    font-size: 20px;
    color: #AC3C3C;
  }

  .strategyContent {
    float: right;
    margin: 0 9px 0 0;
    width: 61%;
    height: 100%;
    overflow-y: auto;
    border: 1px solid #BBBBBB;
    border-radius: 4px;
  }

  .el-dialog__wrapper >>> .el-table th.is-leaf {
    text-align: center;
    font-size: 14px;
    padding: 3px;
    border-bottom: 1px solid #BBBBBB;
  }

  .el-dialog__wrapper >>> .el-table td {
    text-align: center;
    font-size: 14px;
    padding: 5px 0;
    border-bottom: 1px solid #BBBBBB;
    word-break: keep-all;
    white-space: nowrap;
  }

  .el-button--default, .el-button--success {
    margin: 0;
    border-radius: 8px;
    font-size: 15px;
  }

  .el-button--default {
    padding: 10px 26px;
  }

  .el-button--success {
    float: left;
    padding: 10px 15px;
  }
</style>

<style>
  .ordersName {
    padding: 5px;
    border-bottom: 1px solid #BBBBBB;
  }

  input {
    width: 50%;
    padding: 0 0 3px 3px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #BBB;
    outline: none;
  }
</style>
