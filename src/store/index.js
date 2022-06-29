import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    merchant_id : '',
    wallet_balance: '',
    merchant_name : '',
    distance_in_km : '',
    transport_type: '',
    merchant_fee : '',
    order_ref: '',
    user: {
      reference: '',
      first_name : '',
      last_name : '',
      phone_number : '',
      pick_up: '',
      pickup_latitude: '',
      pickup_longitude: ''
    },
    delivery_details: {
      destination_longitude: '',
      destination_latitude: '',
      
      // distance_in_km: '',
      item_description: '',
      extra_description: '',
      formated_address : ''
      }
  },
  mutations: {
    user_payloads(state, payload){
      state.user.reference = payload.reference,
      state.user.first_name = payload.first_name,
      state.user.last_name = payload.last_name,
      state.user.phone_number = payload.phone_number,
      state.user.email = payload.email,
      state.user.pick_up = payload.pick_up,
      state.user.pickup_latitude = payload.pickup_latitude,
      state.user.pickup_longitude = payload.pickup_longitude
    },
    store_delivery_details(state, payload){
      state.delivery_details.destination_latitude = payload.destination_latitude,
      state.delivery_details.destination_longitude = payload.destination_longitude,
      state.delivery_details.distance_in_km = payload.distance_in_km,
      state.delivery_details.item_description = payload.item_description,
      state.delivery_details.extra_description = payload.extra_description,
      state.delivery_details.formated_address = payload.formated_address
    },
    store_merchant_id(state, payload){
      state.merchant_id = payload.merchant_id,
      state.merchant_name = payload.merchant_name
    },
    store_transport_details(state, payload){
      state.distance_in_km = payload.distance_in_km,
      state.transport_type = payload.transport_type
    },
    store_merchant_fee(state, payload){
      state.merchant_fee = payload.merchant_fee,
      state.order_ref = payload.order_ref
    },
    store_wallet_balance(state, payload){
      state.wallet_balance = payload.wallet_balance
    }
  },
  actions: {
  },
  modules: {
  }
})
