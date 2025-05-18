import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/index";
import './DetailBanner.css';

const DetailBanner = () => {
    const [banner, setBanner] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    // Fungsi untuk mengambil detail banner berdasarkan ID
    const getDetailBanner = () => {
        axios
            .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners/${id}`, {
                headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
            })
            .then((res) => {
                setBanner(res.data.data || {});
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch banner details.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDetailBanner();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="detail-banner-container">
            <Navbar />
            <h1>Detail Banner</h1>
            {banner?.imageUrl && (
                <img
                    src={banner.imageUrl}
                    alt="Banner"
                />
            )}
            <div className="detail-banner-info">
                <h2>{banner?.title}</h2>
                <p><strong>Description:</strong> {banner?.description || "No description available."}</p>
            </div>
        </div>
    );
};

export default DetailBanner;
