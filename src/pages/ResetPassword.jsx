import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [formData, setFormData] = useState({ password: "", cpassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    useEffect(() => {
        // Extract token from the URL
        const params = new URLSearchParams(location.search);
        const resetToken = params.get("token");
        if (resetToken) {
            setToken(resetToken);
        } else {
            toast.error("Invalid reset link", { position: "top-center" });
            //   navigate("/forgot-password");
        }
    }, [location, navigate]);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleCPasswordVisibility = () => setShowCPassword((prev) => !prev);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.cpassword) {
            toast.error("Passwords do not match", { position: "top-center" });
            return;
        }
        const body = {
            token: token,
            newPassword: formData.password
        }
        console.log(body)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}auth/reset-password`, body);
            console.log(response)
            toast.success("Password reset successfully!", { position: "top-center" });
            // setTimeout(() => {
            //     navigate(`/login`);
            // }, 3000);

            localStorage.setItem("passwordResetSuccess", "true");

            // Close the reset password tab
            setTimeout(() => {
                window.close();
            }, 3000);
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to reset password", { position: "top-center" });
        }
    };

    return (
        <>
        <Toaster/>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <h3 className="text-secondary">Reset your Password</h3>
            <div className="reset-password-form col-5 mt-3 shadow p-4">
                <form onSubmit={handleResetPassword}>
                    <div className="row">
                        <label htmlFor="password" className="form-label fw-semibold">
                            Create Password
                        </label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="input-line text-dark profile-font"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                    </div>
                    <div className="row mt-3">
                        <label htmlFor="cpassword" className="form-label fw-semibold">
                            Confirm Password
                        </label>
                        <Input
                            type={showCPassword ? "text" : "password"}
                            name="cpassword"
                            className="input-line text-dark profile-font"
                            placeholder="Re-enter Password"
                            value={formData.cpassword}
                            onChange={handleChange}
                            showPassword={showCPassword}
                            togglePasswordVisibility={toggleCPasswordVisibility}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary profile-font rounded-3">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}
