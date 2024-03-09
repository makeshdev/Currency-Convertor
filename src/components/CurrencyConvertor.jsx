import { useState } from "react";
import "../App.css";
import { useEffect } from "react";
import axios from "axios";
export const CurrencyConvertor = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertor, setConvertor] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getValues = async () => {
      try {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res = await axios.get(url);
        console.log("res", res);
        setExchangeRate(res.data.rates[toCurrency]);
      } catch (error) {
        console.error("Something went to wrong", error);
      }
    };
    getValues();
  }, [fromCurrency, toCurrency]);

  const amountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handlefromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };
  const handletoCurrency = (e) => {
    setToCurrency(e.target.value);
  };

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertor(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  return (
    <>
      <div className="container">
        <h2>Currency Convertor</h2>
        <div className="input_sec">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={amountChange}
          />
        </div>
        <div className="input_sec">
          <label>From Currency</label>
          <select value={fromCurrency} onChange={handlefromCurrency}>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - United State Dollar</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="INR">INR - Indian Rupees</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="KYD">KYD - Cayman Island Dollar</option>
            <option value="GIP">GIP - Gibraltar Pound</option>
            <option value="JOD">JOD - Jordanian Dinar</option>
            <option value="BHD">BHD - Bahraini Dinar</option>
            <option value="OMR">OMR - Omani Rial</option>
            <option value="KWD">KWD - Kuwaiti Dinar</option>
            <option value="AED">AED - United Arab Emirates</option>
          </select>
        </div>
        <div className="input_sec">
          <label>To Currency</label>
          <select value={toCurrency} onChange={handletoCurrency}>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - United State Dollar</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="INR">INR - Indian Rupees</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="KYD">KYD - Cayman Island Dollar</option>
            <option value="GIP">GIP - Gibraltar Pound</option>
            <option value="JOD">JOD - Jordanian Dinar</option>
            <option value="BHD">BHD - Bahraini Dinar</option>
            <option value="OMR">OMR - Omani Rial</option>
            <option value="KWD">KWD - Kuwaiti Dinar</option>
            <option value="AED">AED - United Arab Emirates</option>
          </select>
        </div>
        <div className="result">
          <p>
            {amount} {fromCurrency} is equal to {convertor} {toCurrency}
          </p>
        </div>
      </div>
    </>
  );
};
