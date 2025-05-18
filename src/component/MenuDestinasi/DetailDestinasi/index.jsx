import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/index";

const DetailDestinasi = () => {
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const getDetailDestinasi = () => {
        axios
            .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categorie/${id}`, {
                headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
            })
            .then((res) => {
                setMenu(res.data.data);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch destination details.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDetailDestinasi();
    }, [id]); // Menambahkan id ke dependency array

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <h1>Detail Destinasi</h1>
            {menu?.imageUrl && (
                <img
                    src={menu?.imageUrl}
                    style={{ width: "100%", height: "auto", maxWidth: "600px" }}
                />
            )}
            <h2>{menu?.name}</h2>
        </div>
    );
};

export default DetailDestinasi;
