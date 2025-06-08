import { Schema, model } from 'mongoose'

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
            maxLength: [100, "Product name cannot exceed 100 characters"]
        },
        price: {
            type: Number,
            default: 0.0
        },
        description: {
            type: String,
            required: [true, 'Please enter product description']
        },
        ratings: {
            type: Number,
            default: 0
        },
        images: [
            {
                image: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String,
            required: [true, 'Please enter product category'],
            enum: {
                values: [
                    'Fruits',
                    'Vegetables',
                    'Desserts',
                    'Baking Items',
                    'Diary Products',
                    'Meat and Fish',
                    'Oils',
                    'Nuts and Seeds',
                    'Miscellaneous'
                ],
                message: 'Please select correct category'
            }

        },
        seller: {
            type: String,
            required: [true, 'Please enter product seller']
        },
        stock: {
            type: Number,
            required: [true, 'Please enter stock'],
            maxLength: [20, 'Product stock cannot exceed 20']
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: String,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now()
        }

    })

const Product = model('Product', productSchema)
export default Product