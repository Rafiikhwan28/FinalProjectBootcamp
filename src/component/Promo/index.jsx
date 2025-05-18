// Promo.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./Promo.css"; // Import file CSS eksternal
import { Link } from "react-router-dom";

const Promo = () => {
    const [promo, setPromo] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPromoiList = async () => {
        try {
            const res = await axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
                {
                    headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" }
                }
            );
            if (res.data && res.data.data) {
                setPromo(res.data.data);
            } else {
                throw new Error("Data format is incorrect");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch promotions. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPromoiList();
    }, []);

    return (
        <div className="promo-page">
            <h1 className="promo-title">Page Promo</h1>
            {isLoading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    <div className="promo-grid">
                        {promo.map((item) => (
                            <div key={item.id} className="promo-item">
                                <Link to={`/detail-promo/${item.id}`} >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="promo-image"
                                />
                                <h3 className="promo-item-title">{item.title}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Promo;
