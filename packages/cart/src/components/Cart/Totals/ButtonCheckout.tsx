import {
  CheckoutLink,
  LineItemsCount,
  PaymentMethod,
  PaymentMethodsContainer,
  PaymentSource,
  useOrderContainer,
  Errors,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { useSettings } from "#components/SettingsProvider"
import { isEmbedded } from "#utils/isEmbedded"

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")
  const { order } = useOrderContainer()
  const { settings } = useSettings()
  // const checkoutUrl = settings
  console.log(order, settings)
  let checkoutUrl: string = "";
  if (order?.cart_url) {
    checkoutUrl = order?.cart_url.replace("cart", "checkout")
  }
  return (
    <>
      <div key={order?.total_amount_cents}>
        <PaymentMethodsContainer>
          <PaymentMethod expressPayments className="mb-4" loader={<div />}>
            <PaymentSource loader={<div />} />
          </PaymentMethod>
        </PaymentMethodsContainer>
      </div>

      <Errors
        resource="line_items"
        className="block text-xs text-red-400 mb-4"
        messages={[
          {
            code: "VALIDATION_ERROR",
            resource: "line_items",
            field: "quantity",
            message: t("general.quantityNotAvailable"),
          },
        ]}
      />

      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <CheckoutLink
              data-test-id="button-checkout"
              hostedCheckout={false}
              href={checkoutUrl}
              aria-disabled="false"
              className={
                "button-base bg-primary text-contrast block rounded-md py-3 px-3"
              }
              label={label}
              target={isEmbedded() ? "_top" : undefined}
            />
          ) : (
            <ButtonCheckoutDisabled />
          )
        }
      </LineItemsCount>
    </>
  )
}
