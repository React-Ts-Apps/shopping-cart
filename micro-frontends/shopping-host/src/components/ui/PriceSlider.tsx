import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { type HTMLAttributes, type ReactElement } from 'react';

interface RenderProps {
    index: number;
    prefixCls: string;
    value: number;
    dragging: boolean;
    draggingDelete: boolean;
}

type SliderProps = {
    sliderHandle: (value: number | number[]) => void;
    price: number | number[]
}

const PriceSlider = ({ sliderHandle, price }: SliderProps) => {
    const handleRender = (origin: ReactElement<HTMLAttributes<HTMLDivElement>>, props: RenderProps) => {
        return (
            <Tooltip
                visible={props.dragging}
                prefixCls="rc-tooltip"
                overlay={`${props.value}kr`}
                placement="top"
                key={props.index}
            >
                {origin}
            </Tooltip>)
    }
    return (
        <div className="w-40">
            <Slider
                range={{
                    draggableTrack: true,
                    minCount: 1,
                    maxCount: 10
                }}
                min={1}
                max={1000}

                marks={{
                    1: '1kr',
                    1000: '1000kr'
                }}

                value={price}
                handleRender={handleRender}
                onChange={sliderHandle}

            />
        </div>
    );
};

export default PriceSlider;


