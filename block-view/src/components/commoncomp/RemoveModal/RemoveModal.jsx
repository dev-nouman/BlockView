import React, { useState } from "react";
import "./RemoveModal.css";

const RemoveModal = ({ coin, onClose, onConfirm }) => {

    const [sellPrice, setSellPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = () => {

        if (!sellPrice || !quantity) return;

        onConfirm({
            coin,
            sellPrice: Number(sellPrice),
            quantity: Number(quantity)
        });

        onClose();
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h3>Remove {coin.name}</h3>

                <input
                    type="number"
                    placeholder="Sell Price"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <div className="modal-actions">

                    <button onClick={onClose}>
                        Cancel
                    </button>

                    <button onClick={handleSubmit}>
                        Confirm Remove
                    </button>

                </div>

            </div>

        </div>
    );
};

export default RemoveModal;