import React, { useState } from "react";
import { useEffect } from "react";

function Paypal(props) {
  const {
    product,
    amount,
    items,
    currency,
    first_name,
    last_name,
    address1,
    address2,
    city,
    state,
    postcode,
    email,
    live_mode,
    setMessage,
    setOpenPopup,
    baseUrl   
  } = props;
  const [formAction, setFormAction] = useState();
  useEffect(() => {
    live_mode == 0
      ? setFormAction("https://www.sandbox.paypal.com/cgi-bin/webscr")
      : setFormAction("https://www.paypal.com/cgi-bin/webscr");
  }, [live_mode]);

  return (
    <>
      <div className="mt-3 mb-3">
        <form action={formAction} method="post">
          {/* Identify your business so that you can collect the payments. */}
          <input type="hidden" name="business" defaultValue={email} />
          {/* Specify a Buy Now button. */}
          <input type="hidden" name="cmd" defaultValue="_xclick" />
          {/* Specify details about the item that buyers will purchase. */}
          <input type="hidden" name="item_name" defaultValue={product} />
          <input type="hidden" name="item_number" defaultValue={items} />
          <input type="hidden" name="amount" defaultValue={amount} />
          <input type="hidden" name="currency_code" defaultValue={currency} />
          <input type="hidden" name="first_name" defaultValue={first_name} />
          <input type="hidden" name="last_name" defaultValue={last_name} />
          <input type="hidden" name="address1" defaultValue={address1} />
          <input type="hidden" name="address2" defaultValue={address2} />
          <input type="hidden" name="city" defaultValue={city} />
          <input type="hidden" name="state" defaultValue={state} />
          <input type="hidden" name="zip" defaultValue={postcode} />
          {/* Specify URLs */}
          <input
            type="hidden"
            name="return"
            defaultValue={`${baseUrl}/thank-you/paypal`}
          />
          <input
            type="hidden"
            name="cancel_return"
            defaultValue={`${baseUrl}/make-payment`}
          />
          <input
            type="hidden"
            name="notify_url"
            defaultValue={`${baseUrl}`}
          />
          {/* Display the payment button. */}
          {amount && amount > 0 ? (
            <input
              type="submit"
              name="submit"
              value="Paypal"
              className="btn-style-one"
            />
          ) : (
            <input
              onClick={(e) => {
                e.preventDefault();
                setMessage("No outstanding dues");
                setOpenPopup(true);
              }}
              value="Paypal"
              type="submit"
              name="submit"
              className="btn-style-disabled"
            />
          )}
        </form>
      </div>
    </>
  );
}

export default Paypal;
