

import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./pages/default-layout";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Success } from "./pages/success";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/sucess" element={<Success />} />
            </Route>
        </Routes>
    )
}