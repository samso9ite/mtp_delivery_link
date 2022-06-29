<template>
        <section class="sign-in-page" >
          

          <div class="container p-0" id="sign-in-page-box" >
             
              <div class="bg-white form-container">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <h3 class="mb-3 text-center">Verification</h3>
                           <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                              <div class="iq-alert-icon">
                                 <i class="ri-information-line"></i>
                              </div>
                              <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                              <i class="ri-close-line"></i>
                              </button>
                           </div>
                          <p class="text-center text-dark">Enter the four code sent to the mobile number you registered with.</p>
                          <form class="mt-4" @submit.prevent="submitForm"> 
                            <div class="form-group">
                                <!-- <label for="exampleInputEmail2">Verification Code</label> -->
                                <vue-otp-2
                                length="4"
                                join-character="-"
                                inputmode="numeric"
                                pattern="[0-9]*"
                                @onComplete="complete" 
                                />
                            </div>
                            <div class="sign-info">
                                <!-- <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;">Request OTP</button> -->
                                <!-- <span class="text-dark dark-color d-block line-height-2">Don't have an account? <a href="#">Sign up</a></span> -->
                            </div>
                          </form>
                      </div>
                  </div>
                </div>

               
                 <!-- <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <a class="sign-in-logo mb-5" href="#"><img src="/assets/images/Icon.png" class="img-fluid" alt="logo" ></a>
                            <p>Enter your personal details and start journey with us</p>
                           <router-link :to="`/signin`"> <button class="btn iq-border-primary mt-2" id="signUp">Sign In</button> </router-link>
                        </div>
                
                    </div>
                </div> -->
            </div>
          
        </section>
</template>

<script>
import Api from "./Api.js"
export default({
        name: 'VerifyOTP',
        data(){
        return{
            loading : false,
            errors : []
            }
        },

        methods: {
            complete(value) {
                let all_token = value
                let user_token = all_token.toString().replace(/,/g, "")
                this.loading = true 
                const data = {
                    reference : localStorage.getItem('reference'),
                    token : user_token
                }
                Api.axios_instance.post(Api.baseUrl+'/delivery_link/user/validate/otp', data)
                .then(response => {
                    this.$router.push('/register')
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
    .button {
        margin-left: 75%;
        margin-top: 10%;
        color: black;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
    }
    
  .vue-otp-2 {
    display: flex;
    justify-content: space-between;
        &.div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        &.input {
        max-width: 50px;
        padding: 11.5px 8px;
        font-size: 20px;
        border-radius: 3px;
        border: 1px solid #cecece;
        text-align: center;
        }

        span {
        display: block;
        flex: 1;
        text-align: center;
        }
    }
}
</style>