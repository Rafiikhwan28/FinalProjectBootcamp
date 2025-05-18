import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Activity.css";

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function untuk fetch data
    const getActivityList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
                {
                    headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
                }
            );if (res.data?.data && Array.isArray(res.data.data)) {
                setActivities(res.data.data);
            } else {
                throw new Error("Invalid data format from API");
            }
            
        } catch (err) {
            console.error(err);
            setError("Failed to fetch activities. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data saat komponen mount
    useEffect(() => {
        getActivityList();
    }, []);

    return (
        <div className="activity-page">
            <h1 className="activity-title">Activities</h1>
            {isLoading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="activity-grid">
                    {activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                            <Link to={`/detail-activity/${activity.id}`} className="activity-link">
                                {/* Tampilkan gambar pertama jika tersedia */}
                                {activity.imageUrls && activity.imageUrls.length > 0 ? (
                                    <img
                                        src={activity.imageUrls[0]}
                                        alt={activity.title}
                                        className="activity-image"
                                    />
                                ) : (
                                    <div className="activity-placeholder">No Image Available</div>
                                )}
                                <h3 className="activity-item-title">{activity.title}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Activity;
