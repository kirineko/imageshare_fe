<template>
  <el-upload
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
    list-type="picture"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUpload">
      上传至服务器
    </el-button>

    <el-input
      style="margin-left: 20px"
      v-model="imageName"
      placeholder="请输入名称"
    ></el-input>

    <template #tip>
      <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </el-upload>
</template>
<script>
import { client } from "../utils/alioss.js";
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};
var date1 = new Date().format("yyyy-MM-dd");
console.log(date1);
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
          `${new Date().format("yyyyMMdd/")}` +
          `${this.imageName}` +
          `${this.fileList[i].raw.uid}` +
          ".jpg"; //定义唯一的文件名
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
        if (this.imageName != "") {
          this.axios
            .post("/api/image/add", formData)
            .then(function () {
              alert("上传成功");
            })
            .catch(function (e) {
              alert(e);
            });
        } else {
          alert("请填写图片名称");
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
