<template>
  <el-dialog title="设备品牌管理"
             top="125px"
             :visible.sync="manageBrands"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeAllModel">
    <hr class="boundary">
    <el-table
      :data="brandData"
      height="270px"
      style="width: 90%">
      <el-table-column
        type="index"
        prop="id"
        label="编号"
        width="135px"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="brandName"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="modelName"
        label="型号"
        width="110px"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180px">
        <template slot-scope="scope">
          <el-button size="small" @click="showModifyModel(scope.$index,scope.row.id)">修 改</el-button>
          <el-button size="small" type="danger" @click="showDelModel(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr class="boundary">
    <add-brand :addBrand="addBrand" @showBrandsList="showBrandsList" @closeModel="closeModel"></add-brand>
    <modify-brand :modifyBrand="modifyBrand" :modifyInfo="modifyInfo" @showBrandsList="showBrandsList" @closeModel="closeModel"></modify-brand>
    <del-brand :delBrand="delBrand" :delId="delId" @showBrandsList="showBrandsList" @closeModel="closeModel"></del-brand>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAllModel">关 闭</el-button>
      <el-button type="success" @click="showAddModel">添 加</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import addBrand from './brands/addBrand'
  import modifyBrand from './brands/modifyBrand'
  import delBrand from './brands/delBrand'

  export default {
    components: {
      addBrand,
      modifyBrand,
      delBrand
    },
    data () {
      return {
        manageBrands: true,
        addBrand: false,
        modifyInfo: {},
        modifyBrand: false,
        delId: 0,
        delBrand: false,
        brandData: []
      }
    },
    methods: {
      showBrandsList () {
        let self = this
        $.ajax({
          type: 'GET',
          url: 'http://172.16.211.75:8080/models',
          async:false,
          success (data) {
            self.brandData = data
          },
          error () {
            console.log('error')
          }
        })
      },

      showAddModel () {
        this.addBrand = true
      },

      showModifyModel (key, id) {
        this.modifyInfo = {
          'id': id, 'brandName': this.brandData[key].brandName, 'modelName': this.brandData[key].modelName
        }
        this.modifyBrand = true
      },

      showDelModel (id) {
        this.delId = id
        this.delBrand = true
      },

      closeModel () {
        this.addBrand = false
        this.modifyId = 0
        this.modifyBrand = false
        this.delId = 0
        this.delBrand = false
      },

      closeAllModel () {
        this.manageBrands = false
        this.$emit('closeModel')
      }
    },
    mounted () {
      this.showBrandsList()
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';

  .el-dialog__wrapper >>> .el-dialog {
    width: 655px;
  }

  .el-table--fit {
    margin: 10px auto;
    border: 1px solid #BBBBBB;
  }

  .el-dialog__wrapper >>> .el-table th.is-leaf {
    text-align: center;
    font-size: 16px;
    padding: 7px;
    border-bottom: 1px solid #BBBBBB;
  }

  .el-dialog__wrapper >>> .el-table td {
    text-align: center;
    font-size: 16px;
    padding: 7px 0;
    border-bottom: 1px solid #BBBBBB;
    word-break: keep-all;
    white-space: nowrap;
  }

  .el-button--success {
    float: left;
  }

  .el-dialog__footer .el-button--default, .el-button--success {
    margin: 0;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 26px;
  }
</style>
