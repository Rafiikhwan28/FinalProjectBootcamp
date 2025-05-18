import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/index";
import './DetailPromo.css';

const DetailPromo = () => {
    const [promo, setPromo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartMessage, setCartMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    // Fungsi untuk mengambil detail promo berdasarkan ID
    const getDetailPromo = () => {
        axios
            .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`, {
                headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
            })
            .then((res) => {
                setPromo(res.data.data || {});
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch promo details.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Fungsi untuk menambahkan promo ke keranjang
    const handleAddToCart = async (product) => {
        try {
          const token = localStorage.getItem("access_token");
          if (!token) throw new Error("User not logged in.");
    
          const payload = {
            productId: product.id,
            quantity: 1, // Default jumlah produk yang ditambahkan
          };
    
          await axios.post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              },
            }
          );
    
          alert(`Produk ${product.name} berhasil ditambahkan ke keranjang!`);
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Gagal menambahkan ke keranjang.");
        }
      };

    useEffect(() => {
        getDetailPromo();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <h1>Detail Promo</h1>
            {promo?.imageUrl && (
                <img
                    src={promo.imageUrl}
                    style={{ width: "100%", height: "auto", maxWidth: "600px", marginBottom: "20px" }}
                    alt="Promo"
                />
            )}
            <h2>{promo?.title}</h2>
            <p><strong>Terms and Conditions:</strong> {promo?.terms_condition || "No terms available."}</p>
            <p><strong>Promo Code:</strong> {promo?.promo_code || "N/A"}</p>
            <p><strong>Discount:</strong> Rp {promo?.promo_discount_price?.toLocaleString() || "0"}</p>
            <p><strong>Minimum Claim:</strong> Rp {promo?.minimum_claim_price?.toLocaleString() || "0"}</p>
            <div className="promo-button-container">
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                    Add To Cart
                </Button>
            </div>
            {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
    );
};

export default DetailPromo;
