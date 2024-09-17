import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { CardHorizontalFood } from "./food";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FoodVariab {
    id: number;
    name: string;
    description: string;
    image: string;
    restaurantId: number;
    price: number;
    enable: boolean;
}

interface TrendingFoodsProps {
    restaurantId: number;
    typeFood: string;
}

export function TrendingFoods({ restaurantId, typeFood }: TrendingFoodsProps) {
    const [foods, setFoods] = useState<FoodVariab[]>([]);

    useEffect(() => {
        async function getFoods() {
            try {
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                    throw new Error("Token de autenticação não encontrado");
                }

                const response = await fetch(`http://192.168.1.6:8080/V1/product/find/${restaurantId}?type=${typeFood}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar os produtos');
                }

                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            }
        }

        getFoods();
    }, [restaurantId, typeFood]);

    return (
        <FlatList
            data={foods}
            renderItem={({ item }) => <CardHorizontalFood food={item} />}
            horizontal={true}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />
    );
}
