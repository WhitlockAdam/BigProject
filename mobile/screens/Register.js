import {StyleSheet, View, Button, TextInput} from 'react-native';
import { useState } from 'react';



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
        try{

            const response = await fetch(
                'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/register', 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.id <= 0){
                
                setMessage("Failed to register.")
            
            }

            else{
                
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};

                //localStorage.setItem("user_data", JSON.stringify(user));

                setMessage("");

                navigation.navigate('Expenses');

            }

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }

    };

    return(
            <View style = {styles.registerContainer}>
            <TextInput style = {styles.textInput} placeholder='Email' onChangeText = {emailInputHandler} value = {registerEmail} color = "#f31282"/>
            <TextInput style = {styles.textInput} placeholder='First Name' onChangeText = {firstNameInputHandler} value = {registerFirstName} color = "#f31282"/>
            <TextInput style = {styles.textInput} placeholder='Last Name' onChangeText = {lastNameInputHandler} value = {registerLastName} color = "#f31282"/>
            <TextInput style = {styles.textInput} placeholder='Password' onChangeText = {passwordInputHandler} value = {registerPassword} color = "#f31282"/>

                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button title = "Cancel" onPress = {() => navigation.goBack(null)}  color = "#f31282"/>
                    </View>
                    <View style = {styles.button}>
                        <Button title = "Register" color = "#f31282" onPress = {doRegister}/>
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
        backgroundColor: '#fff',
        //backgroundColor: '#311b6b'
    },
    textInput: {
        borderWidth: 1,
        //borderColor: '#e4d0ff',
        //backgroundColor: '#e4d0ff',
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