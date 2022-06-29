<template>
        
         <section class="sign-in-page"
        >
          <div class="container p-0" id="sign-in-page-box">
               
                <div class="">
                    <div class="sign-in-page-data">
                      <div class="w-100 m-auto">
                                <div class="col-lg-12">
                                 <span style="margin-top: 90px;"><center> <img :src="customer_img" class=" rounded-circle" alt="" v-if="customer_img" width="15%"  height="80px" style="margin-top: 7%; ">
                                       <img src="/assets/images/avatar.png" width="15%"  style="margin-top: 7%; " v-else /> <span style="margin-top: 7% ;">By {{customer_fname}} {{customer_lname}} </span></center></span>
                                 <!-- <h5>/h5> -->
                    <!-- <p class="text-center text-dark" style="margin-top: 10%;"><b>Hi, Beth Wears Design </b>You followed a link to get your goods delivered through our channel from this pickup location {{pickup_location}}. <br> Kindly proceed your request if yes.</p> -->
                    <p class="text-center text-dark" style="margin-top: 10%; margin-left: 10px; margin-right: 10px; text-align: justify;">Hi there!  This link allows you set your delivery location for your goods to be delivered.<br>Please proceed to fill in the required details, make payment and get your package delivered </p>
                  <br>     <center><router-link :to="'/signin'"> <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled="loading">Proceed request </button> </router-link></center>
             
                   
                  </div>
                    </div>
                  </div>
                </div>

            <img src="/assets/images/BG1.jpg" style="margin-top: 22% !important;"/>

            </div>
        </section>
        
        
        
      
</template>

<script>
    import Api from "./Api.js"
    export default({
        name: 'Initialize',
        data(){
            return{
                customer_img: "",
                customer_fname: "",
                customer_lname: "",
                customer_phone: "",
                pickup_location: '',
                customer_email: '',
                loading : false,
                errors : [],
            }
        },

        methods: {
            get_reference(){
                this.loading = true
                let reference_id = this.$route.params.reference
                this.$store.commit('user_payloads', {reference: reference_id})
                localStorage.setItem('reference',  reference_id)
                Api.axios_instance.post(Api.baseUrl+'/delivery_link/initializer/session/get', {ref: reference_id})
                .then(response => {
                    this.customer_phone = response.data.user.phone
                    this.customer_lname = response.data.user.last_name
                    this.customer_fname = response.data.user.first_name
                    this.customer_img = response.data.user.image
                    this.pickup_location = response.data.pickup_location
                    const data = {
                        reference : reference_id,
                        first_name : response.data.user.first_name,
                        last_name: response.data.user.last_name,
                        phone_number: response.data.user.phone,
                        pick_up: response.data.pickup_location,
                        email: response.data.user.email,
                        pickup_latitude: response.data.pickup_latitude,
                        pickup_longitude: response.data.pickup_longitude
                    }
                    this.$store.commit('user_payloads', data)
                })
                .catch(error =>{
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
        },
        mounted(){
            this.get_reference()
        }
    })

</script>

<style >
    .card-img, .card-img-bottom, .card-img-top {
        -ms-flex-negative: 0;
        width: 50%;
    }
    #sign-in-page-box {
        width: 30%;
        margin-top: 10%;
        height: 550px;
    }
    @media only screen and (max-width: 414px) {
    #sign-in-page-box {
            width: 100%;
            margin-top: 10%;
            height: 550px;
        }
    }
</style>
