import { useEffect } from "react";
import { Platform } from "react-native";
import { Redirect, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";

// Stripe Checkout returns to /payment-result?status=success|cancel; forward status to /cart.
const PaymentResult = () => {
    const { status } = useLocalSearchParams<{ status?: string }>();

    useEffect(() => {
        if (Platform.OS === "web" && typeof window !== "undefined" && status) {
            window.localStorage.setItem(
                "stripe_payment_result",
                JSON.stringify({ status, timestamp: Date.now() })
            );
            try {
                WebBrowser.maybeCompleteAuthSession({ skipRedirectCheck: true });
            } catch {
                // Ignore if parent reference was severed by Stripe COOP header
            }
            try {
                window.close();
            } catch {
                // Ignore if not a popup window
            }
        }
    }, [status]);

    const href = status ? `/cart?status=${encodeURIComponent(status)}` : "/cart";
    return <Redirect href={href as any} />;
};

export default PaymentResult;
