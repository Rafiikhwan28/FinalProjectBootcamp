import { useEffect, useState } from "react";
import axios from "axios";
import "./Baner.css";
import { Link } from "react-router-dom";

const Baner = () => {
    const [baner, setBaner] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getBanerList = () => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners/", {
                headers: {
                    apiKey: `24405e01-fbc1-45a5-9f5a-be13afcd757c`,
                },
            })
            .then((res) => setBaner(res.data.data))
            .catch((err) => console.log(err.response));
    };

    const handleNext = () => {
        if (currentIndex < baner.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        getBanerList();
    }, []);

    return (
        <div className="baner-container">
            <h1>Banner Page</h1>
            <div className="slider">
                <div
                    className="slider-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {baner.map((item) => (
                        <div key={item.id} className="slider-item">
                            <Link to={`/detail-baner/${item.id}`}>
                            <img src={item.imageUrl} alt={item.name} />
                            <p>{item.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-controls">
                <button onClick={handlePrev} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentIndex === baner.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Baner;
