import React, { useState } from 'react'
import './BuyModal.css'

const BuyModal = ({ coin, onClose, onSave }) => {

  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const handleSave = () => {

    if (!price || !quantity) return

    onSave({
      id: coin.id,
      name: coin.name,
      image: coin.image,
      symbol: coin.symbol,
      buyPrice: Number(price),
      quantity: Number(quantity)
    })

    onClose()
  }

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>{coin.name}</h2>

        <input
          type="number"
          placeholder="Buy Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Add</button>
        </div>

      </div>

    </div>
  )
}

export default BuyModal