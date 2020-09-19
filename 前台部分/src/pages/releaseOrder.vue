<template>
  <div>
    <header1></header1>
<template>
<div style="margin-top:20px;width:100%;height:950px;">
<img :src="img1" alt="未找到图片" class="background">
<template>
  <div class="sell">
  <span class="title">求购信息</span>
<el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="150px" class="demo-ruleForm" style="position:absolute;margin-top:40px;">
  <el-form-item label="品牌要求" prop="brand" class="label">
    <el-input v-model="ruleForm3.brand"></el-input>
  </el-form-item>
  <el-form-item label="车型要求" prop="car_name" class="label">
    <el-input v-model="ruleForm3.car_name"></el-input>
  </el-form-item>
  <el-form-item label="颜色要求" prop="color" class="label">
    <el-input v-model="ruleForm3.color"></el-input>
  </el-form-item>
  <el-form-item label="排量要求(L)" prop="displacement" class="label">
    <el-input v-model.number="ruleForm3.displacement"></el-input>
  </el-form-item>
  <el-form-item label="求购价格(元)" prop="price" class="label">
    <el-input v-model.number="ruleForm3.price"></el-input>
  </el-form-item>
  <el-form-item label="新旧情况要求" prop="car_condition" class="label">
    <el-input v-model="ruleForm3.car_condition"></el-input>
  </el-form-item>
  <el-form-item label="事故情况要求" prop="accident" class="label">
    <el-input v-model="ruleForm3.accident"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="phone" class="label">
    <el-input v-model.number="ruleForm3.phone"></el-input>
  </el-form-item>
  <el-form-item class="label">
    <el-button type="primary" @click="rcarbuy('ruleForm3')" id="carbuy">发布求购信息</el-button>
  </el-form-item>
</el-form>
</div>
</template>
</div>
</template>
<bottom1></bottom1>
</div>
</template>

<script>
  import Header from "./Header.vue";
  import background from "../img/background_4.jpg"
  import Bottom from "./bottom.vue";
  export default {
    components:{
      header1:Header,
      bottom1:Bottom,
    },
    data() {
      var isnum = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }
      return {
        img1:background,
        ruleForm3: {
            brand: null,
            car_name: null,
            color: null,
            displacement: null,
            car_condition: null,
            accident: null,
            phone: null,
            price: null,
        },
        rules: {
          brand: [
            { required: true, message: '请输入车的品牌', trigger: 'blur' }
          ],
          car_name: [
            { required: true, message: '请输入车型', trigger: 'blur' }
          ],
          color: [
            { required: true, message: '请输入车的颜色', trigger: 'blur' }
          ],
          displacement: [
            { required: true, message: '请输入排量', trigger: 'blur' },
            { validator: isnum, trigger: 'blur' }
          ],
          car_condition: [
            { required: true, message: '请输入新旧情况要求', trigger: 'blur' }
          ],
          accident: [
            { required: true, message: '请输入事故情况要求', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { validator: isnum, trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格要求', trigger: 'blur' },
            { validator: isnum, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      rcarbuy(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.release_buy()
          } else {
            return false;
          }
        });
      },
      release_buy: function () {
        var that = this;
        this.$axios.post('/api/carbuy', {
        buy_id: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
        user_id: sessionStorage.getItem('userid'),
        brand: this.ruleForm3.brand,
        car_name: this.ruleForm3.car_name,
        color: this.ruleForm3.color,
        displacement: this.ruleForm3.displacement,
        car_condition: this.ruleForm3.car_condition,
        accident: this.ruleForm3.accident,
        phone: this.ruleForm3.phone,
        price: this.ruleForm3.price})
        .then(function (response) {
          that.$message({
              type: 'success',
              message: response.data['message'],
          });  
          console.log(response.data);
          setTimeout(()=>{that.$router.push('/home/check');},1000);
        })
        .catch(function (error) { // 请求失败处理
          that.$message({
              type: 'error',
              message: error,
          });  
          console.log(error)
        })
    }
  }
};
</script>
<style scoped>
#carbuy
{
    width:150px;
    font-size: 16px;
}
.label
{
    width:500px
}
.login-code{
  cursor: pointer;
}
.background{
    width:100%;  
    height:auto;
    z-index:-1;
    position: absolute;
    
}
.sell{
    background-color: #F8F8F8;
    width:800px;
    height:730px;
    margin-left: 20%;
    margin-top: 250px;
    position: absolute;
}
.title{
  margin-left: 30px;
  color: red;
  font-size: 20px;
  margin-top:30px;
  display: inline-block;
}
</style>
