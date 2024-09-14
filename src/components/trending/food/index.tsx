import { View, Pressable, Text, Image } from "react-native";
import { FoodVariab } from "..";
import { Ionicons } from "@expo/vector-icons";

export function CardHorizontalFood({ food }: { food: FoodVariab }) {
    return (
        <Pressable className="flex flex-col rounded-xl relative">
            <Image
                source={{ uri: food.image }}
                className="w-44 h-36 rounded-xl"
            />

            <View className="flex flex-row bg-neutral-900/90 w-fit gap-1 rounded-full absolute top-2 right-2 px-2 py-1
            items-center justify-center">
                <Ionicons name="star" size={14} color="#ca8a04">
                    {/* <Text className="text-white text-sm">{food.rating}</Text> */}
                </Ionicons>
            </View>

            <Text className="text-black mt-1">
                {food.name}
            </Text>
        </Pressable>
    );
}