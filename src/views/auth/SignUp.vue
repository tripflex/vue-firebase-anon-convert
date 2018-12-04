<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      type="name"
      name="name"
      data-vv-delay="300"
      v-validate="'required|min:3'"
      :error-messages="errors.collect('name')"
      label="Name"
      v-model="form.name"
      solo
      :disabled="submitting"/>
    <v-text-field
      type="email"
      name="email"
      data-vv-delay="300"
      v-validate="'required|email'"
      :error-messages="errors.collect('email')"
      label="Email"
      v-model="form.email"
      solo
      :disabled="submitting"/>
    <v-text-field
      type="password"
      name="password"
      data-vv-delay="300"
      v-validate="'required|min:6|confirmed:password_confirmation'"
      :error-messages="errors.collect('password')"
      label="Password"
      v-model="form.password"
      solo
      :disabled="submitting"/>
    <v-text-field
      type="password"
      name="password_confirmation"
      data-vv-delay="300"
      v-validate="'required|min:6'"
      :error-messages="errors.collect('password_confirmation')"
      label="Confirm the password"
      v-model="form.password_confirmation"
      ref="password_confirmation"
      solo
      :disabled="submitting"/>

    <v-btn
      v-if="! currentUser.isAnonymous"
      type="submit"
      color="primary"
      block
      large
      class="mb-3"
      @click="submit()"
      :disabled="!isFormValid || submitting">Create New Account</v-btn>
    <v-btn
      v-else
      type="submit"
      color="primary"
      block
      large
      class="mb-3"
      @click="submit()"
      :disabled="!isFormValid || submitting">Convert Anonymous Account</v-btn>
    <v-btn
      :to="{ name: 'Login' }"
      color="indigo"
      :dark="!submitting"
      block
      large
      :disabled="submitting">ALREADY HAVE AN ACCOUNT?</v-btn>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import firebase from '@/config/firebase'
import db from '@/config/firestore'

export default {
  name: 'signup',
  data () {
    return {
      submitting: false,
      dictionary: {
        attributes: {
          email: 'e-mail address',
          password_confirmation: 'password confirmation'
        }
      },
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  computed: {
    isFormValid () {
      return !Object.keys(this.fields).some(key => this.fields[key].invalid)
    },
    ...mapState(['currentUser'])
  },

  methods: {
    ...mapMutations([
      'SHOW_SNACKBAR',
      'HIDE_SNACKBAR'
    ]),
    async submit (){
      
      let valid = await this.$validator.validate();

      if( ! valid ){
        return false;
      }

      try {

        let userData = {
          displayName: this.form.name,
        }

        this.submitting = true
        this.HIDE_SNACKBAR()

        if( this.currentUser && this.currentUser.isAnonymous ){
          userData = await this.registerAnonAccount( userData )
        } else {
          userData = await this.registerAccount( userData )
        }

        await db.users.doc( userData.uid ).set( userData, { merge: true } )
        this.$store.dispatch('FETCH_USER_PROFILE')
        this.$router.push({ name: 'Home' })

      } catch ( error ){
        
        this.submitting = false
        this.form.password = ''
        this.form.password_confirmation = ''
        this.fields.password.invalid = true
        this.fields.password_confirmation.invalid = true
        this.SHOW_SNACKBAR(error.message)

      }

    },
    async registerAnonAccount( userData ){
      try {
        // Store anon uid for reference later
        const anonUID = this.currentUser.uid

        const credential = await firebase.auth.EmailAuthProvider.credential(this.form.email, this.form.password)
        console.log( credential )

        const userCred = await firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
        
        const userLink = userCred.user
        console.log("Anonymous account successfully upgraded", userLink.uid)

        await userCred.user.updateProfile({ displayName: this.form.name })

        userData.uid = userLink.uid
        userData.anonUID = anonUID

        console.log( 'linkAndRetrieveDataWithCredential', userCred )

        return userData
      
      } catch( error ){
        
        console.log( "Error upgrading anonymous account", error )

      }
    },
    async registerAccount( userData ) {
        // Normal account creation
        const response = await firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
        await response.user.updateProfile({ displayName: this.form.name })

        userData.uid = response.user.uid
        userData.anonUID = "Not created from anon account!";

        return userData
    },
    submitOriginal () {
      // Not used, left here only for reference
      this.$validator.validate().then(valid => {
        if (valid) {
          this.submitting = true
          this.HIDE_SNACKBAR()

          firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(response => {
            response.user.updateProfile({
              displayName: this.form.name
            }).then(response => {
              this.$router.push({
                name: 'Home'
              })
            }).catch(error => {
              this.submitting = false
              this.form.password = ''
              this.form.password_confirmation = ''
              this.fields.password.invalid = true
              this.fields.password_confirmation.invalid = true
              this.SHOW_SNACKBAR(error.message)
            })
          }).catch(error => {
            this.submitting = false
            this.form.password = ''
            this.form.password_confirmation = ''
            this.fields.password.invalid = true
            this.fields.password_confirmation.invalid = true
            this.SHOW_SNACKBAR(error.message)
          })
        }
      })
    }
  },

  mounted() {
    this.$validator.localize('en', this.dictionary)
  }
}
</script>
