import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { RestaurantItem } from "./horizontal";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Certifique-se de importar corretamente

export interface RestVariab {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    image: string;
}

export function Restaurants() {
    const [restaurants, setRestaurants] = useState<RestVariab[]>([]);

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                // Recuperar o token do AsyncStorage
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                // Fazer a requisição com o token no cabeçalho Authorization
                const response = await fetch("http://192.168.1.6:8080/V1/restaurant/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Incluindo o token como Bearer
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar restaurantes');
                }

                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error('Erro ao buscar restaurantes:', error);
            }
        }

        fetchRestaurants();
    }, []);

    return (
        <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantItem item={item} />}
            horizontal
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />
    );
}
