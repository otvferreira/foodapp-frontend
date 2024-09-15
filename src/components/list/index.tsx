import { View } from "react-native";
import { useState, useEffect } from 'react';
import { RestaurantItem } from "./item";
import { Search } from '../input-search';

export interface RestVariab {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    image: string;
    stars: number;
    category: string;
}

interface RestaurantListProps {  // Adicionando a interface para as props
    searchQuery: string;  // Propriedade para a busca
}

export function RestaurantList({ searchQuery }: RestaurantListProps) {  // Recebendo a propriedade searchQuery
    const [restaurants, setRestaurants] = useState<RestVariab[]>([]);

    useEffect(() => {
        async function getRestaurants() {
            let url = "http://192.168.1.6:8080/V1/restaurant/";
            if (searchQuery) {
                url += `?search=${searchQuery}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setRestaurants(data);
        }

        getRestaurants();
    }, [searchQuery]);  // Atualiza sempre que o searchQuery mudar

    return (
        <View className="px-4 flex-1 w-full h-full mb-11 gap-4">
            {restaurants.map(item => (
                <RestaurantItem item={item} key={item.id} />
            ))}
        </View>
    );
}
