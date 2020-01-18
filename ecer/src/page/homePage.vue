<template>
  <div>
    <!--  <el-container style="height: 100%">-->
    <router-view name="top"></router-view>
    <el-container style="">
      <router-view name="aside" @chooseModel="chooseModel" ref="changeCSS"></router-view>
      <el-main>
        <!--        <router-view/>-->
        <router-view></router-view>
        <manage-teaching-staffs v-if="showStaffsModel" @closeModel="closeModel"></manage-teaching-staffs>
        <manage-groups v-if="showGroupsModel" @closeModel="closeModel" @updateNav="updateNav"></manage-groups>
        <manage-strategies v-if="showStrategiesModel" @closeModel="closeModel"></manage-strategies>
        <manage-brands v-if="showBrandsModel" @closeModel="closeModel"></manage-brands>
        <manage-orders v-if="showOrdersModel" @closeModel="closeModel"></manage-orders>
        <global-control v-if="showGlobalControl" @closeModel="closeModel"></global-control>

      </el-main>
    </el-container>
    <!--  </el-container>-->
  </div>
</template>

<script>
  import manageTeachingStaffs from './setting/manageTeachingStaffs'
  import manageGroups from './setting/manageGroups'
  import manageStrategies from './setting/manageStrategies'
  import manageBrands from './setting/manageBrands'
  import manageOrders from './setting/manageOrders'
  import globalControl from './setting/globalControl'

  export default {
    name: 'homePage',
    components: {
      manageTeachingStaffs,
      manageGroups,
      manageStrategies,
      manageBrands,
      manageOrders,
      globalControl,

    },
    data () {
      return {
        count: 0,
        cookieCode: '',
        showStaffsModel: false,
        showGroupsModel: false,
        showStrategiesModel: false,
        showBrandsModel: false,
        showOrdersModel: false,
        showGlobalControl: false
      }
    },
    methods: {
      chooseModel (controlName) {
        if (controlName === 'manageTeachingStaffs') {
          this.showStaffsModel = true
        } else if (controlName === 'manageGroups') {
          this.showGroupsModel = true
        } else if (controlName === 'manageStrategies') {
          this.showStrategiesModel = true
        } else if (controlName === 'manageBrands') {
          this.showBrandsModel = true
        } else if (controlName === 'manageOrders') {
          this.showOrdersModel = true
        } else if (controlName === 'globalControl') {
          this.showGlobalControl = true
        }
      },

      updateNav () {
        this.$refs.changeCSS.initLeftNav()
      },

      closeModel () {
        this.showStaffsModel = false
        this.showGroupsModel = false
        this.showStrategiesModel = false
        this.showBrandsModel = false
        this.showOrdersModel = false
        this.showGlobalControl = false
        // this.$emit('chooseModel')
        this.$refs.changeCSS.changeCss()
      },

      getUrlParam (sUrl, sKey) {
        var left = sUrl.indexOf('=') + 1
        var parasString = sUrl.slice(left)
        console.log(parasString)
        return parasString
      }
    },
  }
</script>

<style scoped>
  .el-main {
    padding: 0;
    left: 180px;
    background: #eee;
    position: absolute;
    top: 80px;
    bottom: 0;
    right: 0;
    min-width: 844px;
    overflow: hidden;
  }
</style>
