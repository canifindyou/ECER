<template>
  <div>
    <!--  <el-container style="height: 100%">-->
    <router-view name="top"></router-view>
    <el-container>
      <router-view name="aside" @chooseModel="chooseModel"></router-view>
      <el-main style="padding:0">
        <!--        <router-view/>-->
        <router-view></router-view>
        <manage-users v-if="showUsersModel" @closeModel="closeModel"></manage-users>
        <manage-groups v-if="showGroupsModel" @closeModel="closeModel"></manage-groups>
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
  import manageUsers from './setting/manageUsers'
  import manageGroups from './setting/manageGroups'
  import manageStrategies from './setting/manageStrategies'
  import manageBrands from './setting/manageBrands'
  import manageOrders from './setting/manageOrders'
  import globalControl from './setting/globalControl'

  export default {
    name: 'homePage',
    components: {
      manageUsers,
      manageGroups,
      manageStrategies,
      manageBrands,
      manageOrders,
      globalControl
    },
    data () {
      return {
        controlName: '',
        showUsersModel: false,
        showGroupsModel: false,
        showStrategiesModel: false,
        showBrandsModel: false,
        showOrdersModel: false,
        showGlobalControl: false
      }
    },
    methods: {
      chooseModel (controlName) {
        if (controlName === 'manageUsers') {
          this.showUsersModel = true
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

      closeModel () {
        this.showUsersModel = false
        this.showGroupsModel = false
        this.showStrategiesModel = false
        this.showBrandsModel = false
        this.showOrdersModel = false
        this.showGlobalControl = false
        // this.showUsersModel = false
      }
    }
  }
</script>
