
export type Review = {
    name: string;
    rating: string;
    comment: string;
}

export type Image = {
    image: string;
}

export type UserFormProps = {
    initialValues: {
        name: string;
        email: string;
        password?: string;
        avatar?: string;
    };
    onSubmit: (formData: FormData) => void;
    buttonLabel: string;
    showPasswordField?: boolean;
    isLoading?: boolean;
}


export type ItemProps = {
    _id?: number;
    __v?: string;
    name: string;
    price: number;
    description: string;
    ratings: number;
    images: Image[];
    category: 'Fruits' |
    'Vegetables' |
    'Desserts' |
    'Baking Items' |
    'Diary Products' |
    'Meat and Fish' |
    'Oils' |
    'Nuts and Seeds' |
    'Miscellaneous';
    seller: string;
    stock: number;
    numOfReviews: number;
    reviews: Review[];
    createdAt: string | Date;
}
export type User = {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    createdAt?: Date;
}

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
}

export type LoginProps = Omit<User, 'name'>

export type CartItemProps = ItemProps & {
    quantity: number;
}

export type PaginateProps = {
    pageCount: number;
    onPageChange: (pageNum: number) => void;
    currentPage: number;
}

export type FilterProps = {
    price: [number, number];
    ratings: null | number;
}

export type SideBarProps = {
    isOpen: boolean;
    onToggle: () => void;
    onCategoryChange: (category: string) => void;
    onApplyFilter: () => void;
    productCategory: string;
    isApplyDisabled: boolean;
    filters: FilterProps;
    onFilterChange: <K extends keyof FilterProps>(name: K, value: FilterProps[K]) => void;
}





