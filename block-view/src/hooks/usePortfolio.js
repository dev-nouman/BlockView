import { useState, useEffect } from "react";
import { getPortfolio, savePortfolio } from "../utils/portfolio";

export const usePortfolio = () => {

    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        setPortfolio(getPortfolio());
    }, []);

    const updatePortfolio = (data) => {
        setPortfolio(data);
        savePortfolio(data);
    };

    return { portfolio, updatePortfolio };
};