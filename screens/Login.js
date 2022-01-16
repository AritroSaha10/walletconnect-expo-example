import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const Login = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Login Screen</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                <Text>Move to Signup Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                });
            }}>
                <Text>Go to dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>navigation.navigate('Connection')}>
                <Text>Wallet Connection</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Login