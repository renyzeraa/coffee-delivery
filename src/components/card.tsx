import { CheckFatIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { QuantityInput } from './quantity-input'
import type { Coffee } from '../@types/coffee'
import { useShallow } from 'zustand/shallow'
import { useCartStore } from '../store/cart'

export function Card({ coffee }: { coffee: Coffee }) {
    const [quantity, setQuantity] = useState(1)
    const [isItemAdded, setIsItemAdded] = useState(false)
    const { addItem } = useCartStore(useShallow((state) => ({
        addItem: state.addItem
    })))

    function incrementQuantity() {
        setQuantity((state) => state + 1)
    }

    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity((state) => state - 1)
        }
    }

    function handleAddItem() {
        addItem({ id: coffee.id, quantity })
        setIsItemAdded(true)
        setQuantity(1)
    }

    useEffect(() => {
        let timeout: number

        if (isItemAdded) {
            timeout = setTimeout(() => {
                setIsItemAdded(false)
            }, 1000)
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [isItemAdded])

    return (
        <div className='bg-base-card pb-5 px-5 rounded-tr-[36px] rounded-bl-[36px] rounded-tl-md rounded-br-md flex flex-col text-center' title={coffee.title}>
            <img className='-mt-5 max-w-[120px] max-h-[120px] self-center' src={coffee.image} alt={coffee.title} />

            <div className='mt-3 flex items-center self-center gap-1'>
                {coffee.tags.map((tag) => (
                    <span className='py-1 px-2 rounded-[100px] bg-yellow-light text-yellow-dark uppercase text-tag font-bold' key={tag}>{tag}</span>
                ))}
            </div>

            <h3 className='mt-4 text-base-subtitle font-baloo-2 font-bold text-titleS'>{coffee.title}</h3>

            <span className='mt-2 w-full text-base-label text-textS'>{coffee.description}</span>

            <div className='flex justify-between items-center mt-8'>
                <div className='flex items-center gap-0.5'>
                    <span className='text-textS text-base-text'>R$</span>
                    <span className='text-titleM font-bold font-baloo-2 text-base-text'>{coffee.price.toFixed(2)}</span>
                </div>

                <div className='flex items-center gap-2 group' data-item-added={isItemAdded}>
                    <QuantityInput
                        quantity={quantity}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                    />

                    <button className='bg-purple-dark group-data-[data-item-added="true"]:bg-yellow-dark transition-colors rounded-md p-2 flex group-data-[data-item-added="true"]:hover:bg-yellow hover:bg-purple' disabled={isItemAdded} onClick={handleAddItem}>
                        {isItemAdded ? (
                            <CheckFatIcon
                                weight="fill"
                                size={22}
                                className='text-base-card'
                            />
                        ) : (
                            <ShoppingCartIcon size={22} className='text-base-card' />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}