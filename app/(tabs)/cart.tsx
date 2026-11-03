import { Alert, View, Text, FlatList, Platform } from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";
import cn from "clsx";
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";
import { PaymentInfoStripeProps } from "@/type";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { router, useLocalSearchParams } from "expo-router";
import { createCheckoutSession } from "@/lib/appwrite";

const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
        window.alert(`${title}\n\n${message}`);
    } else {
        Alert.alert(title, message);
    }
};

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
    const { status } = useLocalSearchParams<{ status?: string }>();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    const orderTotal = totalPrice + 5 - 0.5;

    const [isPaying, setIsPaying] = useState(false);
    const [paymentBanner, setPaymentBanner] = useState<{ type: "success" | "cancel"; text: string } | null>(null);

    useEffect(() => {
        const handleStatus = (outcome?: string | null) => {
            if (!outcome) return;
            setIsPaying(false);

            if (outcome === "success") {
                clearCart();
                setPaymentBanner({
                    type: "success",
                    text: "Order placed! Payment received. Your order has been placed successfully.",
                });
                showAlert("Order placed", "Payment received. Your order has been placed successfully.");
            } else if (outcome === "cancel") {
                setPaymentBanner({
                    type: "cancel",
                    text: "Payment not completed. Your order was not placed. You can try again.",
                });
                showAlert("Payment not completed", "Your order was not placed. You can try again.");
            }
        };

        if (status) {
            handleStatus(status);
            if (Platform.OS === "web" && typeof window !== "undefined") {
                window.localStorage.removeItem("stripe_payment_result");
            }
            router.replace("/cart");
            return;
        }

        if (Platform.OS === "web" && typeof window !== "undefined") {
            const consumeStoredResult = () => {
                const raw = window.localStorage.getItem("stripe_payment_result");
                if (!raw) return;
                window.localStorage.removeItem("stripe_payment_result");
                try {
                    const parsed = JSON.parse(raw);
                    handleStatus(parsed?.status);
                } catch {
                    // Ignore malformed storage entry
                }
            };

            consumeStoredResult();

            const onStorage = (e: StorageEvent) => {
                if (e.key === "stripe_payment_result" && e.newValue) {
                    consumeStoredResult();
                }
            };
            window.addEventListener("storage", onStorage);
            return () => window.removeEventListener("storage", onStorage);
        }
    }, [status, clearCart]);

    const handleOrder = async () => {
        if (items.length === 0) {
            showAlert("Your cart is empty", "Add an item before placing an order.");
            return;
        }

        setIsPaying(true);
        try {
            // Stripe sends the browser back to this deep link / URL after payment or cancel.
            const redirectUrl = Linking.createURL("payment-result");
            const checkoutUrl = await createCheckoutSession(items, redirectUrl);

            if (Platform.OS === "web" && typeof window !== "undefined") {
                window.location.assign(checkoutUrl);
                return;
            }

            const result = await WebBrowser.openAuthSessionAsync(checkoutUrl, redirectUrl);

            if (result.type === "success" && Linking.parse(result.url).queryParams?.status === "success") {
                clearCart();
                showAlert("Order placed", "Payment received. Your order has been placed successfully.");
            } else {
                showAlert("Payment not completed", "Your order was not placed. You can try again.");
            }
        } catch (e: any) {
            showAlert("Payment failed", e?.message ?? "Something went wrong. Please try again.");
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => `${item.id}-${(item.customizations ?? []).map(({ id }) => id).sort().join('-')}`}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => (
                    <View>
                        <CustomHeader title="Your Cart" />
                        {paymentBanner && (
                            <View
                                className={cn(
                                    "mb-5 rounded-xl p-4 border",
                                    paymentBanner.type === "success"
                                        ? "bg-success/10 border-success"
                                        : "bg-error/10 border-error"
                                )}
                            >
                                <Text
                                    className={cn(
                                        "paragraph-bold",
                                        paymentBanner.type === "success" ? "text-success" : "text-error"
                                    )}
                                >
                                    {paymentBanner.text}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                ListEmptyComponent={() => <Text>Cart Empty</Text>}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">
                                Payment Summary
                            </Text>

                            <PaymentInfoStripe
                                label="Subtotal"
                                value={`$${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`$5.00`}
                            />
                            <PaymentInfoStripe
                                label={`Discount`}
                                value={`- $0.50`}
                                valueStyle="!text-success"
                            />
                            <View className="border-t border-gray-300 my-2" />
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`$${orderTotal.toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <CustomButton title="Order Now" onPress={handleOrder} isLoading={isPaying} />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart
