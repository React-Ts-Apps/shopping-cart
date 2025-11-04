
export type MealProps =
  | {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
    strInstructions?: string;
    strCategory: string;
    strArea: string;
    strTags?: string;
    strYoutube?: string;
    strSource?: string;
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
  }
  | undefined;


export type CategoryProps = {
  strCategory: string;
};

export type AreaProps = {
  strArea: string;
};

export type IngredientProps = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string;
  imgSrc: string;
};

export type MealHubProps = 'categories' | 'areas' | 'ingredients' | 'random' | 'search';

export type MealHubGroups = {
  categories: CategoryProps[];
  areas: AreaProps[];
  ingredients: IngredientProps[];
}

export type MealHubGroupsKeys = keyof MealHubGroups;

export type MealHubListProps = {
  type: 'categories' | 'areas';
  onItemClick: (val: string) => void;
}

export type PopUpProps = {
  id: string;
  description: string;
  imgSrc: string;
  type: string;
  name: string;
}

