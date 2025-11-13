import { Fragment } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    BankIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    MoneyIcon,
    SmileySadIcon,
    TrashIcon,
} from '@phosphor-icons/react'
import { TextInput } from '../components/text-input'
import { Radio } from '../components/radio'
import { QuantityInput } from '../components/quantity-input'
import { useCartStore } from '../store/cart'
import { useShallow } from 'zustand/shallow'
import { useCoffeeStore } from '../store/coffee'
import { Link, useNavigate } from 'react-router-dom'

const newOrder = z.object({
    cep: z.number({ error: 'Informe o CEP' }),
    street: z.string().min(1, 'Informe a rua'),
    number: z.string().min(1, 'Informe o número'),
    fullAddress: z.string(),
    neighborhood: z.string().min(1, 'Informe o bairro'),
    city: z.string().min(1, 'Informe a cidade'),
    state: z.string().min(1, 'Informe a UF'),
    paymentMethod: z.enum(['credit', 'debit', 'cash'], {
        error: 'Informe um método de pagamento',
    }),
})

export type OrderInfo = z.infer<typeof newOrder>

const shippingPrice = 3.5

export function Cart() {
    const {
        items,
        checkout,
        removeItem,
        incrementItemQuantity,
        decrementItemQuantity,
    } = useCartStore(useShallow(state => ({
        items: state.items,
        checkout: state.checkout,
        removeItem: state.removeItem,
        incrementItemQuantity: state.incrementItemQuantity,
        decrementItemQuantity: state.decrementItemQuantity,
    })))

    const { coffees } = useCoffeeStore(useShallow(state => ({
        coffees: state.coffees
    })))

    const navigate = useNavigate()

    const coffeesInCart = items.map((item) => {
        const coffeeInfo = coffees.find((coffee) => coffee.id === item.id)

        if (!coffeeInfo) {
            throw new Error('Invalid coffee.')
        }

        return {
            ...coffeeInfo,
            quantity: item.quantity,
        }
    })

    const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
        return (previousValue += currentItem.price * currentItem.quantity)
    }, 0)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<OrderInfo>({
        resolver: zodResolver(newOrder),
    })

    const selectedPaymentMethod = watch('paymentMethod')

    function handleItemIncrement(itemId: string) {
        incrementItemQuantity(itemId)
    }

    function handleItemDecrement(itemId: string) {
        decrementItemQuantity(itemId)
    }

    function handleItemRemove(itemId: string) {
        removeItem(itemId)
    }

    const handleOrderCheckout: SubmitHandler<OrderInfo> = (data) => {
        if (items.length === 0) {
            return alert('É preciso ter pelo menos um item no carrinho')
        }

        checkout(data, navigate)
    }

    return (
        <main className='flex max-w-[1160px] py-10 px-5 mx-auto gap-8'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-titleXS font-baloo-2 font-bold text-base-subtitle'>Complete seu pedido</h2>

                <form className='flex flex-col gap-8' id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
                    <div className='p-10 rounded-md bg-base-card w-full min-w-[640px] flex flex-col gap-8'>
                        <div className='flex gap-2'>
                            <MapPinIcon className='text-yellow-dark' size={22} />

                            <div>
                                <span className='text-base-subtitle'>Endereço de Entrega</span>
                                <p className='text-textS'>Informe o endereço onde deseja receber o seu pedido</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-[200px_1fr_60px] gap-y-4 gap-x-3 grid-area-for-checkout'>
                            <TextInput
                                placeholder="CEP"
                                type="number"
                                containerProps={{ style: { gridArea: 'cep' } }}
                                error={errors.cep}
                                {...register('cep', { valueAsNumber: true })}
                            />

                            <TextInput
                                placeholder="Rua"
                                containerProps={{ style: { gridArea: 'street' } }}
                                error={errors.street}
                                {...register('street')}
                            />

                            <TextInput
                                placeholder="Número"
                                containerProps={{ style: { gridArea: 'number' } }}
                                error={errors.number}
                                {...register('number')}
                            />

                            <TextInput
                                placeholder="Complemento"
                                optional
                                containerProps={{ style: { gridArea: 'fullAddress' } }}
                                error={errors.fullAddress}
                                {...register('fullAddress')}
                            />

                            <TextInput
                                placeholder="Bairro"
                                containerProps={{ style: { gridArea: 'neighborhood' } }}
                                error={errors.neighborhood}
                                {...register('neighborhood')}
                            />

                            <TextInput
                                placeholder="Cidade"
                                containerProps={{ style: { gridArea: 'city' } }}
                                error={errors.city}
                                {...register('city')}
                            />

                            <TextInput
                                placeholder="UF"
                                maxLength={2}
                                containerProps={{ style: { gridArea: 'state' } }}
                                error={errors.state}
                                {...register('state')}
                            />
                        </div>
                    </div>

                    <div className='p-10 rounded-md bg-base-card w-full min-w-[640px] flex flex-col gap-8'>
                        <div className='flex gap-2'>
                            <CurrencyDollarIcon className='text-purple' size={22} />

                            <div>
                                <span className='text-base-subtitle'>Pagamento</span>
                                <p className='text-textS'>
                                    O pagamento é feito na entrega. Escolha a forma que deseja
                                    pagar
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between gap-3'>
                                <Radio
                                    isSelected={selectedPaymentMethod === 'credit'}
                                    {...register('paymentMethod')}
                                    value="credit"
                                >
                                    <CreditCardIcon size={16} />
                                    <span>Cartão de crédito</span>
                                </Radio>

                                <Radio
                                    isSelected={selectedPaymentMethod === 'debit'}
                                    {...register('paymentMethod')}
                                    value="debit"
                                >
                                    <BankIcon size={16} />
                                    <span>Cartão de débito</span>
                                </Radio>

                                <Radio
                                    isSelected={selectedPaymentMethod === 'cash'}
                                    {...register('paymentMethod')}
                                    value="cash"
                                >
                                    <MoneyIcon size={16} />
                                    <span>Dinheiro</span>
                                </Radio>
                            </div>

                            {errors.paymentMethod ? (
                                <p className='text-textXS font-normal text-red-600' role="alert">
                                    {errors.paymentMethod.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>

            <div className='flex flex-col gap-4'>
                <h2 className='text-titleXS font-baloo-2 font-bold text-base-subtitle'>Cafés selecionados</h2>

                <div className='p-10 rounded-tr-[36px] rounded-bl-[36px] rounded-tl-md rounded-br-md bg-base-card w-full min-w-[448px]'>
                    {!coffeesInCart.length && (
                        <div className='flex flex-col mb-8' >
                            <span className='flex items-center gap-2 justify-center'>Nenhum item adicionado ao carrinho <SmileySadIcon size={32} /></span>
                            <Link className='text-sm text-purple text-center mt-2' to={'/'}>Voltar ao inicio</Link>
                        </div>
                    )}

                    {coffeesInCart.map((coffee) => (
                        <Fragment key={coffee.id}>
                            <div className='flex justify-between'>
                                <div className='flex items-stretch gap-5'>
                                    <img className='size-16' src={coffee.image} alt={coffee.title} />

                                    <div className='flex flex-col justify-between'>
                                        <span>{coffee.title}</span>

                                        <div className='flex gap-2'>
                                            <QuantityInput
                                                quantity={coffee.quantity}
                                                incrementQuantity={() => handleItemIncrement(coffee.id)}
                                                decrementQuantity={() => handleItemDecrement(coffee.id)}
                                            />

                                            <button className='py-1.5 px-2 bg-base-button rounded-md flex items-center gap-2 transition-all hover:bg-base-hover' onClick={() => handleItemRemove(coffee.id)}>
                                                <TrashIcon className='text-purple' />
                                                <span className='text-buttonM uppercase text-base-text'>Remover</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <aside className='font-bold'>R$ {coffee.price?.toFixed(2)}</aside>
                            </div>

                            <span className='block h-[1px] bg-base-button my-6' />
                        </Fragment>
                    ))}

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center justify-between'>
                            <span className='text-textS'>Total de itens</span>
                            <span className='text-textM'>
                                {new Intl.NumberFormat('pt-br', {
                                    currency: 'BRL',
                                    style: 'currency',
                                }).format(totalItemsPrice)}
                            </span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-textS'>Entrega</span>
                            <span className='text-textM'>
                                {new Intl.NumberFormat('pt-br', {
                                    currency: 'BRL',
                                    style: 'currency',
                                }).format(shippingPrice)}
                            </span>
                        </div>

                        <div className='flex items-center justify-between text-textL font-bold'>
                            <span>Total</span>
                            <span>
                                {new Intl.NumberFormat('pt-br', {
                                    currency: 'BRL',
                                    style: 'currency',
                                }).format(totalItemsPrice + shippingPrice)}
                            </span>
                        </div>
                    </div>

                    <button className='mt-6 block w-full p-3 uppercase text-buttonG font-bold text-white bg-yellow transition-all hover:bg-yellow-dark rounded-md' type="submit" form="order">
                        Confirmar pedido
                    </button>
                </div>
            </div>
        </main>
    )
}