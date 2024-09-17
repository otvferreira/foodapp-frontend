import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.6:8080/V1/auth/login', { email, password });
            const { token, email: userEmail } = response.data;

            // Armazenar o token e o email no AsyncStorage
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userEmail', userEmail);

            Alert.alert('Sucesso', 'Login realizado com sucesso!');

            // Navegar para a tela Home
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais.');
        }
    };

    return (
        <View className="flex-1 justify-center p-6">
            <Text className="text-2xl font-bold mb-6 text-center">FoodAPP - Grão Direto - Desafio</Text>
            <Image
                source={require("../../assets/mvp.png")}
                className="w-full h-32 md:h-60 rounded-2xl"
            />
            <View className="mb-4 pt-4">
                <Text className="text-gray-700 mb-2">Email</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View className="mb-6">
                <Text className="text-gray-700 mb-2">Senha</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                className="bg-blue-500 p-3"
                onPress={((handleLogin))}
            >
                <Text className="w-full text-black text-center font-bold border rounded-md py-2">Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
