<script>
export default {
  name: "AddressItem",
  props: {
    name: {
      type: String
    }
  },
  render: function(createElement) {
    return createElement(
      "div",
      {
        class: {
          list: "list"
        }
      },
      [
        createElement("div", {
          class: {
            list_name: "list_name"
          },
          domProps: {
            innerHTML: this.name + ":"
          },
          on: {
            click: () => {
              alert("请输入" + this.name);
            }
          }
        }),
        this.$slots.default
      ]
    );
  }
};

// const clickName = function(){
//   alert("clickName");
// }
</script>

<style scoped lang="scss">
.address_list {
  padding: 6px 10px;
  font-style: normal;
  font-size: 14px;
  border-bottom: #e0e0e0 1px solid;
  position: relative;
}
.address_list .l_input {
  width: 60%;
  height: 30px;
  line-height: 30px;
  overflow: visible;
  border: 0;
}

.list {
  padding: 6px 10px;
  font-style: normal;
  font-size: 14px;
  border-bottom: #e0e0e0 1px solid;
  position: relative;
  .l_input {
    width: 60%;
    height: 30px;
    line-height: 30px;
    overflow: visible;
    border: 0;
  }
  .list_name {
    width: 70px;
    float: left;
    line-height: 35px;
  }
}
</style>

