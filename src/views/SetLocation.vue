<template>
        <section class="sign-in-page" >
          

          <div class="container p-0" id="sign-in-page-box" >
                <div class="bg-white form-container">
                </div>
                <div class="bg-white form-container ">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <!-- <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" aria-hidden="true" style="font-size:25px"></i> </a> -->
                          <h3 class="mb-3 text-center">Delivery Info</h3>
                          <p class="text-center text-dark">Enter your address and your item description for your item delivery  .</p>
                          <perfect-scrollbar>
                          <form class="mt-4" @submit.prevent="submitForm">
                                <div class="form-group">
                                  <GmapAutocomplete placeholder="Delivery Address" required class="form-control" @place_changed="setAddress"> </GmapAutocomplete>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Item Description</label>
                                    <input type="text" class="form-control mb-0" id="exampleInputEmail2" required placeholder="Enter Item Description" v-model="item_description" :disabled="item_description_btn">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Extra Description</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Extra Description" rows="1" v-model="extra_description" :disabled="extra_description_btn"></textarea>
                                </div>
                             
                              <div class="sign-info">
                                  <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled="loading">Proceed</button>
                                  <!-- <span class="text-dark dark-color d-block line-height-2">Don't have an account? <a href="#">Sign up</a></span> -->
                              </div>
                          </form>
                          </perfect-scrollbar>
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
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import Api from "./Api.js"
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    export default({
        name: 'SetLocation',
        data(){
            return{
            destination_latitude: '',
            destination_longitude: '',
            extra_description: '',
            item_description: '',
            loading : false,
            errors : [],
            formated_address : '',
            item_description_btn : true ,
            extra_description_btn : true
            }
        },
        components:{VuePhoneNumberInput},

        methods: {
            setAddress(place){
                this.destination_latitude =  place.geometry.location.lat()
                this.destination_longitude =  place.geometry.location.lng()
                this.formated_address = place.formatted_address
                this.item_description_btn = false
                this.extra_description_btn = false
          },

           submitForm(){
               this.loading = true
               let formData = {
                   destination_latitude: this.destination_latitude,
                   destination_longitude: this.destination_longitude,
                   extra_description : this.extra_description,
                   item_description : this.item_description,
                   formated_address : this.formated_address
               }

                this.$store.commit('store_delivery_details', formData)
                this.loading = false
                this.$router.push('/channel')
            },
        }
    })
</script>

<style scoped>
  
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>