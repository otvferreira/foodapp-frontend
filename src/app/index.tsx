import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import { Banner } from "../components/banner";
import { Search } from "../components/input-search";
import { Section } from "../components/section";
import { TrendingFoods } from "../components/trending";
import { Restaurants } from "../components/restaurants";
import { RestaurantList } from "../components/list";

import Constants from "expo-constants";
import { useState } from "react";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');  // Adicione o estado da busca

  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />

        <Banner />

        {/* Passando a função 'setSearchQuery' para o componente Search */}
        <Search onSearch={setSearchQuery} />
      </View>

      <Section
        name="Comidas em Alta"
        label="Veja mais"
        action={() => console.log("VEJA MAIS")}
        size="text-xl"
      />

      <TrendingFoods />

      <Section
        name="Restaurantes em Alta"
        label="Veja mais"
        action={() => console.log("VEJA MAIS RESTAURANTES EM ALTA")}
        size="text-xl"
      />
      <Restaurants />

      <Section
        name="Restaurantes"
        label="Veja mais"
        action={() => console.log("VEJA MAIS RESTAURANTES")}
        size="text-xl"
      />
      <RestaurantList searchQuery={searchQuery} />

    </ScrollView>
  );
}
