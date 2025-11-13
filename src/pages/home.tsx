import { CoffeeIcon, PackageIcon, ShoppingCartIcon, TimerIcon } from '@phosphor-icons/react'

import { Card } from '../components/card'
import { useEffect } from 'react'
import type { Root } from '../@types/coffee'
import { useCoffeeStore } from '../store/coffee'
import { useShallow } from 'zustand/shallow'

export function Home() {
    const { coffees, setCoffees } = useCoffeeStore(useShallow(state => ({
        coffees: state.coffees,
        setCoffees: state.setCoffees,
    })))

    useEffect(() => {
        if (!coffees.length) {
            fetch('/data.json')
                .then(response => response.json())
                .then((data: Root) => setCoffees(data.coffees))
                .catch(() => setCoffees([]))
        }
    }, [coffees, setCoffees])

    return (
        <div>
            <section className='relative'>
                <div className='max-w-[1160px] py-[92] px-5 mx-auto flex gap-[56px] items-start justify-between'>
                    <div className='flex flex-col gap-[66px]'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-titleXL font-extrabold font-baloo-2 text-base-title'>Encontre o café perfeito para qualquer hora do dia</h1>

                            <span className='text-textL text-base-subtitle'>
                                Com o Coffee Delivery você recebe seu café onde estiver, a
                                qualquer hora
                            </span>
                        </div>

                        <div className='grid grid-cols-2 gap-y-5'>
                            <div className='flex items-center gap-3'>
                                <ShoppingCartIcon
                                    size={32}
                                    weight="fill"
                                    className='text-background bg-yellow-dark p-2 rounded-full'
                                />
                                <span>Compra simples e segura</span>
                            </div>

                            <div className='flex items-center gap-3'>
                                <PackageIcon
                                    size={32}
                                    weight="fill"
                                    className='text-background bg-base-text p-2 rounded-full'
                                />
                                <span>Embalagem mantém o café intacto</span>
                            </div>

                            <div className='flex items-center gap-3'>
                                <TimerIcon
                                    size={32}
                                    weight="fill"
                                    className='text-background bg-yellow p-2 rounded-full'
                                />
                                <span>Entrega rápida e rastreada</span>
                            </div>

                            <div className='flex items-center gap-3'>
                                <CoffeeIcon
                                    size={32}
                                    weight="fill"
                                    className='text-background bg-purple p-2 rounded-full'
                                />
                                <span>O café chega fresquinho até você</span>
                            </div>
                        </div>
                    </div>

                    <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
                </div>

                <img src="/images/hero-bg.svg" id="hero-bg" className='absolute top-0 left-0 max-h-[544px] w-screen object-cover' alt="" />
            </section>

            <section className='max-w-[1160px] pt-8 px-5 pb-[150px] mx-auto flex flex-col gap-[54px]'>
                <h2 className='text-titleL font-baloo-2 font-extrabold'>Nossos cafés</h2>

                <div className='grid grid-cols-4 gap-y-10 gap-x-8'>
                    {coffees.map((coffee) => (
                        <Card key={coffee.id} coffee={coffee} />
                    ))}
                </div>
            </section>
        </div>
    )
}