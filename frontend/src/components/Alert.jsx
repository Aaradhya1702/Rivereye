import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaBell } from "react-icons/fa";


const NotificationSettings = () => {
    const [emailNotification, setEmailNotification] = useState(false);
    const [pushNotification, setPushNotification] = useState(false);

    return (
        <div className="bg-light min-vh-100 d-flex flex-column align-items-center py-5 px-3">
            <h2 className="text-center mb-5 fw-bold text-dark" style={{ fontSize: "2rem" }}>
                Notification Settings
            </h2>

            {/* Email Notification */}
            <div className="d-flex justify-content-between align-items-center p-4 mb-4 rounded-3 bg-white shadow-sm w-100 notification-card" style={{ maxWidth: "1200px", minHeight: "120px" }}>
                <div className="d-flex align-items-center">
                    <FaEnvelope className="me-4 fs-3 text-primary" />
                    <div>
                        <h6 className="mb-1 fw-semibold text-dark" style={{ fontSize: "1.2rem" }}>Email Notifications</h6>
                        <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                            Get verified reports, forecasts, and alerts directly in your inbox.
                        </p>
                    </div>
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={emailNotification}
                        onChange={() => setEmailNotification(!emailNotification)}
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            {/* Push Notification */}
            <div className="d-flex justify-content-between align-items-center p-4 mb-4 rounded-3 bg-white shadow-sm w-100 notification-card" style={{ maxWidth: "1200px", minHeight: "120px" }}>
                <div className="d-flex align-items-center">
                    <FaBell className="me-4 fs-3 text-primary" />
                    <div>
                        <h6 className="mb-1 fw-semibold text-dark" style={{ fontSize: "1.2rem" }}>Push Notifications</h6>
                        <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                            Stay updated with instant alerts and reminders inside the app.
                        </p>
                    </div>
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={pushNotification}
                        onChange={() => setPushNotification(!pushNotification)}
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "0.8rem" }}>
                You can turn notifications on or off anytime. Changes are saved automatically.
            </p>
        </div>
    );
};

export default NotificationSettings;
