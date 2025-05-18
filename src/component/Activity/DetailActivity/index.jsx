import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DetailActivity.css";
import Navbar from "../../Navbar";

const DetailActivity = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function untuk mengambil data detail activity
  const getActivityDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${id}`,
        {
          headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
        }
      );

      if (res.data?.data) {
        setActivity(res.data.data); // Menyimpan data ke state
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError("Activity not found. Please check the ID.");
      } else {
        setError("Failed to load activity details. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Menjalankan fetch data saat komponen pertama kali render
  useEffect(() => {
    getActivityDetail();
  }, [getActivityDetail]);

  // Menampilkan loading, error, atau data
  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="detail-activity-page">
      <Navbar />
      {activity && (
        <div className="detail-content">
          <h1 className="detail-title">{activity.title}</h1>

          {/* Bagian Gambar */}
          <div className="detail-image-container">
            {activity.imageUrls?.length > 0 ? (
              activity.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${activity.title} - ${index + 1}`}
                  className="detail-image"
                />
              ))
            ) : (
              <p className="no-image">No images available</p>
            )}
          </div>

          {/* Informasi Detail */}
          <div className="detail-info">
            <h2>Description</h2>
            <p>{activity.description || "No description available."}</p>

            <h2>Facilities</h2>
            {activity.facilities ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: activity.facilities,
                }}
              ></div>
            ) : (
              <p>No facilities listed.</p>
            )}

            <h2>Location</h2>
            <p>
              {activity.city}, {activity.province}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: activity.location_maps || "Location not available.",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailActivity;
