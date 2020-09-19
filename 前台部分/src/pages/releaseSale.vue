<template>
  <div>
    <header1></header1>
<template>
<div style="margin-top:20px;width:100%;height:1250px;">
<img :src="img2" alt="未找到图片" class="background">
<template>
<div class="sell">
  <span class="title">卖车信息</span>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="position:absolute;margin-top:40px;">
  <el-form-item label="车架号" prop="car_vin" class="label">
    <el-input v-model="ruleForm.car_vin"></el-input>
  </el-form-item>
  <el-form-item label="品牌" prop="brand" class="label">
    <el-input v-model="ruleForm.brand"></el-input>
  </el-form-item>
  <el-form-item label="车型" prop="car_name" class="label">
    <el-input v-model="ruleForm.car_name"></el-input>
  </el-form-item>
  <el-form-item label="颜色" prop="color" class="label">
    <el-input v-model="ruleForm.color"></el-input>
  </el-form-item>
  <el-form-item label="排量(L)" prop="displacement" class="label">
    <el-input v-model.number="ruleForm.displacement"></el-input>
  </el-form-item>
  <el-form-item label="售价(元)" prop="price" class="label">
    <el-input v-model.number="ruleForm.price"></el-input>
  </el-form-item>
  <el-form-item label="出厂年份" prop="date_produce" class="label">
      <el-date-picker type="year" placeholder="选择日期" v-model="ruleForm.date_produce" style="width: 100%;" value-format="yyyy"></el-date-picker>
  </el-form-item>
  <el-form-item label="入手日期" prop="date_buyin" class="label">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date_buyin" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
  </el-form-item>
  <el-form-item label="新旧情况" prop="car_condition" class="label">
    <el-input v-model="ruleForm.car_condition"></el-input>
  </el-form-item>
  <el-form-item label="行驶里程(km)" prop="road_len" class="label">
    <el-input v-model.number="ruleForm.road_len"></el-input>
  </el-form-item>
  <el-form-item label="事故情况" prop="accident" class="label">
    <el-input v-model="ruleForm.accident"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="phone" class="label">
    <el-input v-model.number="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="是否已年检" prop="check" class="label">
    <el-radio-group v-model="ruleForm.check">
      <el-radio label="1">已年检</el-radio>
      <el-radio label="0">未年检</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item class="label">
    <el-button type="primary" @click="rcarsell('ruleForm')" id="carsell">发布车辆信息</el-button>
  </el-form-item>
</el-form>
</div>
</template>
</div>
</template>
<img :src="img3" alt="未找到图片" style="width:100%; margin-top:100px">
<bottom1></bottom1>
</div>
</template>

<script>
import Header from "./Header.vue";
import logo from "../img/logo.png";
import Bottom from "./bottom.vue";
import background from "../img/background_2.png";
import background2 from "../img/background_3.png";
  export default {
    data() {
      var isnum = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }
      return {
        img3:background2,
        img2:background,
        img1:logo,
        ruleForm: {
            car_vin: null,
            brand: null,
            car_name: null,
            color: null,
            displacement: null,
            date_produce: null,
            car_condition: null,
            date_buyin: null,
            accident: null,
            phone: null,
            price: null,
            check: null,
            road_len: null
        },
        rules: {
          car_vin: [
            { required: true, message: '请输入车架号', trigger: 'blur' }
          ],
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
          date_produce: [
            { required: true, message: '请选择出厂日期', trigger: 'blur' }
          ],
          car_condition: [
            { required: true, message: '请输入新旧情况', trigger: 'blur' }
          ],
          date_buyin: [
            { required: true, message: '请选择入手日期', trigger: 'blur' }
          ],
          accident: [
            { required: true, message: '请输入事故情况', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { validator: isnum, trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
            { validator: isnum, trigger: 'blur' }
          ],
          check: [
            { required: true, message: '请选择年检情况', trigger: 'blur' }
          ],
          road_len: [
            { required: true, message: '请输入行驶里程', trigger: 'blur' },
            { validator: isnum, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      rcarsell(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.release_sell()
          } else {
            return false;
          }
        });
      },
      release_sell: function () {
        var that = this;
      this.$axios.post('/api/carsell', {
        user_id: sessionStorage.getItem('userid'),
        car_vin: this.ruleForm.car_vin,
        brand: this.ruleForm.brand,
        car_name: this.ruleForm.car_name,
        color: this.ruleForm.color,
        displacement: this.ruleForm.displacement,
        date_produce: this.ruleForm.date_produce,
        car_condition: this.ruleForm.car_condition,
        date_buyin: this.ruleForm.date_buyin,
        accident: this.ruleForm.accident,
        status: 0,
        phone: this.ruleForm.phone,
        price: this.ruleForm.price,
        check_data: this.ruleForm.check,
        kilometer: this.ruleForm.road_len})
        .then(function (response) {
          that.$message({
              type: 'success',
              message: response.data['message'],
          });  
          console.log(response.data);
          setTimeout(()=>{that.$router.push('/home/check-template');},1000);
        })
        .catch(function (error) { // 请求失败处理
          that.$message({
              type: 'error',
              message: error,
          });  
          console.log(error)
        })
    }
  },
  components:{
    header1:Header,
    bottom1:Bottom,
  }
};
</script>

<style scoped>
#carsell
{
    width:200px;
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
    height:1030px;
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
