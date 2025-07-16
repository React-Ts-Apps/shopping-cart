import type { CardCvcElementComponent, CardExpiryElementComponent, CardNumberElementComponent } from "@stripe/react-stripe-js"

export type Review = {
    name: string;
    rating: string;
    comment: string;
}

export type Image = {
    image: string;
}

export type ErrorPops = {
    data?: {
        message?: string
    }
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
    _id: string;
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

export type ShippingProps = {
    address: string;
    country: string;
    city: string;
    phoneNo: string;
    postalCode: string;
}

export type StripeShippingInfo = {
    name: string;
    address: {
        line1: string;
        city: string;
        postal_code: string;
        country: string;
        state?: string;
    };
};

export type OrderItemProps = {
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
}

export type OrderBaseProps = {
    shippingInfo: ShippingProps;
    orderItems: OrderItemProps[];
    itemsPrice: number;
    shippingPrice: number;
    taxValue: number;
    totalPrice: number;
    paidAt: Date;
    createdAt: Date;
    paymentInfo: {
        id: string;
        status: string;
    }
}

export type OrderProps = OrderBaseProps & {
    user: string;
}

export type MyOrderProps = OrderProps & {
    orderStatus: 'Processing' | 'Delivered';
    _id: string;
}

export type StripeFieldProps = {
    label: string;
    id: string;
    Element: CardCvcElementComponent | CardExpiryElementComponent | CardNumberElementComponent;
}




