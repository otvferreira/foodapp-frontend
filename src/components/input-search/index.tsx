import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

interface SearchProps {
    onSearch: (text: string) => void;  // Define o tipo de onSearch
}

export function Search({ onSearch }: SearchProps) {
    const [searchText, setSearchText] = useState('')

    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);  // Chama a função de callback passada como props
    }

    return (
        <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent'>
            <Feather name='search' size={24} color="#64748b" />
            <TextInput
                placeholder='Pesquisar...'
                value={searchText}
                onChangeText={handleSearch} // Atualiza a busca a cada alteração
                className='w-full h-full flex-1 bg-transparent'
            />
        </View>
    );
}
