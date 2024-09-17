import { View } from "react-native";
import { useState, useEffect } from 'react';
import { RestaurantItem } from "./item";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RestVariab {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    image: string;
    stars: number;
    category: string;
}

interface RestaurantListProps {
    searchQuery: string;
}

export function RestaurantList({ searchQuery }: RestaurantListProps) {
    const [restaurants, setRestaurants] = useState<RestVariab[]>([]);

    useEffect(() => {
        async function getRestaurants() {
            let url = "http://192.168.1.6:8080/V1/restaurant/";
            if (searchQuery) {
                url += `?search=${searchQuery}`;
            }

            try {
                // Recuperar o token do AsyncStorage
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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

        getRestaurants();
    }, [searchQuery]);

    return (
        <View className="px-4 flex-1 w-full h-full mb-11 gap-4">
            {restaurants.map(item => (
                <RestaurantItem item={item} key={item.id} />
            ))}
        </View>
    );
}
