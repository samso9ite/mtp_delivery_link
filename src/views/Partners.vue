<template>
        <!-- Sign in Start -->
        <section class="sign-in-page">
          <div class="container p-0" id="sign-in-page-box">
                <div class="bg-white form-container ">
                    <div class="sign-in-page-data">
                        
                      <div class="sign-in-from w-100 m-auto">
                          <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" aria-hidden="true" style="font-size:25px"></i> </a>
                          <h3 class="mb-3 text-center">Select a rider</h3>
                          <!-- <p class="text-center text-dark">Select a rider to deliver your goods.</p> -->
                          
                            <div class="col-lg-12">
                                  <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                              <div class="iq-alert-icon">
                                 <i class="ri-information-line"></i>
                              </div>
                              <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="ri-close-line"></i>
                              </button>
                           </div>
                                <perfect-scrollbar>
                                    <div class="row" v-for="merchant in merchants" :key="merchant">
                                        <div class="col-lg-12">
                                            <div class="iq-card  iq-mb-3">
                                                <div class="row no-gutters">
                                                    <div class="col-md-4">
                                                        <img :src="merchant.merchant.logo" width="20px" class="card-img" alt="#" max-height="20px" v-if="merchant.merchant.logo">
                                                        <img src="/assets/images/avatar.png" width="20px" class="card-img" alt="#" max-height="20px" v-else>
                                                    </div>

                                                    <div class="col-md-8">
                                                        <div  style="padding-top:0.7em; margin-left:1em; font-weight:500; font-size:18px" @click="setMerchantId(merchant)">
                                                            {{merchant.merchant.name | truncate(12)}} <br>
                                                            <span style="" v-if="merchant.merchant.ratings === 1">
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                            </span>
                                                            <span style="" v-if="merchant.merchant.ratings === 2">
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                            </span>
                                                            <span style="" v-if="merchant.merchant.ratings === 3">
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                            </span>
                                                            <span style="" v-if="merchant.merchant.ratings === 4">
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                            </span>
                                                            <span style="" v-if="merchant.merchant.ratings === 5">
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                                <i class="fa fa-star fs-16 text-orange"></i>
                                                        </span> <span style="padding-left:10px">N{{merchant.merchant.rateInKm}}/km</span> <span><img src="/assets/images/route.png" width="20px" class="card-img" alt="#" max-height="20px" v-if="merchant.merchant.has_special_route"/> <img src="/assets/images/route2.png" width="30px" style="padding-bottom:9px" alt="#" max-height="30px" v-else="merchant.merchant.has_special_route"/></span>
													    </div>
                                                    </div>
                                                    <!-- </div> -->
                                                </div>
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
</template>

<script>
import Api from "./Api.js"
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    export default({
        name: 'Partners',
        components : {PerfectScrollbar},
        data(){
            return{
                merchants : [],
                center : {
                    lat: this.$store.state.user.pickup_latitude, lng : this.$store.state.user.pickup_longitude
                },
                 destination_marker : { 
                    destination_latitude : this.$store.state.delivery_details.destination_latitude,
                    destination_longitude : this.$store.state.delivery_details.destination_longitude
                },
                errors : []
            }
        },

        methods:{
            listPartners(){
                // let directionsService = new window.google.maps.DirectionsService();
                // let { position:center, position:destination_marker, travelMode } = this;
                // if (!"position:center" || !"position:destination_marker" || !travelMode) return;
                // directionsService.route(
                // {
                //     origin:this.center,
                //     destination:this.destination_marker,
                //     travelMode:'DRIVING'
                // },
                // (response, status) => {
                //     let distance_in_kilometre = response.routes[0].legs[0].distance.value / 1000
                //     console.log(distance_in_kilometre);
                //     const data = {distance_in_km:distance_in_kilometre}
                //     this.$store.commit('set_distance', data)
                //     if (status !== "OK") return;
                //     directionsDisplay.setDirections(response);
                // }
                // );

                var radlat1 = Math.PI * this.$store.state.user.pickup_latitude/180;
                    var radlat2 = Math.PI * this.$store.state.delivery_details.destination_latitude/180;
                    var theta = this.$store.state.user.pickup_longitude- this.$store.state.delivery_details.destination_longitude;
                    var radtheta = Math.PI * theta/180;
                    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    if (dist > 1) {
                        dist = 1;
                    }
                    dist = Math.acos(dist);
                    dist = dist * 180/Math.PI;
                    dist = dist * 60 * 1.1515;
                    let distance_in_kilometre = dist * 1.609344 
                    // console.log(distance_in_kilometre);
                    let distance_inKm = 100
                    // console.log(distance_inKm);
                    
                // console.log(this.$store.state.delivery_details.destination_latitude);
                const tranport_data =  {distance_in_km : distance_inKm, transport_type : this.$route.params.channel}
                this.$store.commit('store_transport_details', tranport_data)
                const formData = {
                    destination_latitude : this.$store.state.delivery_details.destination_latitude,
                    destination_longitude : this.$store.state.delivery_details.destination_longitude,
                    distance_in_km : 100,
                    reference : localStorage.getItem('reference'),
                    transport_type :  this.$route.params.channel
                }

                Api.axios_instance.post(Api.baseUrl+'/delivery_link/order/search/transporter', formData)
                .then(response => {
                    console.log(response.data)
                    // console.log(response.data.closest_merchants);
                    this.merchants = response.data.closest_merchants
                })
                .catch( error => {
                    // console.log(error.response);
                    // console.log(error.response.data);
                    for(const property in error.response.data){
                        this.errors.push(`${error.response.data[property]}`)
                    }
                })
               
            },

            clearErrors(){
                this.errors.splice(0);
            },
            
            setMerchantId(merchant){
                const data = {
                    merchant_id : merchant.merchant.merchant_id,
                    merchant_name : merchant.merchant.name
                }
                this.$store.commit('store_merchant_id', data)
                this.$router.push('/order-preview')
            }
        },
        mounted(){
            this.listPartners()
        }
    })
</script>

  <style scoped> 

    
    @media only screen and (max-width: 600px) {
        .card-img, .card-img-bottom, .card-img-top {
            -ms-flex-negative: 0;
            width: 40%;
            margin-top: 10px
        }
    }
    @media only screen and (max-width: 600px) {
        .card-img{width: 35%;}
        .col-md-4{ width: 30%; padding-top:10px; padding-bottom: 10px;}
        .col-md-8{width: 70%;}
    }
    .ps {
        height: 400px;
}
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>