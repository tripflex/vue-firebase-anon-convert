# Vue Firebase Anonymous Accounts
This is a demo of converting Anonymous firebase user accounts to full accounts, made possible using boilerplate from the awesome [https://github.com/sayhicoelho/vue-firebase](https://github.com/sayhicoelho/vue-firebase)

## Demo
[https://authdemo-vue.firebaseapp.com](https://authdemo-vue.firebaseapp.com)

## Sandbox Editor
https://codesandbox.io/s/github/tripflex/vue-firebase-anon-convert

### Anonymous Account Login
[/src/views/auth/Login.vue#L105](https://github.com/tripflex/vue-firebase-anon-convert/blob/master/src/views/auth/Login.vue#L105)

### Anonymous Account Convert
[/src/views/auth/SignUp.vue#L149](https://github.com/tripflex/vue-firebase-anon-convert/blob/master/src/views/auth/SignUp.vue#L149)

### Other Changes
There are a few other changes in here outside of the original [vue-firebase](https://github.com/sayhicoelho/vue-firebase) project:

 - Added demo Firebase Project credentials for testing (it's a free account, so you won't be able to be a douche and try and rack up a bill on me)
 - `userProfile` was added to the vuex store, along with related actions and mutation methods.
 - [/src/config/firestore.js](https://github.com/tripflex/vue-firebase-anon-convert/blob/master/src/config/firestore.js) was added to create a user database to set profile values on (to confirm they remain after upgrading anonymous account)

There are also numerous other minor changes added throughout to add support for anonymous account, checking `currentUser`, and so on.  If you want to see all changes, run a diff with this repo against commit `8048d8db59be8e24d11216f1457db226942a08c0` in the [vue-firebase](https://github.com/sayhicoelho/vue-firebase) repo.

# Vue Firebase
The Vue Firebase is a boilerplate to prevent you from starting a Vue.js & Firebase project from scratch. With that you don't need to worry about some needed features like Authentication, Layout (UI/UX), Environment Variables (DotEnv) and more.

# Setup (to use in your own project or as boilerplate)
* Run `npm install`
* Remove demo firebase project file at [/src/config/firebase.js](https://github.com/tripflex/vue-firebase-anon-convert/blob/master/src/config/firebase.js) and rename [/src/config/firebase.default.js](https://github.com/tripflex/vue-firebase-anon-convert/blob/master/src/config/firebase.default.js) to `firebase.js`
* Copy the file `.env.example` to `.env`
* Pass your Firebase's configuration within quotations, e.g FIREBASE_API_KEY='"YOUR_API_KEY"' (you will have to replace the demo ones)
* Run `npm run dev` to start the Vue application

# License
[MIT](LICENSE) license.
