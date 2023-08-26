import {StyleSheet, View, Button, TextInput} from 'react-native';
import { useState } from 'react';
import axios from 'axios';



function Register({navigation})
{

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');


    function emailInputHandler(enteredRegisterEmail)
    {
      setRegisterEmail(enteredRegisterEmail);
    }

    function firstNameInputHandler(enteredRegisterFirstName)
    {
      setRegisterFirstName(enteredRegisterFirstName);
    }
    function lastNameInputHandler(enteredRegisterLastName)
    {
      setRegisterLastName(enteredRegisterLastName);
    }
    function passwordInputHandler(enteredRegisterPassword)
    {
      setRegisterPassword(enteredRegisterPassword);
    }


    const[message, setMessage] = useState("");

    const doRegister = async event => {

        event.preventDefault();

        var obj = {email: registerEmail, password: registerPassword, firstName: registerFirstName, lastName: registerLastName};

        var jsonObj = JSON.stringify(obj); 
    var config =
        {
            method: 'post',
            url: 'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/register',
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(function (response){

            var res = response.data;

            if(res.error){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                navigation.navigate('Activate');

            }

        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });

    };

    return(
            <View style = {styles.registerContainer}>
            <TextInput style = {styles.textInput} placeholder='Email' onChangeText = {emailInputHandler} value = {registerEmail} />
            <TextInput style = {styles.textInput} placeholder='First Name' onChangeText = {firstNameInputHandler} value = {registerFirstName} />
            <TextInput style = {styles.textInput} placeholder='Last Name' onChangeText = {lastNameInputHandler} value = {registerLastName} />
            <TextInput style = {styles.textInput} placeholder='Password' onChangeText = {passwordInputHandler} value = {registerPassword} />

                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button title = "Cancel" onPress = {() => navigation.goBack(null)} />
                    </View>
                    <View style = {styles.button}>
                        <Button title = "Register"  onPress = {doRegister}/>
                    </View>
                </View>
            </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#273A4B',
    },
    textInput: {
        borderWidth: 1,
        //borderColor: '#e4d0ff',
        backgroundColor: '#AA9675',
       // color: '#120438',
        borderRadius: 6,
        width: '100%',
        padding: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop:16,
      },
      button : {
        width: '30%',
        marginHorizontal: 8,
      },
     
});