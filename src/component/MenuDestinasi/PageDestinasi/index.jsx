import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./Destinasi.css"; // Import file CSS
import { Link } from "react-router-dom";


const PageDestinasi = () => {
    const [destinasi, setDestinasi] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getDestinasiList = async () => {
        try {
            const res = await axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
                {
                    headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" }
                }
            );
            if (res.data && res.data.data) {
                setDestinasi(res.data.data);
            } else {
                throw new Error("Data format is incorrect");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch destinations. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDestinasiList();
    }, []);

    return (
        <div>
            <h1>Page Destinasi</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="destinasi-container">
                    {destinasi.map((item) => (
                        <div key={item.id} className="destinasi-item">
                            <Link to={`/destinasi-detail/${item.id}`}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                />
                            <p>{item.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PageDestinasi;
