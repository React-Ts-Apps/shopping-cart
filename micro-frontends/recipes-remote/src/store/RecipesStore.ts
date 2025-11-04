import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import type { MealHubProps, MealProps } from '../types';

type RecipesStoreState = {
    mealHubItem: MealHubProps;
    selectedCategory: string;
    selectedArea: string;
    currentPage: number;
    selectedDishId: string;
    showPopUp: boolean;
    selectedDish: MealProps;
    selectedIngredient: string;
    searchText: string;
    setSearchText: (search: string) => void;
    setSelectedDishId: (id: string) => void;
    setSelectedDish: (dish: MealProps) => void;
    setSelectedCategory: (category: string) => void;
    setSelectedArea: (area: string) => void;
    setSelectedIngredient: (ing: string) => void;
    setCurrentPage: (page: number) => void;
    setMealHubItem: (type: MealHubProps) => void;
    handleShowPopUp: (idMeal?: string) => void;
    closePopUp: () => void;
}



export const useRecipesStore = create<RecipesStoreState>()(persist((set, get) => ({
    mealHubItem: 'categories',

    selectedCategory: 'Beef',
    selectedArea: 'American',
    selectedIngredient: '',
    selectedDish: undefined,
    currentPage: 1,
    selectedDishId: '',
    showPopUp: false,
    searchText: '',
    setSearchText: (text) => set({ searchText: text, currentPage: 1 }),
    setMealHubItem: (item) => set({ mealHubItem: item }),

    setSelectedDish: (meal) => set({ selectedDish: meal }),

    setSelectedDishId: (id) => set({ selectedDishId: id }),

    setSelectedCategory: (val) => {
        if (val === get().selectedCategory) return
        set({ selectedCategory: val, currentPage: 1 });

    },

    setSelectedArea: (val) => {
        if (val === get().selectedArea) return
        set({ selectedArea: val, currentPage: 1 })
    },

    setSelectedIngredient: (val) => {
        if (val === get().selectedIngredient) return
        set({ selectedIngredient: val, currentPage: 1 })
    },

    setCurrentPage: (val) => {
        if (val === get().currentPage) return
        set({ currentPage: val });
    },

    handleShowPopUp: (idMeal) => set(() => ({
        showPopUp: true,
        selectedDishId: idMeal
    }
    )),

    closePopUp: () => set(() => ({
        showPopUp: false
    }))
}), {
    name: 'recipe-hub', partialize: (state) => ({
        mealHubItem: state.mealHubItem,
        selectedArea: state.selectedArea,
        selectedCategory: state.selectedCategory,
        selectedIngredient: state.selectedIngredient,
        currentPage: state.currentPage,
    })
}))