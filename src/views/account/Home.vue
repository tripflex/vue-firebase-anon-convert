<template>
  <div>
    <v-container>
      <p v-if="! currentUser.isAnonymous">
        Welcome <strong>{{ currentUser.displayName }}</strong>!  You're using a full standard account! Yay!
      </p>
      <p v-else>
        You're signed in under an Anonymous Account!
      </p>
      <v-card v-if="userProfile">
        <v-card-title><h4>User Profile</h4></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile v-if="typeof userProfile.wasAnonymous !== 'undefined'">
            <v-list-tile-content>wasAnonymous</v-list-tile-content>
            <v-list-tile-content class="align-end">{{userProfile.wasAnonymous}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>UID</v-list-tile-content>
            <v-list-tile-content class="align-end">{{userProfile.uid}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>displayName</v-list-tile-content>
            <v-list-tile-content class="align-end">{{userProfile.displayName}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>anonUID</v-list-tile-content>
            <v-list-tile-content class="align-end">{{userProfile.anonUID}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userProfile.randomAnonOnlyData">
            <v-list-tile-content>Random Anon Only Data</v-list-tile-content>
            <v-list-tile-content class="align-end">{{userProfile.randomAnonOnlyData}}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-card v-if="currentUser">
        <v-card-title><h4>Current User</h4></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>UID</v-list-tile-content>
            <v-list-tile-content class="align-end">{{currentUser.uid}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>displayName</v-list-tile-content>
            <v-list-tile-content class="align-end">{{currentUser.displayName}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>isAnonymous</v-list-tile-content>
            <v-list-tile-content class="align-end">{{currentUser.isAnonymous}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="currentUser.metadata && currentUser.metadata.creationTime">
            <v-list-tile-content>creationTime</v-list-tile-content>
            <v-list-tile-content class="align-end">{{currentUser.metadata.creationTime}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="currentUser.metadata && currentUser.metadata.lastSignInTime">
            <v-list-tile-content>lastSignInTime</v-list-tile-content>
            <v-list-tile-content class="align-end">{{currentUser.metadata.lastSignInTime}}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: mapState(['currentUser', 'userProfile'])
}
</script>
