<template>
  <!-- 导航栏 -->
  <el-menu
    router
    :collapse="false"
    default-active="/"
    class="el-menu-vertical-demo"
    background-color="#5682E1"
    text-color="#fff"
    active-text-color="#f7f0ff"
  >
    <el-sub-menu index="/Scrolling">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>图片</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Scrolling-upload">上传图片</el-menu-item>
        <el-menu-item index="/Scrolling">全部图片</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!--    <el-submenu index="/Coupon">-->
    <!--      <template slot="title">-->
    <!--        <i class="el-icon-document"></i>-->
    <!--        <span>优惠卷</span>-->
    <!--      </template>-->
    <!--      <el-menu-item-group>-->
    <!--        <el-menu-item index="/Coupon">全部优惠卷</el-menu-item>-->
    <!--        <el-menu-item index="/UploadCoupon">上传优惠卷</el-menu-item>-->
    <!--      </el-menu-item-group>-->
    <!--    </el-submenu>-->
  </el-menu>
</template>

<script>
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
</script>

<style></style>
