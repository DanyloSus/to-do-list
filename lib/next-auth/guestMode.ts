//import from libraries
import { SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Parametres = {
  setError?: (value: SetStateAction<string>) => void;
  setLoading: (value: SetStateAction<boolean>) => void;
  router: AppRouterInstance;
};

// function for signIn in admin which is Guest mode also
export const handleGuest = async ({
  setError,
  setLoading,
  router,
}: Parametres) => {
  setLoading(true); // set loading

  const res = await signIn("credentials", {
    // send request for signIn to admin
    username: "admin",
    password: "eKmvL3954dbpmTyrcnFN",
    redirect: false,
  }).catch((err) => console.log(err));

  if (!res?.ok) {
    // if some error
    if (setError) {
      // if it has setError
      setError("Something went wrong ;("); // set Error
    }

    setLoading(false); // set loading
    return; // return nothing
  }

  router.replace("to-do"); // go by link
};
