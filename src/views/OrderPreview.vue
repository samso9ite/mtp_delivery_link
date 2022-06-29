<template>
        <section class="sign-in-page">
          <div class="container p-0" id="sign-in-page-box">
                <div class="bg-white form-container ">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                          <h3 class="mb-3 text-center">Preview Order</h3>
                            <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                              <div class="iq-alert-icon">
                                 <i class="ri-information-line"></i>
                              </div>
                              <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                              <i class="ri-close-line"></i>
                              </button>
                           </div>

                        <perfect-scrollbar>
                            <!-- <p class="text-center text-dark">Confirm the details of your order before payment</p> -->
                          <ul class="list-group">
                            <li class="list-group-item"> <p style="font-size: larger;"><b>Sender Name:</b><span style="padding-left: 25px;">{{first_name}} {{last_name}}</span></p></li>
                            <li class="list-group-item"> <p style="font-size: larger;"><b> Rider: </b> <span style="padding-left: 30px;">{{merchant_name}}</span></p></li>
                            <li class="list-group-item"> <p style="font-size: larger;"><b> Package:</b>  <span style="padding-left: 20px;">{{item_description}}</span></p></li>
                            <li class="list-group-item"> <p style="font-size: larger;"> <b>Phone Number:</b><span style="padding-left: 20px;">{{phone_number}}</span></p></li>
                            <li class="list-group-item"> <p style="font-size: larger;"><b> Pick-up: </b> <span style="padding-left: 20px;">{{pick_up}}</span></p></li>
                            <li class="list-group-item"> <p style="font-size: larger;"><b> Drop-off: </b> <span style="padding-left: 20px;">{{formated_address}}</span></p></li>
                         </ul><br>
                         </perfect-scrollbar><br>
                         <center> <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled ="loading" @click="createOrder">Proceed to payment</button> </center>
                    </div>
                  </div>
                </div>

                <!-- <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <a class="sign-in-logo mb-5" href="#"><img src="/assets/images/Icon.png" class="img-fluid" alt="logo" ></a>
                            <p>To Keep connected with us please login with your personal info</p>
                            <button class="btn iq-border-primary mt-2" id="signIn">Sign In</button>
                        </div>
                       
                        <div class="overlay-panel overlay-right">
                            <a class="sign-in-logo mb-5" href="#"><img src="/assets/images/Icon.png" class="img-fluid" alt="logo" ></a>
                            <p>Click the necessary field to continue tyour request </p>
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
        name: 'OrderPreview',
        data(){
            return{
                first_name : this.$store.state.user.first_name,
                last_name : this.$store.state.user.last_name,
                merchant_name : this.$store.state.merchant_name,
                item_description : this.$store.state.delivery_details.item_description,
                formated_address : this.$store.state.delivery_details.formated_address,
                phone_number : this.$store.state.user.phone_number,
                pick_up : this.$store.state.user.pick_up,
                loading : false,
                errors : []
            }
        },
        
        methods: {
            createOrder(){
                this.loading = true
                const formData = {
                    reference : this.$store.state.user.reference,
                    merchant_id : this.$store.state.merchant_id,
                    destination : this.$store.state.delivery_details.formated_address,
                    item_description : this.$store.state.delivery_details.item_description,
                    destination_latitude : this.$store.state.delivery_details.destination_latitude,
                    destination_longitude : this.$store.state.delivery_details.destination_longitude,
                    distance_in_km : this.$store.state.distance_in_km,
                    transport_type : this.$store.state.transport_type,
                    item_description :  this.$store.state.delivery_details.item_description,
                    extra_description :  this.$store.state.delivery_details.extra_description,
                    phone_number : this.$store.state.user.phone_number,
                    pick_up : this.$store.state.user.pick_up
                }
                Api.axios_instance.post(Api.baseUrl+'/delivery_link/order/create', formData)
                    .then(response => {
                       this.$store.commit('store_merchant_fee', {merchant_fee: response.data.data.merchant_fee, order_ref: response.data.data.reference })
                       this.$router.push({path: '/payment'})
                    })
                    .catch( error => {
                        console.log();
                        for(const property in error.response.data){
                            this.errors.push(`${error.response.data[property]}`)
                        }
                    })
                    .finally( () => {
                        this.loading = false
                })
               
            },
            clearErrors(){
                this.errors.splice(0);
            }
        }
    })
</script>
 
<style scoped>
    .card-img, .card-img-bottom, .card-img-top {
    -ms-flex-negative: 0;
    width: 50%;}
    .ps {
  /* height: 360px; */
}
.list-group-item {
    padding-top: 7px;
    padding-left: 15px;
}
    .ps {
        height: 370px;
}
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>