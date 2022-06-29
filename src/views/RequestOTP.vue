<!-- <template>
        <section class="sign-in-page" >
        <div class="container p-0" id="sign-in-page-box" >
             
                <div class="bg-white form-container sign-up-container">
                  
                </div>
                <div class="bg-white form-container ">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                          <h3 class="mb-3 text-center">Sign Up</h3>
                          
                           <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                              <div class="iq-alert-icon">
                                 <i class="ri-information-line"></i>
                              </div>
                              <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                              <i class="ri-close-line"></i>
                              </button>
                           </div>
                          <p class="text-center text-dark">Enter your active mobile number to create an account with us.</p>
                          <form class="mt-4" @submit.prevent="submitForm">
                              <div class="form-group">
                                  <label for="exampleInputEmail2">Phone Number</label>
                                  <VuePhoneNumberInput v-model="phone_number" ref="phone_number" required default-country-code="NG" size="lg" :preferred-countries="['NG', 'AE', 'DM', 'CM', 'PG', 'KE']" />
                              </div>
                            
                              <div class="sign-info">
                                    <center> <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled="loading">Request OTP</button> </center>
                                    <center><p class="text-dark dark-color line-height-2">Already have an account? <router-link to='/signin'> <a href="">Sign in</a></router-link></p></center>
                                   <span class="text-dark dark-color d-block line-height-2">Already have an account? <router-link to="/signin"><a href="">Sign in</a></router-link></span>
                              </div>
                          </form>
                      </div>
                  </div>
                </div>
            </div>
          
        </section>
</template> -->

<template>
        <section class="sign-in-page" >
           
          <div class="container p-0" id="sign-in-page-box">
                <div class="bg-white form-container ">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto" >
                        <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                          <h3 class="mb-3 text-center">Sign up</h3>
                            <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                              <div class="iq-alert-icon">
                                 <i class="ri-information-line"></i>
                              </div>
                              <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                              <i class="ri-close-line"></i>
                              </button>
                           </div>
                          <p class="text-center text-dark">Enter your active mobile number to create an account with us.</p>
                          <form class="mt-4" @submit.prevent="submitForm">
                              <div class="form-group">
                                  <label for="exampleInputEmail2">Phone Number</label>
                                   <VuePhoneNumberInput v-model="phone_number" ref="phone_number" required default-country-code="NG" size="lg" :preferred-countries="['NG', 'AE', 'DM', 'CM', 'PG', 'KE']" />
                              </div>
                       

                            <div class="sign-info">
                                <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled="loading">Sign up</button>
                                    <p class="text-dark dark-color line-height-2">Already have an account? <router-link to='/signin'> <a href="">Sign in</a></router-link></p>
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
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    export default({
        name: 'RequestOTP',
        components:{VuePhoneNumberInput},
        data(){
            return {
            country : "",
            phone_number : "",
            loading : false,
            errors : []
            }
        },
        methods: {
            submitForm(){
                this.loading = true 
                let phoneData = this.$refs.phone_number.phoneFormatted.replace(/\s/g, "");
                const formData = {
                    country : this.$refs.phone_number.countryCode,
                    reference :  localStorage.getItem('reference'),
                    phone : phoneData,
                    reg_mode: 'PHONE'
                }
                localStorage.setItem('reg_number', phoneData)
                Api.axios_instance.post(Api.baseUrl+'/delivery_link/user/request/otp', formData)
                .then(response => {
                    this.$router.push('/verify-otp')
                })
                .catch( error => {
                    for(const property in error.response.data){
                        this.errors.push(`${error.response.data[property]}`)
                    }
                })
                .finally( () =>
                    {this.loading = false}
                )
            },
            clearErrors(){
                this.errors.splice(0);
            }
        }
     })
</script>

<style scoped>
 
</style>