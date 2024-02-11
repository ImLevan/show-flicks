import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import { ReactNode } from "react";
import ScrollToTop from "./ScrollToTop";

type RoutesWithNotFoundProps = {
    children: ReactNode;
};


function RoutesWithNotFound({ children }: RoutesWithNotFoundProps) {
    return (
        <ScrollToTop>
            <Routes>
                {children}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </ScrollToTop>
    )
}

export default RoutesWithNotFound;