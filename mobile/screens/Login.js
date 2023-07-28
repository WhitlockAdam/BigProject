import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import Register from '../components/Register'
function Login({navigation})
{
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [pageDetector, setPageDectector] = useState(false);

    /*function LoginInputHandler(loginEmail) {
      setEnteredLoginText(loginEmail);
      onChangeText = {LoginInputHandler
        <TextInput style = {styles.textInput} placeholder='Login' value = {loginEmail} />
        onPress={() => navigation.navigate('Expenses')}
                //<Text>{message}</Text>
                <TextInput style = {styles.textInput} placeholder='Login' ref={(c) => loginEmail = c} />
          <TextInput style = {styles.textInput} placeholder='Password' ref={(c) => loginPassword = c}/>
          <TextInput style = {styles.textInput} placeholder='Login' onChangeText= {(text => this.setState({loginEmail: text}))} value={this.state.loginEmail} />
          <TextInput style = {styles.textInput} placeholder='Password' onChangeText= {(text => this.setState({loginPassword: text}))} value={this.state.loginPassword}/>
  };*/

    function startAddGoalHandler(){
      setModalIsVisible(true);
    }
  
    function endAddGoalHandler(){
      setModalIsVisible(false);
    }
  
    function emailInputHandler(enteredLoginEmail)
    {
      setLoginEmail(enteredLoginEmail);
    }

    function passwordInputHandler(enteredLoginPassword)
    {
      setLoginPassword(enteredLoginPassword);
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
            "https://localhost:5000/" + route;
        }
        //return("https://" + app_name + ".herokuapp.com/" + route);

    }

    //var loginEmail, loginPassword;

    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        var obj = {email: loginEmail, password: loginPassword};
        //var obj = {email: 'test@gmail.com', password: 'test'};

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
            }

            else{
                
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};

                //slocalStorage.setItem("user_data", JSON.stringify(user));

                setMessage("");

                navigation.navigate('Expenses');

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
          <TextInput style = {styles.textInput} placeholder='Login' onChangeText = {emailInputHandler} value = {loginEmail}/>
          <TextInput style = {styles.textInput} placeholder='Password' onChangeText = {passwordInputHandler} value =  {loginPassword}/>
          <View style = {styles.button}>
            <Button title = "Login" onPress={doLogin} />
            <Button title = "Register" onPress={startAddGoalHandler}/>
            <Register visible = {modalIsVisible}  onCancel ={endAddGoalHandler}/>
          </View>
        </View>
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
