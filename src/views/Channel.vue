<template>
        <!-- Sign in Start -->
        <section class="sign-in-page">
          <div class="container p-0" id="sign-in-page-box">
                <div class="bg-white form-container ">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                          <h3 class="mb-3 text-center">Select a channel</h3>
                            <!-- <p class="text-center text-dark">Pick  a channel to deliver your goods.</p> -->
                                <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                                    <div class="iq-alert-icon">
                                        <i class="ri-information-line"></i>
                                    </div>
                                    <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                                    <i class="ri-close-line"></i>
                                    </button>
                                </div>
                                <div class="col-lg-12">
                                    <perfect-scrollbar>
                                    <div class="row">

                                        <div class="col-lg-6" v-for="channel in channels" :key="channel">
                                            <div class="iq-card  iq-mb-3">
                                                <router-link :to="{name:'Partners', params:{channel: channel.code}}">
                                                    <div class="row no-gutters">
                                                        <div class="col-md-4">
                                                            <img src="/assets/images/bike.png" class="card-img" width="80% !important" alt="#" v-if="channel.code=='BIKE'">
                                                            <img src="/assets/images/bicycle.png" class="card-img" alt="#" v-if="channel.code=='BICYCLE'">
                                                            <img src="/assets/images/van.png" class="card-img" alt="#" v-if="channel.code=='VAN'">
                                                            <img src="/assets/images/suv.png" class="card-img" alt="#" v-if="channel.code=='CAR'">
                                                            <img src="/assets/images/van.png" class="card-img" alt="#" v-if="channel.code=='TRUCK'">
                                                            <img src="/assets/images/drone1.png" class="card-img" alt="#" v-if="channel.code=='DRONE'">
                                                            <img src="/assets/images/airplane.png" class="card-img" alt="#" v-if="channel.code=='FLIGHT'">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <div class="iq-card-body">
                                                                <h5 class="card-title"  v-if="channel.code=='BIKE'">Bike</h5>
                                                                <h5 class="card-title"  v-if="channel.code=='BICYCLE'">Bicycle</h5>
                                                                <h5 class="card-title"  v-if="channel.code=='VAN'">Van</h5>
                                                                <h5 class="card-title"  v-if="channel.code=='CAR'">Car</h5>
                                                                <h5 class="card-title"  v-if="channel.code=='TRUCK'">Truck</h5>
                                                                <h5 class="card-title"  v-if="channel.code=='DRONE'">Drone</h5>
                                                                <h5 class="card-title"  v-if="channel.code=='FLIGHT'">Flight</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            
                                            </div>   
                                        </div>
                                       
                                    </div>
                                    </perfect-scrollbar>
                                </div>
                            </div>
                        </div>
                </div>

                <!-- <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <a class="sign-in-logo mb-5" href="#"><img src="/assets/images/Icon.png" class="img-fluid" alt="logo" ></a>
                            <p>Our apps are available on Playstore and Appstore  </p>
                            <div class="row">
                                <div class="col-lg-6">  <a href="https://play.google.com/store/apps/details?id=com.mytransporter.customermobile" target="_blank"><img src="https://mytransporter.io/images/playstore1.png" width=""/></a></div>
                                <div class="col-lg-6"> <a href="https://apps.apple.com/app/id1588317914" target="_blank"> <img src="https://mytransporter.io/images/appstore.png" width=""/></a></div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </section>
        <!-- Sign in END -->
</template>

<script>
import Api from "./Api.js"
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    export default({
        name: 'Channel',
        data(){
            return{
                loading: false,
                channels: [],
                errors: []
            }
        },

        methods: {
            get_tranport_types(){
                Api.axios_instance.get(Api.baseUrl+'/transporter/types/get/all')
                .then(response => {
                    this.channels = response.data
                    for(const property in error.response.data){
                        this.errors.push(`${error.response.data[property]}`)
                    }
                })
                
                .catch( error => {
                    console.log(error.response);
                })
               
            },
        },
        mounted(){
            this.get_tranport_types()
        } 
    })
</script>

<style scoped>
    @media only screen and (min-width: 600px) {
        .card-img{
            padding-top:11px;
            width: 70% !important
        }
        .iq-card-body {
            padding: 10px;
        }
    }

       @media only screen and (max-width: 600px) {
        .card-img{width: 35%;}
        .col-md-4{ width: 50%; padding-top:10px; padding-bottom: 10px;}
        .col-md-8{width: 50%;}
        .col-lg-6{
            /* padding-top:20px; */
            /* padding-bottom: 20px; */
        }
    }
    .ps {
        height: 400px;
    }

.card-title{
    padding-top: 14px
}

</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>