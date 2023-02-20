<template>
  <v-card class="pt-10 margin-center" width="50vw" min-height="70vh">
    <v-col cols="8" class="pt-15 margin-center">
      <v-form ref="form" @submit.prevent lazy-validation>
        <v-img class="mt-15 mb-15 margin-center" width="11vw" src="https://vo.la/AcATy"></v-img>
        <v-radio-group v-model="userInfo.type" :rules="userRule" inline>
          <v-radio label="Place" value="place"></v-radio>
          <v-radio label="Seller" value="seller"></v-radio>
        </v-radio-group>
        <v-text-field  v-model="userInfo.memberId" :counter="10" :rules="userRule" label="ID"></v-text-field>
        <v-text-field class="mb-5" type="password" v-model="userInfo.password" :rules="userRule" label="Password"></v-text-field>
        <v-btn type="submit" class="mb-5" width="100vw" color="success" @click="handleClickLogin">Login</v-btn>
      </v-form>
      <v-row justify="center">
        <v-col cols="6">
          <v-btn class="w-100" color="primary" @click="emits('handleSellerJoinPage')">판매자 회원가입</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="w-100" color="primary" @click="emits('handlePlaceJoinPage')">장소제공자 회원가입</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-card>

</template>

<script setup>
  import {ref} from "vue";
  import {signIn} from "@/apis/common/commonApis";
  import useLogin from "@/store/common/useLogin";


  const emits = defineEmits(['loginRouter', 'handleSellerJoinPage', 'handlePlaceJoinPage'])
  const {getAdmin, getTokens, saveInfo} = useLogin()
  const userInfo = ref({memberId: null, password: null, type:null})
  const userRule = ref([v => !!v || 'required'])

  const handleClickLogin = async () => {
    if ( userInfo.value.memberId == null || userInfo.value.password == null || userInfo.value.type == null ) {
      return
    }

    // userInfo.value.memberId = 'test'
    // userInfo.value.password = 'password'
    // userInfo.value.type = 'seller'

    // userInfo.value.memberId = 'testphj'
    // userInfo.value.password = 'password'
    // userInfo.value.type = 'place'

    const result = await signIn(userInfo.value)
    if (result) {
      saveInfo(result, userInfo.value)
      getTokens()
      const routePage = ( getAdmin() == 'place' ? 'PlacePage' : 'SellerPage' )
      emits('loginRouter', routePage)
    }
  }
</script>


<style scoped>
  .margin-center {
    margin: 0 auto;
  }
</style>
