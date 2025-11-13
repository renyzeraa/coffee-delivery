import { MinusIcon, PlusIcon } from '@phosphor-icons/react'

type Props = {
    quantity: number
    incrementQuantity: () => void
    decrementQuantity: () => void
}

export function QuantityInput({
    quantity,
    incrementQuantity,
    decrementQuantity,
}: Props) {
    return (
        <div className='p-2 bg-base-button rounded-md flex gap-2 items-center'>
            <button className='bg-transparent flex items-center' onClick={decrementQuantity}>
                <MinusIcon className='text-purple transition-all hover:text-purple-dark' size={14} />
            </button>
            <span className='pt-0.5 text-base-title'>{quantity}</span>
            <button className='bg-transparent flex items-center' onClick={incrementQuantity}>
                <PlusIcon className='text-purple transition-all hover:text-purple-dark' size={14} />
            </button>
        </div>
    )
}