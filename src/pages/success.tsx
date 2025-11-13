import { CurrencyDollarIcon, MapPinIcon, SmileySadIcon, TimerIcon } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { useCartStore } from '../store/cart'
import { useShallow } from 'zustand/shallow'

export function Success() {
    const { orders } = useCartStore(useShallow(state => ({
        orders: state.orders
    })))
    const { orderId } = useParams()
    const orderInfo = orders.find((order) => order.id === Number(orderId))
    const paymentMethod = {
        credit: 'Cartão de crédito',
        debit: 'Cartão de débito',
        cash: 'Dinheiro',
    }

    if (!orderInfo?.id) {
        return (
            <div className='flex flex-col gap-1 max-w-[1160px] mx-auto py-[80px] px-5 items-center'>
                <h2 className='flex text-titleL font-baloo-2 font-bold text-red-600 gap-2'>Pedido não encontrado. <SmileySadIcon size={42} /></h2>
                <span className='text-textL text-base-subtitle'>Retorne para o <Link className='underline text-purple' to={'/'}>início</Link> e tente novamente.</span>
            </div>
        )
    }

    return (
        <main className='flex max-w-[1160px] mx-auto py-[80px] px-5 items-end justify-between gap-10'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-titleL font-baloo-2 font-bold text-yellow-dark'>Uhu! Pedido confirmado</h2>
                    <span className='text-textL text-base-subtitle'>Agora é só aguardar que logo o café chegará até você</span>
                </div>

                <div className='border border-solid border-transparent w-full bg-origin-border bg-gradient-yellow-purple'>
                    <div className='p-10 bg-white rounded-tr-[36px] rounded-bl-[36px] flex flex-col gap-8'>
                        <div className='flex items-center gap-3'>
                            <MapPinIcon
                                className='text-white bg-purple p-2 rounded-full'
                                size={32}
                            />

                            <div className='flex flex-col'>
                                <span>
                                    Entrega em{' '}
                                    <strong>
                                        {orderInfo.street}, {orderInfo.number}
                                    </strong>
                                </span>

                                <span>
                                    {orderInfo.neighborhood} - {orderInfo.city},{orderInfo.state}
                                </span>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <TimerIcon
                                className='text-white bg-yellow p-2 rounded-full'
                                size={32}
                            />

                            <div className='flex flex-col'>
                                <span>Previsão de entrega</span>

                                <strong>20 min - 30 min</strong>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <CurrencyDollarIcon
                                className='text-white bg-yellow-dark p-2 rounded-full'
                                size={32}
                            />

                            <div className='flex flex-col'>
                                <span>Pagamento na entrega</span>

                                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img className='-mb-[13px] block' src="/images/delivery.svg" alt="Pedido concluído" />
        </main>
    )
}