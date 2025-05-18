// PaymentMethod.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress, List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import "./PaymentMethod.css";

const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // API Endpoint (disesuaikan)
  const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods"; 

  // Fungsi untuk mengambil data metode pembayaran
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setPaymentMethods(response.data.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch payment methods. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Handle perubahan metode pembayaran
  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  // Handle konfirmasi metode pembayaran
  const handleConfirm = () => {
    if (selectedMethod) {
      alert(`Payment method "${selectedMethod}" has been selected.`);
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="payment-method-page">
      <h1 className="payment-title">Choose Payment Method</h1>
      {isLoading ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading payment methods...</p>
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <FormControl component="fieldset">
          <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
            <List>
              {paymentMethods.map((method) => (
                <ListItem key={method.id}>
                  <FormControlLabel
                    value={method.name}
                    control={<Radio />}
                    label={<ListItemText primary={method.name} secondary={method.description} />}
                  />
                </ListItem>
              ))}
            </List>
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            className="confirm-button"
          >
            Confirm Payment Method
          </Button>
        </FormControl>
      )}
    </div>
  );
};

export default PaymentMethod;
