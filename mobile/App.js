import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/Login'
import Expenses from './screens/Expenses'


/*function HomeScreen() 
{
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={{ fontSize: 28 }}>Content is in safe area.</Text>
    </View>
  );
}*/

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Group screenOptions={{presentation: "modal"}}>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: '', headerShown: false}}
        />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
/* <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>*/