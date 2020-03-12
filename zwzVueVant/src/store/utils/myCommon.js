import CTopComp from '../../components/c_top_comp.vue';
import Vue from "vue";

export var cTopComm = (function(){
    let vm;
    return function( options ){
        console.log("options==" + JSON.stringify(options) );
        const message = options.message ? options.message  : '置顶成功';
        const flag = options.flag ? options.flag  : false;
        var topComponent = Vue.extend(CTopComp);
        if( !vm ) {
            vm = new topComponent({
                el:document.createElement("div"),
                data(){
                    return {
                        message,
                        flag
                    }
                },
            })
            document.body.appendChild( vm.$el );
        } else {
            vm.message = message;
            vm.flag = flag;
        }
    }
})();

