const handleACH = async () => {
  const payload = connectedAccountId
    ? {
        customerId,
        stripeAccountId: connectedAccountId,
      }
    : {
        customerId,
      };
  try {
    setLoading(true);
    const res = await apiClient.post("/stripe/create-financial-link", payload);
    const { clientSecret } = res.data;
    const payment_method_data = {
      billing_details: {
        name: adminDetails?.name,
        email: adminDetails?.email,
      },
    };
    const params = {
      payment_method_type: "us_bank_account",
      payment_method_data,
    };
    const result = await stripe.collectBankAccountForSetup({
      clientSecret,
      params,
    });
    if (result.error) {
      // alert(Bank connection failed: ${result.error.message});
      toast.error(`Bank connection failed: ${result.error.message}`);
      setLoading(false);
      return;
    }
    const confirmation = await stripe.confirmUsBankAccountSetup(clientSecret);
    if (confirmation.error) {
      // alert(Confirmation failed: ${confirmation.error.message});
      toast.error(`Confirmation failed: ${confirmation.error.message}`);
      setLoading(false);
      return;
    }
    toast.success("Bank account saved successfully!");
    // alert("Bank account saved successfully!");
    fetchMethods();
  } catch (error) {
    console.error(error);
    // alert(error?.response?.data?.message || "Something went wrong.");
    toast.error(error?.response?.data?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};
