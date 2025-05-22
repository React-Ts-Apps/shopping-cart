import { useState, type ChangeEvent, type FormEvent } from "react"

const ProductForm = () => {
    const [form, setForm] = useState({ name: '', description: '', price: 0, imgSrc: '' })
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-10 max-w-xl mx-auto">
            <h2 className="font-semibold text-gray-800 mb-4 text-center" >Add New Item</h2>
            <div className="flex items-center gap-4">
                <label htmlFor="name" className="w-32 text-sm text-gray-800 font-medium">Name:</label>
                <input type="text" id="name" name="name" onChange={(e) => handleOnChange(e)} placeholder="Name"
                    value={form.name}
                    className="flex-1 border px-3 py-2 rounded" />
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="description" className="w-32 text-sm text-gray-800 font-medium">Description:</label>
                <textarea id="description" name="description" onChange={(e) => handleOnChange(e)}
                    value={form.description}
                    placeholder="Description" className="flex-1 border px-3 py-2 rounded" />
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="price" className="w-32 text-sm text-gray-800 font-medium">Price:</label>
                <input type="text" id="price" name="price" onChange={(e) => handleOnChange(e)}
                    value={form.price}
                    placeholder="Price" className="flex-1 border px-3 py-2 rounded" />
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="imgSrc" className="w-32 text-sm text-gray-800 font-medium">Image URL:</label>
                <input type="text" id="imgSrc" name="imgSrc" onChange={(e) => handleOnChange(e)}
                    value={form.imgSrc}
                    placeholder="Image URL" className="flex-1 border px-3 py-2 rounded" />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit
                </button>
            </div>

        </form>

    )
}
export default ProductForm