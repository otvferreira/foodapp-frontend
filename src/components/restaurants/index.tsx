import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { RestaurantItem } from './horizontal';

export interface RestVariab {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    image: string;
}

export function Restaurants() {
    const [restaurants, setRestaurant] = useState<RestVariab[]>([])

    useEffect(() => {
        async function getRestaurants() {
            const response = await fetch("http://192.168.1.6:8080/V1/restaurant/")
            const data = await response.json()
            setRestaurant(data);
        }

        getRestaurants();
    }, [])

    return (
        <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantItem item={item} />}
            horizontal={true}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />
    );
}