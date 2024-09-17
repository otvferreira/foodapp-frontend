import { Pressable, View, Image, Text } from "react-native";
import { RestVariab } from "..";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RestaurantDetails'>;

export function RestaurantItem({ item }: { item: RestVariab }) {
    const navigation = useNavigation<NavigationProp>();

    const handlePress = () => {
        navigation.navigate('RestaurantDetails', { restaurantId: item.id });
    };

    return (
        <Pressable
            className="flex flex-row items-center justify-start gap-2"
            onPress={handlePress}
        >
            <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-full"
            />
            <View className="flex gap-1">
                <Text className="font-bold leading-4 text-base text-black text-md" numberOfLines={2}>
                    {item.name}
                </Text>
                <View>
                    <Text className="text-sm">
                        {item.category}
                    </Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Ionicons name='star' size={14} color="#ca8a04" />
                    <Text className="text-sm">{item.stars}</Text>
                </View>
            </View>
        </Pressable>
    );
}
