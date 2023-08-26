import {StyleSheet, View, Button, TextInput} from 'react-native';
import { useState } from 'react';
import axios from 'axios';

function Activate({navigation}){
    

    const [email, setActivationEmail] = useState('');
    const [verificationCode, setActivationCode] = useState('');


    function emailInputHandler(enteredActivationEmail)
    {
      setActivationEmail(enteredActivationEmail);
    }

    function codeInputHandler(enteredActivationCode)
    {
      setActivationCode(enteredActivationCode);
    }

    const[message, setMessage] = useState("");
    
    const doActivation = async event => {

        event.preventDefault();

        var obj = {email: email, verificationCode: verificationCode};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url:'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/verify',
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(async function(response){

            var res = response.data;

            if(res.error !== ""){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                navigation.navigate('Login');

            }

        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });

    };

    return( 
        <View style = {styles.container}>
        <View style ={styles.inputContainer}> 
            <TextInput style = {styles.textInput} placeholder = 'Email' onChangeText={emailInputHandler} value = {email} />
            <TextInput style = {styles.textInput} placeholder = 'Code' onChangeText={codeInputHandler} value = {verificationCode}/>
            <View style = {styles.buttonContainer}>
                <Button title = "Cancel" onPress = {() => navigation.goBack(null)} />
                <Button title = 'submit' onPress = {doActivation}/>
            </View>
        </View>

        </View>
    );

    

}

export default Activate;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#273A4B', 
      paddingTop: 50,
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    inputContainer: {
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop:16,
      },
});
