import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Lottie from "lottie-react";
import VerifiedAnimation from "../../public/assets/pique/image/verified.json";


export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const setIsEmailVerified = location.state?.setIsEmailVerified || (() => {});
  const [timeLeft, setTimeLeft] = useState(
    parseInt(localStorage.getItem("otpTimer")) || 600
  );
  const [verifying, setVerifying] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [verified, setVerified] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));
    if (!storedData || !storedData.email) {
      navigate("/signup/venue");
    } else {
      setUserDetails(storedData);
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      localStorage.setItem("otpTimer", timeLeft);
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem("otpTimer"); // Remove when timer expires
    }
  }, [timeLeft]);

  // Function to format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setVerifying(true);
    const body = {
      email,
      otp,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/verify-otp`,
        body
      );
      console.log(response.data);
      // toast.success("Email verified successfully!", { position: "top-right" });
      const updatedData = { ...userDetails, emailVerified: true };
      localStorage.setItem("userDetails", JSON.stringify(updatedData));
      setTimeout(() => {
        setVerified(true);
        setVerifying(false);
        setIsEmailVerified(true);
        localStorage.removeItem("otpTimer");
        setTimeout(() => navigate("/signup/venue"), 2000);
      }, 6000);
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP, please try again.", { position: "top-center" });
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
const body = {email}
    try {
    const response =  await axios.post(`${import.meta.env.VITE_API_URL}auth/send-otp`,body);
    console.log(response.data)
      toast.success("New OTP sent successfully!", { position: "top-center" });

      setTimeLeft(600);
      localStorage.setItem("otpTimer", 600);
    } catch (error) {
      console.log(error)
      toast.error("Failed to resend OTP. Please try again.", {
        position: "top-center",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <p className="fw-bold text-danger fs-3 mb-2">
          Authenticate Your Account
        </p>
        <p className="text-secondary mb-4">
          Please enter the code sent to your email.
        </p>


        {/* OTP Input Wrapper */}
        <div className="d-flex justify-content-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-2">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="otp-input text-center mx-2 rounded-3"
                style={{
                  width: "60px",
                  height: "60px",
                  border: "1px solid #646464",
                }}
              />
            )}
          />
        </div>

        {/* Timer Display */}
        <p className="mt-3 fw-medium">Time Left: {formatTime(timeLeft)}</p>

        {otp.length === 6 && !verified && (
          <button className="btn btn-success rounded-3 mt-3" onClick={handleVerifyOtp} disabled={verifying}>
            {verifying ? <ClipLoader color="white" size={20} /> : "Verify OTP"}
          </button>
        )}

        {/* Spinner while verifying */}
        {verified && (
          <div className="mt-4 text-center">
            <Lottie animationData={VerifiedAnimation} loop={false} style={{ width: 150, height: 150 }} />
            <p className="fw-bold text-success mt-2">Verified Successfully!</p>
          </div>
        )}

        {/* Checkmark when verified */}
        {/* {verified && (
          <div className="mt-4 text-success">
            <BsCheckCircleFill size={80} />
            <p className="fw-bold mt-2">Verified Successfully!</p>
          </div>
        )} */}

        {/* <button
          className="btn btn-link btn-sm rounded-3 mt-3"
          onClick={handleResendOtp}
        >
          Resend Otp
        </button> */}
        <button className="btn btn-link btn-sm rounded-3 mt-3" onClick={handleResendOtp} disabled={resending}>
          {resending ? <ClipLoader color="black" size={15} /> : "Resend OTP"}
        </button>
      </div>
    </>
  );
}
