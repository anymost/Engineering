
/**
 * Created by bradyzhang on 2016/12/30.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

export default Vue.http;
