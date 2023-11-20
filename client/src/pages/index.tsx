import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStytchSession } from "@stytch/react";

export default function Home() {
    const navigate = useNavigate();
    const { session } = useStytchSession();

    useEffect(() => {
        if (session) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [session, navigate]);

    return <div>Loading...</div>;
}
