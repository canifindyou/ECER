<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="showDialog"
      width="650px"
      style="border-bottom: 1px #eee solid;"
      @close="close"
    >
      <ul class="dialogContent">
        <li class="dialogContentItem">
          <span class="dItemText">校区:</span>
          <template>
            <el-select
              v-model="selectSchool"
              placeholder="请选择"
              @focus="selectSchools"
              size="small"
            >
              <el-option
                v-for="item in selectSchoolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">楼栋:</span>
          <template>
            <el-select
              v-model="selectBuild"
              :disabled=" selectSchool == ''"
              @focus="selectbuildings"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in selectBuildOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">楼层:</span>
          <template>
            <el-select v-model="selectFloor"
                       :disabled=" selectBuild == ''"
                       @focus="selectFloors"
                       placeholder="请选择" size="small">
              <el-option
                v-for="item in selectFloorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">教室:</span>
          <template>
            <el-select v-model="selectRooms"
                       :disabled=" selectFloor == ''"
                       @focus="selectRoom"
                       placeholder="请选择" size="small">
              <el-option
                v-for="item in selectRoomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">品牌:</span>
          <template>
            <el-select
              v-model="addBrand"
              placeholder="请选择"
              size="small"
              @focus="selectBrand"

            >
              <el-option
                v-for="item in addBrandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">型号:</span>
          <template>
            <el-select v-model="addType"
                       :disabled=" addBrand == ''"
                       @focus="selectType"
                       placeholder="请选择" size="small">
              <el-option
                v-for="item in addTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText numStyle">空调编号:</span>
          <el-input
            v-model="editnum"
            placeholder="请输入内容"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText ipStyle">空调IP:</span>
          <el-input
            v-model="editip"
            placeholder="请输入内容"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText ipStyle">端口号:</span>
          <el-input
            v-model="editport"
            placeholder="请输入内容"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
        <li class="dialogContentItem ">
          <span class="dItemText nameStyle">空调名称:</span>
          <el-input
            v-model="editname"
            placeholder="请输入内容"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {

    props: {
      showDialog: {type: Boolean, defulault: false},
      school: {type: String, defulault: '456'},
      build: {type: String, defulault: ''},
      floor: {type: String, defulault: ''},
      room: {type: String, defulault: ''},
      brand: {type: String, defulault: ''},
      type: {type: String, defulault: ''},
      editid: {type: String, defulault: ''},
      editip: {type: String, defulault: ''},
      editname: {type: String, defulault: ''},
      editport: {type: String, defulault: ''},
      editnum: {type: String, defulault: ''}
    },

    data () {
      return {
        showEdit: this.showDialog,
        id: '',
        ip: '',
        name: '',
        port: '',
        num: '',
        test: '123',
        loading: true,
        addBrandOptions: '', //品牌下拉框选择
        addTypeOptions: '', //型号下拉框选择
        selectRoomOptions: '', //教室下拉框选择
        selectFloorOptions: '', //楼层下拉框选择
        selectBuildOptions: '', //楼栋下拉框选择
        selectSchoolOptions: '', //校区下拉框选择
        selectFloor: '',
        selectBuild: '',
        selectSchool: '',
        selectRooms: '',
        addType: '',
        addBrand: ''
      }
    },
    mounted () {
      if (sessionStorage.getItem('jsessionid') != null) {
        this.cookieCode = 'jsessionid=' + sessionStorage.getItem('jsessionid')
      }
      if (this.cookieCode !== '') {
        this.id = this.editid
      }
    },

    methods: {
      initOptions2 ($event) {
        //设置结束时间时间范围
        console.log($event.getTime())
        console.log(Date.now())
        this.pickerOptions2 = {
          disabledDate (time) {
            return time.getTime() < $event.getTime() - 8.64e7 + 1
          }
        }
      },
      searchClick () {
      },
      selectSchools (e) {
        //校区下拉框数据加载
        this.selectSchoolOptions = []
        this.selectBuildOptions = []
        this.selectFloorOptions = []
        this.selectFloor = ''
        this.selectBuild = ''
        this.selectRoomOptions = []
        this.selectRooms = ''
        this.constructData('schoolZones', this.selectSchoolOptions)
      },
      selectbuildings () {
        //楼栋下拉框数据加载
        this.addFloorOptions = [];
        (this.addFloor = ''), //楼层
          (this.addBuildingOptions = [])
        this.addRoomOptions = []
        this.addRoom = ''
        this.constructData('buildings', this.selectBuildOptions, {
          zoneId: this.selectSchool
        })
      },
      selectFloors (params) {
        //楼层下拉数据加载
        this.selectFloorOptions = []
        this.selectRoomOptions = []
        this.selectRooms = ''
        this.pubilcFnAxios(`buildings/floors/${this.selectBuild}`, {})
          .then(data => {
            console.log(data)
            for (let i = 1; i < data + 1; i++) {
              this.selectFloorOptions.push({label: i + 'F', value: i})
            }
          })
          .catch(() => {
            console.log('请求失败')
          })
      },
      selectRoom () {
        //加载教室下拉框数据
        this.selectRoomOptions = []
        this.constructData(
          `rooms/${this.selectBuild}/${this.selectFloor}`,
          this.selectRoomOptions,
          {}
        )
      },
      selectBrand () {
        //加载品牌列表
        this.addBrandOptions = []
        this.addTypeOptions = []
        this.addType = ''
        this.pubilcFnAxios('models/brands', {})
          .then(data => {
            for (let i = 0; i < data.length; i++) {
              this.addBrandOptions.push({label: data[i], value: data[i]})
            }
          })
          .catch(() => {
            console.log('请求失败')
          })
      },
      selectType () {
        //加载型号
        this.addTypeOptions = []
        this.constructData(`/models/${this.addBrand}`, this.addTypeOptions, {})
      },

      constructData (urlString, obj, params) {
        //构造下拉菜单数据结构
        this.pubilcFnAxios(urlString, params)
          .then(data => {
            console.log(data)
            data.forEach(item => {
              obj.push({
                value: item.id,
                label: item.name || item.modelName
              })
            })
          })
          .catch(() => {
            console.log('请求失败')
          })
      },

      pubilcFnAxios (urlString, params, method) {
        //公用axios数据请求
        return new Promise((resolve, reject) => {
          axios.get(this.api + urlString, {
            params: params,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
          }).then(res => {
            resolve(res.data)
          }).catch(err => {
            reject('get请求错误')
          })
        })
      },

      close () {
        this.$emit('editClose') //通过父组件中的值改变子组件中值，避免意外错误
        // console.log(123)
      },
      submit () {
        this.$emit('editClose')
      },
      cancel () {
        this.$emit('editClose')
      },
      getData () {
      },
      loadingBrand (el) {
        this.getData()
      }
    }
  }
</script>

<style scoped>
  .dialogContent {
    /* background: red; */
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .dialogContent .dialogContentItem {
    height: 30px;
    margin: 0 0 20px 0;
  }

  .dialogContent .dialogContentItem .dItemText {
    margin-right: 15px;
  }

  .numStyle {
    margin: 0 0 20px -27px;
  }

  .ipStyle {
    margin: 0 0 20px -15px;
  }

  .nameStyle {
    margin: 0 0 20px -29px;
  }
</style>
