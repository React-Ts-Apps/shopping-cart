
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
type ImageProps = {
    image: string
}

const Carousel = ({ images }: { images: ImageProps[] }) => {
    const [current, setCurrent] = useState<number>(0)

    const previousImage = () => {
        if (current == 0) setCurrent(images.length - 1)
        else setCurrent(current - 1)
    }
    const nextImage = () => {
        if (current == images.length - 1) setCurrent(0)
        else setCurrent(current + 1)
    }

    return (
        <div className="relative overflow-hidden">
            <div className="flex transition-transform ease-out duration-40"
                style={{
                    transform: `translateX(-${current * 100}%)`
                }}>
                {images.map((img, index) => (
                    <div key={index} className="min-w-full">
                        <img src={img.image} alt={`image-${index}`}
                            className="w-full max-h-[400px] object-contain rounded shadow" />
                    </div>
                ))}
            </div>
            <div className="flex absolute top-0 justify-between items-center h-full w-full px-3 text-2xl">
                <button>
                    <FaArrowAltCircleLeft onClick={previousImage} />
                </button>
                <button>
                    <FaArrowAltCircleRight onClick={nextImage} />
                </button>
            </div>
            <div className="absolute bottom-0 flex py-4 gap-2 w-full justify-center">{
                images.map((_, index) => (
                    <div onClick={() => setCurrent(index)}
                        className={`rounded-full w-4 h-4  ${index == current ? "bg-orange-400" : "bg-gray-800"}`} key={`circle-${index}`}></div>
                ))}

            </div>
        </div>
    )
}
export default Carousel