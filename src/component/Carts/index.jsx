import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("User not logged in.");

        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setCartItems(response.data.data); // Sesuaikan dengan struktur API
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Gagal memuat keranjang.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("User not logged in.");

      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setCartItems(cartItems.filter((item) => item.id !== id));
      alert("Produk berhasil dihapus dari keranjang.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menghapus produk.");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Keranjang Belanja</Typography>
      {cartItems.length === 0 ? (
        <Typography>Keranjang Anda kosong.</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.productName}
                secondary={`Harga: Rp${item.price} | Jumlah: ${item.quantity}`}
              />
              <IconButton
                onClick={() => handleRemoveFromCart(item.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
