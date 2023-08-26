import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'; 

exports.storeToken =
async function (value) {

    try{
       await SecureStore.setItemAsync('tokenData', value.accessToken);
    }
    catch(e){
        console.log(e.message);
    }
  }

  exports.retrieveToken = 
  async function () {
    var ud;
    try{
        await SecureStore.getItemAsync('tokenData'); 
    }
    catch(e){
        console.log(e.message);
    }
    return ud;
  }
  