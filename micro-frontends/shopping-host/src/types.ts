
export type Review = {
    name: string;
    rating: string;
    comment: string;
}

export type Image = {
    image: string;
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
export type UserProps = {
    name: string;
    email: string;
    password: string;
}

export type LoginProps = Omit<UserProps, 'name'>

export type CartItemProps = ItemProps & {
    quantity: number;
}

export type PaginateProps = {
    pageCount: number;
    onPageChange: (pageNum: number) => void;
}

