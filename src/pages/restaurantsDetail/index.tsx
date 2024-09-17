import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/'; // Ajuste o caminho conforme necessário
import { Section } from '@/src/components/section';
import { TrendingFoods } from '@/src/components/trending';

type RestaurantDetailsRouteProp = RouteProp<RootStackParamList, 'RestaurantDetails'>;

export default function RestaurantDetails() {
    const route = useRoute<RestaurantDetailsRouteProp>();
    const { restaurantId } = route.params;
    const [restaurant, setRestaurant] = useState<any>(null);

    useEffect(() => {
        async function fetchRestaurantDetails() {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('Token não encontrado');

                const response = await fetch(`http://192.168.1.6:8080/V1/restaurant/find/${restaurantId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Erro ao buscar detalhes do restaurante');

                const data = await response.json();
                setRestaurant(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRestaurantDetails();
    }, [restaurantId]);

    if (!restaurant) {
        return <Text>Carregando...</Text>;
    }

    return (
        <ScrollView>
            <View className='flex flex-col justify-center bg-slate-200'>
                <View className='flex flex-col justify-center items-center pt-20'>
                    <Image
                        source={{ uri: restaurant.image }}
                        className='w-40 h-40 rounded-full text-center' />
                    <Text className='text-black mt-2 font-bold text-2xl'>{restaurant.name}</Text>
                    <Text className='text-md'>{restaurant.address}</Text>
                    <Text className='text-md'>{restaurant.phoneNumber}</Text>
                    <Text className='text-md'>{restaurant.category}</Text>
                </View>

                <Section
                    name="Pratos"
                    label="Veja mais"
                    action={() => console.log("VEJA MAIS")}
                    size="text-xl"
                />

                <TrendingFoods restaurantId={restaurantId} typeFood="comida" />

                <Section
                    name="Bebidas"
                    label="Veja mais"
                    action={() => console.log("VEJA MAIS")}
                    size="text-xl"
                />

                <TrendingFoods restaurantId={restaurantId} typeFood="bebida" />
            </View>
        </ScrollView>
    );
}
