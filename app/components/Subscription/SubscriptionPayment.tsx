"use client";
import axios from "@/utils/axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import {
  ContentInputCard,
  ContentInputCardInput,
  ContentInputCardLine,
  ContentPayment,
  ContentSummeryPayment,
  ContentSummeryPaymentButton,
  ContentSummeryPaymentSecure,
  ContentSummeryPaymentTitle,
  Divider,
  PaymentContainer,
  TextContainer,
  TextSummeryLine,
} from "./SubscriptionStyles";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";
import Text from "../Library/text/Text";
import Input from "../Library/input/Input";
import { InputMode, InputSize } from "@constants/input";
import CustomCardElement from "./CustomCardElement";
import Button from "../Library/button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { useSubscription } from "@/context/useSubscriptionContext";
import { IconName } from "@constants/icon";
import Icon from "../Library/icon/Icon";
import { useRouter } from "next/navigation";

const SubscriptionPayment: React.FC = ({}) => {
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();
  const { plan, yearly, monPrice } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isFreeMonth, setIsFreeMonth] = useState(false);
  const [interval, setInterval] = useState<string>(
    yearly ? "Yearly" : "Monthly"
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    companyName: "",
  });

  const salePrice = Math.floor(monPrice - monPrice * 0.18);
  const sale = monPrice - salePrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDiscountValidation = async () => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const response = await axios.post("subscription/validate-discount", {
    //     code: discountCode,
    //   });
    //   const data = response.data;
    //   if (data.valid) {
    //     setDiscountInfo(data);
    //     setIsFreeMonth(data.isFreeMonth || false);
    //   } else {
    //     setDiscountInfo(null);
    //     setIsFreeMonth(false);
    //     setError(data.message);
    //     console.log("Invalid discount code", data.message);
    //   }
    // } catch (error) {
    //   console.error("Error validating discount:", error);
    //   setError("Error validating discount code");
    // }
    // setLoading(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isFreeMonth) {
        const paymentInfo = {
          plan,
          interval,
          discountCode,
        };

        const response = await axios.post("subscription/create-subscription", {
          paymentInfo,
          userData: formData,
        });
        router.push("/userPage");

        console.log("Free month subscription created:", response.data);
        // Handle success (e.g., show a success message, redirect user)
      } else {
        if (!stripe || !elements) {
          throw new Error("Stripe not initialized");
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          throw new Error("Couldn't find the card element. Please try again.");
        }

        // Create payment method
        const { error: paymentMethodError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
          });

        if (paymentMethodError) {
          throw new Error(paymentMethodError.message);
        }

        const paymentInfo = {
          paymentMethodId: paymentMethod.id,
          plan,
          interval,
          discountCode,
        };

        const subscriptionResponse = await axios.post(
          "subscription/create-subscription",
          {
            paymentInfo,
            userData: formData,
          }
        );

        const { subscriptionId } = subscriptionResponse.data;
        router.push("/userPage");

        console.log("Subscription created:", subscriptionId);
        // Handle success (e.g., show a success message, redirect user)
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create subscription. Please try again."
      );
    }

    setLoading(false);
  };

  const currentDate = new Date();

  const nextChargeDate = new Date(currentDate);

  if (!yearly) {
    nextChargeDate.setMonth(currentDate.getMonth() + 1);
  } else {
    nextChargeDate.setFullYear(currentDate.getFullYear() + 1);
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = nextChargeDate.toLocaleDateString("en-US", options);

  return (
    <PaymentContainer>
      <TextContainer>
        <Text
          size={TextSize.D1}
          $family={FontFamily.Poppins}
          $weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}
        >
          Complete Your Purchase
        </Text>
        <Text
          size={TextSize.H3}
          $family={FontFamily.Poppins}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          Add payment details and complete your purchase
        </Text>
      </TextContainer>
      <ContentPayment>
        <form onSubmit={handleSubmit}>
          <ContentInputCard>
            <ContentInputCardInput>
              {!isFreeMonth && <CustomCardElement />}
              {error && <div style={{ color: "red" }}>{error}</div>}
            </ContentInputCardInput>
            <ContentInputCardLine>
              <Input
                name="firstName"
                label="First Name"
                fullWidth={true}
                placeholder="First Name"
                inputSize={InputSize.LARGE}
                mode={InputMode.DEFAULT}
                onChange={handleChange}
              ></Input>
              <Input
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                inputSize={InputSize.LARGE}
                mode={InputMode.DEFAULT}
                onChange={handleChange}
              ></Input>
            </ContentInputCardLine>

            <ContentInputCardLine>
              <Input
                name="companyName"
                label="Company Name"
                placeholder="Company Name"
                inputSize={InputSize.LARGE}
                mode={InputMode.DEFAULT}
                onChange={handleChange}
              ></Input>

              <Input
                name="address"
                label="Address"
                placeholder="Address Name"
                inputSize={InputSize.LARGE}
                mode={InputMode.DEFAULT}
                onChange={handleChange}
              ></Input>
            </ContentInputCardLine>

            <ContentInputCardLine>
              <Input
                name="city"
                label="City"
                placeholder="City"
                inputSize={InputSize.LARGE}
                mode={InputMode.DEFAULT}
                onChange={handleChange}
              ></Input>
              <Input
                name="country"
                label="Country    "
                placeholder="Country"
                inputSize={InputSize.LARGE}
                mode={InputMode.DEFAULT}
                onChange={handleChange}
              ></Input>
            </ContentInputCardLine>
            {/* 
            <div>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
              />
              <button
                type="submit"
                onClick={handleDiscountValidation}
                disabled={loading}
              >
                Apply Discount
              </button>
            </div> */}
            {/* {discountInfo && (
              <div>
                Discount applied:{" "}
                {isFreeMonth
                  ? "Free month"
                  : `${discountInfo.discountAmount} off`}
                {!isFreeMonth &&
                  discountInfo.duration !== "forever" &&
                  ` for ${discountInfo.durationInMonths || 1} month(s)`}
              </div>
            )} */}
          </ContentInputCard>
        </form>
        <ContentSummeryPayment>
          <Text
            size={TextSize.H3}
            $family={FontFamily.Poppins}
            $weight={FontWeight.BOLD}
            color={TextColor.PRIMARY_TEXT}
          >
            Summery
          </Text>
          <ContentSummeryPaymentTitle>
            <Text
              size={TextSize.TEXT1}
              $family={FontFamily.Poppins}
              $weight={FontWeight.BOLD}
              color={TextColor.PRIMARY_TEXT}
            >
              {plan}
            </Text>
            <TextSummeryLine>
              <Text
                size={TextSize.TEXT1}
                $family={FontFamily.Poppins}
                $weight={FontWeight.NORMAL}
                color={TextColor.PRIMARY_TEXT}
              >
                {yearly
                  ? `${salePrice}$ x 12 months = ${salePrice * 12}$`
                  : `${monPrice}$ / every month`}
              </Text>
              <Text
                size={TextSize.TEXT1}
                $family={FontFamily.Poppins}
                $weight={FontWeight.NORMAL}
                color={TextColor.PRIMARY_TEXT}
              >
                {yearly ? `${salePrice * 12}$ ` : `${monPrice}$ `}
              </Text>
            </TextSummeryLine>
          </ContentSummeryPaymentTitle>
          {yearly && (
            <Text
              size={TextSize.TEXT1}
              $family={FontFamily.Poppins}
              $weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY}
            >
              You saved {sale * 12}$ choosing the yearly plan
            </Text>
          )}
          {/* <Divider />

          <TextSummeryLine>
            <Text
              size={TextSize.TEXT1}
              family={FontFamily.Poppins}
              weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY_TEXT}
            >
              Subtotal
            </Text>
            <Text
              size={TextSize.TEXT1}
              family={FontFamily.Poppins}
              weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY_TEXT}
            >
              {yearly ? `${salePrice * 12}$ ` : `${monPrice}$ `}
            </Text>
          </TextSummeryLine>
          <TextSummeryLine>
            <Text
              size={TextSize.TEXT1}
              family={FontFamily.Poppins}
              weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY_TEXT}
            >
              Tax (17.0%)
            </Text>
            <Text
              size={TextSize.TEXT1}
              family={FontFamily.Poppins}
              weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY_TEXT}
            >
              {yearly ? `${salePrice * 12}$ ` : `${monPrice}$ `}
            </Text>
          </TextSummeryLine> */}

          <Divider />

          <TextSummeryLine>
            <Text
              size={TextSize.TEXT1}
              $family={FontFamily.Poppins}
              $weight={FontWeight.BOLD}
              color={TextColor.PRIMARY_TEXT}
            >
              Total
            </Text>
            <Text
              size={TextSize.TEXT1}
              $family={FontFamily.Poppins}
              $weight={FontWeight.BOLD}
              color={TextColor.PRIMARY_TEXT}
            >
              {yearly ? `${salePrice * 12}$ ` : `${monPrice}$ `}
            </Text>
          </TextSummeryLine>
          <Text
            size={TextSize.TEXT2}
            $family={FontFamily.Poppins}
            $weight={FontWeight.NORMAL}
            color={TextColor.PRIMARY_TEXT}
          >
            Next charge date: {formattedDate}
          </Text>
          <ContentSummeryPaymentButton>
            {!loading ? (
              <Button
                size={ButtonSize.MEDIUM}
                fullWidth={true}
                variant={ButtonVariant.PRIMARY}
                text="Complete Purchase"
                type={ButtonType.PRIMARY}
                icon={IconName.LOCK}
                onClick={handleSubmit}
              />
            ) : (
              <Icon name={IconName.UPLOAD} />
            )}
            <ContentSummeryPaymentSecure>
              <Icon name={IconName.SHIELDCHECK} />
              <Text
                size={TextSize.TEXT2}
                $family={FontFamily.Poppins}
                $weight={FontWeight.NORMAL}
                color={TextColor.PRIMARY_TEXT}
              >
                Safe & Secure Payment
              </Text>
            </ContentSummeryPaymentSecure>
          </ContentSummeryPaymentButton>
        </ContentSummeryPayment>
      </ContentPayment>
    </PaymentContainer>
  );
};

export default SubscriptionPayment;
