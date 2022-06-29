<template>
        <section class="sign-in-page" >
          <div class="container p-0" id="sign-in-page-box" >
             
                <div class="bg-white form-container ">
                    <perfect-scrollbar>
                        <div class="sign-in-page-data">
                                
                        <div class="sign-in-from w-100 m-auto">
                            <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                            <h3 class="mb-3 text-center">Sign up</h3>
                            <p class="text-center text-dark">Enter your personal details to complete registration .</p>
                            <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                                <div class="iq-alert-icon">
                                    <i class="ri-information-line"></i>
                                </div>
                                <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                                <i class="ri-close-line"></i>
                                </button>
                            </div>
                            <form class="mt-4" @submit.prevent="submitForm">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Your First Name</label>
                                    <input type="text" class="form-control mb-0" id="exampleInputEmail1" placeholder="Your First Name" required v-model="first_name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Your Last Name</label>
                                    <input type="text" class="form-control mb-0" id="exampleInputEmail1" placeholder="Your Last Name" required v-model="last_name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Email address</label>
                                    <input type="email" class="form-control mb-0" id="exampleInputEmail2" placeholder="Enter email" required v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <VuePassword
                                            v-model="password"
                                            disableStrength=true
                                            />
                                    <!-- <input type="password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Password" required v-model="password"> -->
                                </div>
                                <div class="sign-info">
                                    <center><button type="submit" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;" :disabled="loading">Create an account</button> </center>
                                    <span class="text-dark d-block line-height-2">Already Have Account ? <a href="#">Log In</a></span>
                                </div>
                            </form>
                        </div>
                        </div>
                    </perfect-scrollbar>
                </div>

               
                <!-- <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <a class="sign-in-logo mb-5" href="#"><img src="/assets/images/Icon.png" class="img-fluid" alt="logo" ></a>
                            <p>To Keep connected with us please login with your personal info</p>
                            <button class="btn iq-border-primary mt-2" id="signIn" >Sign In</button>
                        </div>
                       
                        <div class="overlay-panel overlay-right">
                            <a class="sign-in-logo mb-5" href="#"><img src="/assets/images/Icon.png" class="img-fluid" alt="logo" ></a>
                            <p>Enter your personal details and start journey with us</p>
                           <router-link :to="`/request-otp`"> <button class="btn iq-border-primary mt-2" id="signUp">Sign in</button> </router-link>
                        </div>
                
                    </div>
                </div> -->
            </div>
          
        </section>
</template>

<script>
import Api from "./Api.js"
import VuePhoneNumberInput from 'vue-phone-number-input';
import VuePassword from 'vue-password';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    export default({
        name: 'Register',
        components : {PerfectScrollbar},
        data(){
            return{
            first_name: "",
            last_name : "",
            email : '',
            password: '',
            loading : false,
            errors : [],
            // referral_code : ''
            }
        },
        components:{VuePhoneNumberInput, VuePassword},

        methods: {
            submitForm(){
                this.loading = true
                const formData = {
                    password: this.password, 
                    first_name: this.first_name, 
                    last_name : this.last_name,
                    email : this.email,
                    reference : localStorage.getItem('reference'),
                    phone: localStorage.getItem('reg_number')
                    // referral_code : this.referral_code
                }
                console.log(formData)
                Api.axios_instance.post(Api.baseUrl+'/delivery_link/user/register', formData)
                .then(response => {
                    console.log(response.data);
                    this.$router.push('/signin')
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
    .ps {
        height: 500px;
    }
    .form-container {
        position:relative;
        display:block
    }
    .button {
        margin-left: 75%;
        margin-top: 10%;
        color: black;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
    }
</style>