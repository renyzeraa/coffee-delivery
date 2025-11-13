import { MapPinIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Header() {
    const cart = [2, 1]

    return (
        <header className="max-w-[1160px] py-8 px-5 mx-auto flex justify-between items-center">
            <Link to="/">
                <img src="/logo.svg" alt="Coffee Delivery" />
            </Link>

            <aside className="flex gap-1">
                <div className="flex items-center gap-1 bg-purple-light py-2.5 px-2 rounded-md">
                    <MapPinIcon className="text-purple" size={22} weight="fill" />
                    <span className="text-purple-dark">Porto Alegre, RS</span>
                </div>

                <Link className="flex items-center bg-yellow-light text-yellow-dark p-2 rounded-md relative data-[aria-disabled='true']:pointer-events-none" to={`cart`} aria-disabled={cart.length === 0}>
                    <ShoppingCartIcon size={22} weight="fill" />
                    {cart.length > 0 ? <span className="text-textS font-roboto text-white bg-yellow-dark rounded-full size-5 flex items-center justify-center absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">{cart.length}</span> : null}
                </Link>
            </aside>
        </header>
    )
}