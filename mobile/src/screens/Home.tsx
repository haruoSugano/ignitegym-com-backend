import { useState, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text, useToast } from "native-base";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

import { AppNavigatorRoutesApp } from "@routes/app.routes";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groupSelected, setGroupSelected] = useState('antebraço');

    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesApp>();

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate("exercise", { exerciseId });
    }

    async function fetchGroup() {
        try {
            const response = await api.get("/groups");

            setGroups(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsLoading(true);

            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os exercicios";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGroup();
    }, []);

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    }, [groupSelected]));

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                minH={10}
            />

            {
                isLoading ? <Loading /> :

                    <VStack flex={1} px={8}>
                        <HStack justifyContent="space-between" mb={5}>
                            <Heading color="gray.200" fontSize="md" fontFamily="heading">
                                Exercicios
                            </Heading>

                            <Text color="gray.200" fontSize="sm">
                                4
                            </Text>
                        </HStack>

                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ExerciseCard
                                    data={item}
                                    onPress={() => handleOpenExerciseDetails(item.id)}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </VStack>
            }
        </VStack>
    );
}
