import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

import Register from '../components/Register'
function Login({navigation})
{
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [enteredLoginText, setEnteredLoginText] = useState('');
    const [pageDetector, setPageDectector] = useState(false);

    /*function LoginInputHandler(loginEmail) {
      setEnteredLoginText(loginEmail);
      onChangeText = {LoginInputHandler
        <TextInput style = {styles.textInput} placeholder='Login' value = {loginEmail} />
        onPress={() => navigation.navigate('Expenses')}
  };*/

    function startAddGoalHandler(){
      setModalIsVisible(true);
    }
  
    function endAddGoalHandler(){
      setModalIsVisible(false);
    }
  
    function pageSwitcher()
    {
      setPageDectector(true);
    }



    const app_name = "budget-manager-group14-bacfc735e9a2";
    function buildPath(route)
    {

        if(process.env.NODE_ENV === "production")
        {
            return("https://" + app_name + ".herokuapp.com/" + route);
        }
        else
        {
            //return "https://localhost:5000/" + route;
            //return 'https://10.127.28.104:5000/' + route;
        }
        return("https://" + app_name + ".herokuapp.com/" + route);

    }

    var loginEmail, loginPassword;

    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        var obj = {email: loginEmail.value, password: loginPassword.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                //buildPath("api/login"), 
                'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/login',
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.id <= 0){
                
                setMessage(res.error)
                console.log('dong');
            }

            else{
                
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};

                localStorage.setItem("user_data", JSON.stringify(user));

                setMessage("");

                console.log('ding');

                this.navigation.navigate('Expenses');

            }

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }

    };



    return (
      <View style ={styles.container}>
        <View style = {styles.top} />
        <View style ={styles.loginContainer}>
          <TextInput style = {styles.textInput} placeholder='Login' ref={(c) => loginEmail = c} />
          <TextInput style = {styles.textInput} placeholder='Password' ref={(c) => loginPassword = c}/>
          <View style = {styles.button}>
            <Button type = "submit" title = "Login" onPress={doLogin} />
            <Button title = "Register" onPress={startAddGoalHandler}/>
            <Register visible = {modalIsVisible}  onCancel ={endAddGoalHandler}/>
          </View>
        </View>
        <Text>{message}</Text>
      </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      borderWidth: 1,
      borderColor: '#cccccc',
      width: '80%',
      marginRight: 8,
      padding: 8,
    },
    button: {
      flexDirection: 'row',
      marginTop:16,
    },
});
