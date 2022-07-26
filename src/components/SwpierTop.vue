<template>
    <div>李灿宇</div>
</template>
<script>
import axios from 'axios'
// import {onMounted} from 'vue'
import {getlist} from '../../api/data'

export default{
    name: 'SwpierTop',
    data(){
        return{
            musiclist:[],
        }
    },
    methods:{
    //    async getlist1(){
    //        let res=await getlist();
    //        console.log(res);
    //    }, 
    },
    mounted(){
        // this.getlist1()
        axios.get('http://192.168.0.105:8081/personalized?limit=1').then(
            (res)=>{
                console.log(res);
            }
        )
    }
}
</script>
