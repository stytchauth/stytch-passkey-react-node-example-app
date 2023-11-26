import React, { useEffect } from "react";
import { OTPMethods, Products, StytchEventType } from "@stytch/vanilla-js";
import { useStytchUser, StytchLogin } from "@stytch/react";
// import Head from "next/head";
import { Box, useMediaQuery } from "@mui/material";
import MobileHeader from "../components/mobile/MobileHeader";
import ContactStytch from "../components/ContactStytch";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <>
      <StytchLogin
        config={{
          products: [Products.otp, Products.passkeys],
          otpOptions: {
            expirationMinutes: 10,
            methods: [OTPMethods.Email, OTPMethods.SMS],
          },
        }}
        styles={{ container: { width: isMobile ? "340px" : "400px" } }}
        callbacks={{
          onEvent: ({ type, data }) => {
            if (type === StytchEventType.PasskeyAuthenticate) {
              // eslint-disable-next-line no-console
              console.log("Passkey authenticated", data);
              navigate("/dashboard");
            }
            if (type === StytchEventType.OTPsAuthenticate) {
              // eslint-disable-next-line no-console
              console.log("OTP authenticated", data);
              navigate("/dashboard");
            }
          },
        }}
      />
    </>
  );
};

function LoginPage() {
  const { user } = useStytchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      navigate("/dashboard");
    }
  });

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <>
      <Box width="100%" height="100vh" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          minWidth={isMobile ? undefined : 475}
        >
          {isMobile ? (
            <MobileHeader />
          ) : (
            <>
              <Box mt={2} ml={2} display="flex" gap={2}>
                <img src="/logo.png" alt="Vector art" width="149" height="34" />
              </Box>
            </>
          )}
          <Box
            height="90%"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginX: 2,
            }}
          >
            <LoginComponent />
          </Box>
          <Box m={2}>
            <ContactStytch />
          </Box>
        </Box>
        {!isMobile && (
          <Box
            width="60%"
            sx={{
              backgroundColor: "#D4CEFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/login_img.png"
              alt="Vector art"
              width={500}
              height={500}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default LoginPage;
