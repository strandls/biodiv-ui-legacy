import axios from 'axios';
import {connect} from 'react-redux';


import {Config} from '../Config';

/**
 * Class to hold all userGroups ... singleton class
 * TODO: cache loaded values
 */
class UserGroup {

    constructor() {
        let values;
    }

    fetch(callback) {
        const url=`${Config.api.API_ROOT_URL}/userGroup/list`;
        if(callback) {
            axios.get(url).then(response => {
              this.values=response.data;
              callback(response.data);
            })
            return;
        } else
        return axios.get(url).then(response => response.data);
    }

    list(callback) {
        if(this.values) {
            if(callback) return callback(this.values);
            else return this.values;
        } else return this.fetch(callback);
    }

}

export default new UserGroup();
