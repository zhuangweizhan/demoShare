 <template>
  <div class="address_list">
    <div class="login_box">
      <div class="b_input">
        <ADDRESS_ITEM name="姓名">
          <input type="text" maxlength="50" placeholder="请输入收件人" class="l_input" v-model="userName" />
        </ADDRESS_ITEM>

        <ADDRESS_ITEM name="联系方式">
          <input type="text" maxlength="50" placeholder="请输入联系电话" class="l_input" v-model="phone" />
        </ADDRESS_ITEM>

        <ADDRESS_ITEM name="省">
          <select ref="prodId" @change="selectPord">
            <option
              v-for="(pItem, pIndex) in provinceList"
              :key="pIndex"
              :value="pItem.id"
            >{{pItem.name}}</option>
          </select>
        </ADDRESS_ITEM>

        <ADDRESS_ITEM name="市">
          <select ref="cityId" @change="selectCity">
            <option
              v-for="(pItem, pIndex) in cityList"
              :key="pIndex"
              :value="pItem.id"
            >{{pItem.name}}</option>
          </select>
        </ADDRESS_ITEM>

        <ADDRESS_ITEM name="区">
          <select ref="areaId">
            <option v-for="(pItem, pIndex) in areaList" :key="pIndex"  :value="pItem.id">{{pItem.name}}</option>
          </select>
        </ADDRESS_ITEM>

        <ADDRESS_ITEM name="门牌号">
          <input type="text" maxlength="50" placeholder="请输入门牌号" class="l_input" v-model="address" />
        </ADDRESS_ITEM>

        <!-- <div class="list">
          <span>姓名：</span>
          <input type="text" maxlength="50" placeholder="卡号/手机号" class="l_input" v-model="userName" />
        </div>-->
      </div>
      <div class="b_btn" @click="summit">新增</div>
    </div>
  </div>
</template>
<script>
import ADDRESS_ITEM from "@/components/address_item.vue";

const allCityList = [
  { name: "广州", id: 1, parentId: 1 },
  { name: "深圳", id: 2, parentId: 1 },
  { name: "汕尾", id: 3, parentId: 1 },
  { name: "上海", id: 4, parentId: 2 }
];

const allAreaList = [
  { name: "天河区", id: 1, parentId: 1 },
  { name: "海珠区", id: 2, parentId: 1 },
  { name: "越秀区", id: 3, parentId: 1 },
  { name: "宝安区", id: 4, parentId: 2 },
  { name: "福田区", id: 5, parentId: 2 },
  { name: "光明区", id: 6, parentId: 2 },
  { name: "海丰", id: 7, parentId: 3 },
  { name: "陆丰", id: 8, parentId: 3 },
  { name: "虹口", id: 9, parentId: 4 },
  { name: "金山", id: 10, parentId: 4 }
];

export default {
  name: "AddressList",
  data() {
    return {
      userName: "",
      phone: "",
      address: "",
      provinceList: [
        { name: "广东", id: 1 },
        { name: "上海", id: 2 }
      ],
      cityList: [],
      areaList: []
    };
  },
  computed: {
    // userName() {
    //   return this.$store.getters.getUserName;
    // }
  },
  mounted() {
    // this.$nextTick( ()=>{

    // })
    this.selectPord();
  },
  methods: {
    nativeClickHandler() {
      alert("nativeClickHandler");
    },
    summit() {
      let json = {
        userName: this.userName,
        phone: this.phone,
        address: this.address,
        cityId: Number(this.$refs.cityId.value),
        prodId: Number(this.$refs.prodId.value),
        areaId: Number(this.$refs.areaId.value)
      };
      console.log("提交参数为：" + JSON.stringify(json) );
      alert("提交参数已打印，该功能仅为展示");
    },
    selectPord() {
      let prodId = Number(this.$refs.prodId.value);
      this.cityList = allCityList.filter(item => {
        return prodId == item.parentId;
      });
      this.$nextTick(() => {
        let selectCityId = Number(this.$refs.cityId.value);
        this.areaList = allAreaList.filter(item => {
          return selectCityId === item.parentId;
        });
      });
    },
    selectCity() {
      let selectCityId = Number(this.$refs.cityId.value);
      this.areaList = allAreaList.filter(item => {
        return selectCityId === item.parentId;
      });
    }
  },
  components: {
    ADDRESS_ITEM
  }
};
</script>

<style scoped lang="scss">
.login_box {
  padding: 10px 8px;
  .b_input {
    margin-bottom: 10px;
    background: #fff;
    border-radius: 4px;
    border: #dadada 1px solid;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    text-align: left;
    .list {
      padding: 6px 10px;
      font-style: normal;
      font-size: 14px;
      border-bottom: #e0e0e0 1px solid;
      position: relative;
      select {
        border: 0;
        width: 200px;
        height: 35px;
      }
      .l_input {
        width: 60%;
        height: 30px;
        line-height: 30px;
        overflow: visible;
        border: 0;
      }
      .list_name {
        width: 30px;
        float: left;
      }
    }
  }
  .b_btn {
    font-weight: 400;
    height: 35px;
    text-align: center;
    font-size: 16px;
    line-height: 35px;
    border-radius: 2px;
    display: inline-block;
    background: #f85605 !important;
    width: 100%;
    color: white;
  }
  .b_foot {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .f_div {
      color: #3366cc;
      font-size: 14px;
    }
  }
}
</style>