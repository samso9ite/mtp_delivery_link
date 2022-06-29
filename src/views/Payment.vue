<template>
        <!-- Sign in Start -->
        <section class="sign-in-page">
          <div class="container p-0" id="sign-in-page-box">
                <div class="bg-white form-container">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <a @click="$router.go(-1)"><i class="fa fa-long-arrow-left" fs-25 aria-hidden="true" style="font-size:25px"></i> </a>
                          <h1 class="text-center">N {{merchant_fee}} </h1>
                          <h4  class="mb-3 text-center"> Wallet Balance : N {{wallet_balance}} </h4>
                          <p class="text-center text-dark">Please select your preferred mode of payment.</p>
                                <div class="col-lg-12">
                                     <div class="alert text-white bg-secondary" role="alert" v-if="errors.length">
                                        <div class="iq-alert-icon">
                                            <i class="ri-information-line"></i>
                                        </div>
                                        <div class="iq-alert-text" v-for="error in errors" :key="error">{{error}}</div>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearErrors">
                                        <i class="ri-close-line"></i>
                                        </button>
                                    </div>
                                    <div class="row " @click="pay_with_wallet">
                                        <div class="col-lg-12 ">
                                            <div class="iq-card  iq-mb-3">
                                            <div class="row no-gutters">
                                                <div class="col-md-4">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3191/3191202.png" width="20px" class="card-img" alt="#" max-height="20px">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="iq-card-body">
                                                        <div class="row"> <h4 class="card-title">Pay with wallet</h4> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            </div>   
                                        </div>
                                       
                                    </div>

                                    <!-- <div class="row "> -->
                                        <!-- <div class="col-lg-12 " @click="pay_with_wallet">
                                            <div class="iq-card  iq-mb-3">
                                            <div class="row no-gutters">
                                                <div class="col-md-4" style="margin: 10px;">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3191/3191202.png"  alt="#" width="18% !important" max-height="20px"> <span style="font-size:20px;padding-top: 15px; float: right;color: black; font-weight: 500; ">Pay with paystack</span> 
                                                </div>
                                                </div>
                                            </div>   
                                        </div> -->
                                    <!-- </div> -->


                                     <div class="row " @click="pay_on_delivery">
                                        <div class="col-lg-12">
                                            <div class="iq-card  iq-mb-3">
                                            <div class="row no-gutters">
                                                <div class="col-md-4">
                                                    <img src="/assets/images/cod.png" width="20px" class="card-img" alt="#" max-height="20px">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="iq-card-body">
                                                        <div class="row"> <h4 class="card-title">Pay on delivery</h4> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            </div>   
                                        </div>
                                       
                                    </div>

                                    <!-- <div class="row "> -->
                                        <!-- <div class="col-lg-12 " @click="pay_on_delivery">
                                            <div class="iq-card  iq-mb-3">
                                            <div class="row no-gutters">
                                                <div class="col-md-4" style="margin: 10px;">
                                                    <img src="/assets/images/cod.png"  alt="#" width="18% !important" max-height="20px"> <span style="font-size:20px;padding-top: 15px; float: right;color: black; font-weight: 500; ">Pay on delivery</span> 
                                                </div>
                                                </div>
                                            </div>   
                                        </div> -->
                                    <!-- </div> -->
                                    
                                    <div class="row">
                                        <div class="col-lg-12 " @click="payWithPaystack">
                                            <div class="iq-card  iq-mb-3">
                                                <div class="row no-gutters">
                                                    <div class="col-md-4">
                                                        <img src="/assets/images/debit_card.png" width="20px" class="card-img" alt="#" max-height="20px">
                                                    </div>
                                                    <div class="col-md-8">
                                                        <a>
                                                            <div class="iq-card-body">
                                                                <div class="row"> <h4 class="card-title"> Pay with debit card </h4> </div>
                                                                <!-- <p>300 completed order</p> -->
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  

                                        <!-- <div class="col-lg-12 " @click="payWithPaystack">
                                            <a>
                                                <div class="iq-card  iq-mb-3">
                                                    <div class="row no-gutters">
                                                        <div class="col-md-4" style="margin: 10px;">
                                                            <img src="https://user-images.githubusercontent.com/15840315/50404123-9b1e5c80-07a4-11e9-9fb5-872b91ee4023.png"  alt="#" width="18% !important" max-height="20px"> <span style="font-size:20px;padding-top: 15px; float: right; font-weight: 500; color: black; ">Pay with paystack</span> 
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            </a>
                                        </div>   -->

                                        <div class="col-lg-12">
                                        <div id="demo" class="collapse">
                                            <div class="row">                                      
                                                <div class="form-group col-md-6">
                                                    <label class="control-label">Account Number</label>
                                                    <input  maxlength="100" type="text" required="required" class="form-control" placeholder="Your account number"  />
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label class="control-label">Account Name</label>
                                                    <input maxlength="100" type="text" required="required" class="form-control" placeholder="Your account name" />
                                                </div>
                                            </div>
                                               
                                            <div class="sign-info">
                                                <button id="channel" class="btn btn-primary mb-2" style="background-color: #ff6600;  border-color: #ff6600;">Pay Now</button>
                                            </div>
                                        </div>
                                        </div>
                                   </div>
                                </div>
                      </div>
                  </div>
                </div>
            </div>
        </section>
</template>

<script>
import Api from "./Api.js"
    export default({
        name: 'Payment',
        data(){
            return{
                merchant_fee : this.$store.state.merchant_fee,
                wallet_balance : this.$store.state.wallet_balance,
                errors : []
            }
        },
        created() {
        this.scriptLoaded = new Promise(resolve => {
            this.loadScript(() => {
                resolve();
            });
        });
		 },
        methods :{
            
            pay_with_wallet(){
				const formData = {order_ref:this.$store.state.order_ref, payment_method: '3' }
				Api.axios_instance.post(Api.baseUrl+'/payment/order/pay', formData)
				.then(response => {
				    this.$router.push('/success')
				})
				.catch(error => {
					console.log(error.response);
                      for(const property in error.response.data){
                        this.errors.push(`${error.response.data[property]}`)
                    }
				})
			},

            pay_on_delivery(){
				const formData = {order_ref:this.$store.state.order_ref, payment_method: '6' }
				Api.axios_instance.post(Api.baseUrl+'/payment/order/pay', formData)
				.then(response => {
				    this.$router.push('/success')
				})
				.catch(error => {
					console.log(error.response);
				})
			},

			loadScript(callback) {
            const script = document.createElement("script");
            script.src = "https://js.paystack.co/v1/inline.js";
            document.getElementsByTagName("head")[0].appendChild(script);
            if (script.readyState) {
                // IE
                script.onreadystatechange = () => {
                    if (
                        script.readyState === "loaded" ||
                script.readyState === "complete"
                    ) {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                // Others
                script.onload = () => {
                    callback();
                };
            }
        },
        isDynamicSplit() {
            return this.split.constructor === Object && Object.keys(this.split).length > 0;
        },
		update_rate(){
			console.log(this.card_id)
		},

        payWithPaystack() {
			this.scriptLoaded &&
        	this.scriptLoaded.then(() => {
			 const paystackOptions = {
                key: 'pk_live_d5c3223d4a02d4f2467144d2009ea4c8bc94e2b9',
				email: this.$store.state.user.email,
                firstname: this.$store.state.user.first_name,
                lastname: this.$store.state.user.last_name,
				amount: this.$store.state.merchant_fee*100, 
                ref: Math.random().toString(36),
				callback: response => {
					const formData = {order_ref:this.$store.state.order_ref, payment_method: '5', token: response.reference}
					Api.axios_instance.post(Api.baseUrl+'/payment/order/pay', formData)
					.then(
						this.$router.push('/success')
					)
                  
                },
                onClose: () => {
                    this.close();
                    
                },
            };
            if (this.embed) {
                paystackOptions.container = "paystackEmbedContainer";
            }
            const handler = window.PaystackPop.setup(paystackOptions);
            if (!this.embed) {
                handler.openIframe();
            }
        });
        },
        
        clearErrors(){
                this.errors.splice(0);
            }
        }
    })
</script>

 <style scoped>
  
@media only screen and (min-width: 600px) {
         .card-img, .card-img-bottom, .card-img-top {
    -ms-flex-negative: 0;
    width: 40%;
    padding-top: 10px
}
    }
  @media only screen and (max-width: 600px) {
        .card-img{width: 50%;}
        .col-md-4{ width: 30%; padding-top:10px; padding-bottom: 10px;}
        .col-md-8{width: 70%;}
    }
</style>