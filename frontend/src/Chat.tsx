import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgArrow from "./assets/images/i-arrow.png";

// ... existing code ...

function Chat() {
    const navigate = useNavigate();
    const [isHelp, setIsHelp] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");

    const typeHelp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setIsHelp(!!value);
    };

    const sendCommand = async () => {
        if (!inputValue) return;

        try {
            const response = await fetch('/api/check_reputation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: inputValue }),
            });
			console.log(response);

            const data = await response.json();
            if (response.ok) {
                console.log("Reputation Check Result:", data);
                setMessage("Command sent successfully!");
            } else {
                console.error("Error:", data);
                setMessage("Error sending command.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error sending command.");
        }
    };

    useEffect(() => {
        const isAuth = localStorage.getItem("user");
        if (!isAuth) navigate("/auth", { replace: true });
    }, [navigate]);

    return (
        <div className="center-container start-center">
            <div className="centered-box min-h-screen p-4 relative">
                <div className="w-full absolute bottom-4">
                    <div className="chat relative -mb-4 p-4 border-t-2 border-gray-300">
                        <input
                            placeholder="Message Here"
                            className="help-input"
                            onChange={typeHelp}
                        />
                        <button
                            className={"help-button absolute right-0 cursor-pointer " + (isHelp ? "active" : "")}
                            onClick={sendCommand}
                        >
                            <img src={ImgArrow} className="mx-auto" alt="Arrow" />
                        </button>
                    </div>
                    {message && <div className="message mt-2">{message}</div>}
                </div>
            </div>
        </div>
    );
}

export default Chat;