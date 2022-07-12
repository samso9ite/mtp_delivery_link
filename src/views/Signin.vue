<template>
        <section class="sign-in-page" >
           
          <div class="container p-0" id="sign-in-page-box">
                <div class="bg-white form-container ">
                   <div class="sign-in-page-data" v-if="default_error">
                        <div class="alert text-white bg-secondary" role="alert">
                            <div class="iq-alert-icon">
                                <i class="ri-information-line"></i>
                            </div>
                            <div class="iq-alert-text">This url is without reference, please confirm that the link is correct, or contact us: +234 704224 5050</div>
                        </div>
                   </div>
                   <div class="sign-in-page-data" v-else>
                      <div class="sign-in-from w-100 m-auto" >
                        <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                          <h3 class="mb-3 text-center">Sign in</h3>
                            <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                              <div class="iq-alert-icon">
                                 <i class="ri-information-line"></i>
                              </div>
                              <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                              <i class="ri-close-line"></i>
                              </button>
                           </div>
                          <p class="text-center text-dark">Enter your mobile number and your password to order for delivery .</p>
                          <form class="mt-4" @submit.prevent="submitForm">
                              <div class="form-group">
                                  <label for="exampleInputEmail2">Phone Number</label>
                                   <VuePhoneNumberInput v-model="phone_number" ref="phone_number" required default-country-code="NG" size="lg" :preferred-countries="['NG', 'AE', 'DM', 'CM', 'PG', 'KE']" />
                              </div>
                              <div class="form-group">
                                <label for="exampleInputEmail2">Password</label>
                                    <VuePassword
                                        v-model="password"
                                        :disableStrength= true />
                                    
                                </div>

                            <div class="sign-info">
                                <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled="loading">Sign in</button>
                                    <p class="text-dark dark-color line-height-2">Don't have an account? <router-link to='/request-otp'> <a href="">Sign up</a></router-link></p>
                                </div>
                          </form>
                      </div>
                    </div>
                </div>

            </div>
          
        </section>
</template>

<script>
import Api from "./Api.js"
import VuePhoneNumberInput from 'vue-phone-number-input';
import VuePassword from 'vue-password';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    export default({
        name: 'Signin',
        data(){
            return{
            country: "",
            phone_number : "",
            password: '',
            loading : false,
            errors : [],
            default_error : false
            }
        },
        components:{VuePhoneNumberInput, VuePassword},

        methods: {
             clearErrors(){
                this.errors.splice(0);
            },
            submitForm(){
                if(localStorage.getItem('reference') == ""){
                    this.default_error = true
                }
                else{
                    this.clearErrors()
                    this.loading = true 
                    let phoneData = this.$refs.phone_number.phoneFormatted.replace(/\s/g, "");
                    let user_reference = localStorage.getItem('reference')
                    const formData = {password: this.password, phone: phoneData, reference:user_reference }
                    Api.axios_instance.post(Api.baseUrl+'/delivery_link/user/login', formData)
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.$store.commit('store_wallet_balance', {wallet_balance:response.data.user_details.wallet_balance})
                        this.$router.push('/set-destination')
                    })
                    .catch( error => {
                        for(const property in error.response.data){
                            this.errors.push(`${error.response.data[property]}`)
                        }
                    })
                    .finally( () =>
                        {this.loading = false}
                    )
                }
            }
            
        },
        mounted(){
                let reference = localStorage.getItem('reference')
                if(reference){
                    // console.log("This is with reference");
                } else{
                    this.default_error = true
                    console.log("This is without reference");
                }
            }
    })
</script>
  
<style scoped>

</style>