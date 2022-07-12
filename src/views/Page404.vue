<template>
        
         <section class="sign-in-page">
            <div class="container p-0" id="sign-in-page-box">
                <div class="">
                    <div class="sign-in-page-data">
                        <div class="w-100" style="margin-top: 20%;">
                            <center><h1>404</h1>
                            <h3>Page Not Found</h3>
                            </center>
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
        name: '404',
        data(){
            return{
               
            }
        },
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
