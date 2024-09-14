import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { CardHorizontalFood } from "./food";

export interface FoodVariab {
    id: number;
    name: string;
    description: string;
    image: string;
    restaurantId: number;
    enable: boolean;
}

export function TrendingFoods() {
    const [foods, setFoods] = useState<FoodVariab[]>([])

    useEffect(() => {
        async function getFoods() {
            const response = await fetch("http://192.168.1.6:8080/V1/product/")
            const data = await response.json()
            setFoods(data);
        }

        getFoods();
    }, [])

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