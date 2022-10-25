<template>
  <el-upload
    class="avatar-uploader"
    v-model="Addfrom.url"
    action=""
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :file-list="fileList"
    :auto-upload="false"
    :multiple="true"
    :before-upload="handleBeforeUpload"
    :limit="8"
  >
    <div v-for="(item, index) in imageList" :key="index">
      <img :src="item" class="avatar" :alt="item" />
      <p>{{ item }}</p>
    </div>
    <el-button slot="trigger" size="small" type="primary"
      >选取图片文件</el-button
    >
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <h1 v-text="msg"></h1>
    <el-input
      style="margin-left: 20px"
      v-model="imageName"
      placeholder="请输入名称"
    ></el-input>
    <!--    日期格式化:{{c_time}}-->
    <!--    <el-date-picker v-model="c_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd ">-->
    <!--    </el-date-picker>-->
  </el-upload>
</template>

<script>
import { client } from "../utils/alioss.js";

export default {
  data() {
    return {
      msg: "重新上传,建议刷新",
      fileList: [],
      imageList: [],
      imageName: "",
      Addfrom: {
        url: "",
      },
    };
  },
  methods: {
    // 上传文件之前的方法
    handleBeforeUpload(file) {
      const isJPEG = file.name.split(".")[1] === "jpeg";
      const isJPG = file.name.split(".")[1] === "jpg";
      const isPNG = file.name.split(".")[1] === "png";
      const isWEBP = file.name.split(".")[1] === "webp";
      const isGIF = file.name.split(".")[1] === "gif";
      const isLt500K = file.size / 1024 / 1024 / 1024 / 1024 < 4;
      if (!isJPG && !isJPEG && !isPNG && !isWEBP && !isGIF) {
        this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
      }
      if (!isLt500K) {
        this.$message.error("单张图片大小不能超过 4mb!");
      }
      return (isJPEG || isJPG || isPNG || isWEBP || isGIF) && isLt500K;
    },
    submitUpload() {
      this.uploadURL();
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadURL() {
      for (var i = 0; i < this.fileList.length; i++) {
        let fileName =
          `${this.imageName}` + `${this.fileList[i].raw.uid}` + ".jpg"; //定义唯一的文件名
        //定义唯一的文件名，打印出来的uid其实就是时间戳
        client()
          .multipartUpload(fileName, this.fileList[i].raw, {
            // eslint-disable-next-line no-unused-vars
            progress: function (percentage, cpt) {
              console.log("打印进度", percentage);
            },
          })
          .then((res) => {
            console.log("这个是啥", res);
            //上传成功之后，回显操作，拼接桶名+域名+文件名
            this.imageList.push(
              "https://lqhwechat.oss-cn-hangzhou.aliyuncs.com/" + fileName
            );
          });
        let formData = new FormData();
        formData.append(
          "imageUrl",
          "https://lqhwechat.oss-cn-hangzhou.aliyuncs.com/" + fileName
        );
        formData.append("imageName", this.imageName);
        if (this.c_time != "") {
          this.axios
            .post("/api/image/add", formData)
            .then(function () {
              alert("上传成功");
            })
            .catch(function (e) {
              alert(e);
            });
        } else {
          alert("请上传过期时间");
        }
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 300px;
}
</style>
