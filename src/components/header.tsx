import { MapPinIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { useShallow } from "zustand/shallow";

export function Header() {
    const { items } = useCartStore(useShallow((state) => ({
        items: state.items
    })))

    return (
        <header className="max-w-[1160px] py-8 px-5 mx-auto flex justify-between items-center">
            <Link to="/">
                <img src="/logo.svg" alt="Coffee Delivery" />
            </Link>

            <aside className="flex gap-2">
                <div className="flex items-center gap-1 bg-purple-light p-2 rounded-md">
                    <MapPinIcon className="text-purple" size={22} weight="fill" />
                    <span className="text-purple-dark text-sm">Porto Alegre, RS</span>
                </div>

                <Link className="flex items-center bg-yellow-light text-yellow-dark p-2 rounded-md relative data-[aria-disabled='true']:pointer-events-none" to={`cart`} aria-disabled={items.length === 0}>
                    <ShoppingCartIcon size={22} weight="fill" />
                    {items.length > 0 ? <span className="text-textS font-roboto text-white bg-yellow-dark rounded-full size-5 flex items-center justify-center absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">{items.length}</span> : null}
                </Link>
            </aside>
        </header>
    )
}