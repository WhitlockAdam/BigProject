import { StyleSheet, TextInput, View, Button} from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import * as SecureStore from 'expo-secure-store';

function Login({navigation})
{
    const storage = require('../tokenStorage.js');
    //console.log(storage.storeToken());
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState(''); 
    const [ud, Setud] = useState('');
    const [savedData, setSavedData] = useState('')
    function emailInputHandler(enteredLoginEmail)
    {
      setLoginEmail(enteredLoginEmail);
    }

    function passwordInputHandler(enteredLoginPassword)
    {
      setLoginPassword(enteredLoginPassword);
    }
    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        var obj = {email: loginEmail, password: loginPassword};

        var jsonObj = JSON.stringify(obj); 
        var config =
        {
            method: 'post',
            url: 'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/login',
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(function (response){

            var res = response.data;

            if(res.error){
                
                setMessage(res.error);
            
            }
            else{
                storage.storeToken(res);
                var jsonRes = JSON.stringify(res);
                jsonRes = jwt_decode(jsonRes, {component: true});
                var user = {firstName: jsonRes.firstName, lastName: jsonRes.lastName, _id: jsonRes._id, email: jsonRes.email};
                setMessage("");

                navigation.navigate('Expenses', {user: user});

            }

        })
        .catch(function (e){

            console.log(e);
        
        });
    };



    return (
      <View style ={styles.container}>
        <View style = {styles.top} />
        <View style ={styles.loginContainer}>
          <TextInput style = {styles.textInput} placeholder='Login' onChangeText = {emailInputHandler} value = {loginEmail}/>
          <TextInput style = {styles.textInput} placeholder='Password' onChangeText = {passwordInputHandler} value =  {loginPassword}/>
          <View style = {styles.button}>
            <Button title = "Login" onPress={doLogin} />
            <Button title = "Register" onPress= {() => navigation.navigate('Register')}/>
          </View>
        </View>
      </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#273A4B', 
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    loginContainer: {
      paddingTop: 50,
      alignItems: 'center',
    },
    top: {
      flex: 0.1,
      backgroundColor: 'grey',
      borderWidth: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    textInput: {
      backgroundColor: '#AA9675',
      borderWidth: 1,
      //borderColor: '#cccccc',
      borderColor: '#000000',
      width: '80%',
      marginRight: 8,
      padding: 8,
    },
    button: {
      flexDirection: 'row',
      marginTop:16,
    },
});
