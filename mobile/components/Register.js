import {StyleSheet, View, Button, TextInput, Modal, Image} from 'react-native';



function Register(props)
{
    return(
        <Modal visible = {props.visible} animationType="slide">
            <View style = {styles.registerContainer}>
            <TextInput style = {styles.textInput} placeholder='Email'/>
            <TextInput style = {styles.textInput} placeholder='First Name'/>
            <TextInput style = {styles.textInput} placeholder='Last Name'/>
            <TextInput style = {styles.textInput} placeholder='Password'/>

                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button title = "Cancel" onPress = {props.onCancel} color = "#f31282"/>
                    </View>
                    <View style = {styles.button}>
                        <Button title = "Register" color = "#f31282"/>
                    </View>
                </View>
            </View>
        </Modal>
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