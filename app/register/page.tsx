//import from libraries
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//internal imports
import { authOptions } from "@/lib/next-auth/authOptions";
import FormRegister from "./form";
import Form from "@/elements/Form/Form";

const RegistrationPage = async () => {
  //get session
  const session = await getServerSession(authOptions);

  if (session) redirect("/to-do"); // if user is signed, then redirect them to to-do list page but deleting in history /register

  return (
    <Form heading="Register">
      <FormRegister />
    </Form>
  );
};

export default RegistrationPage;
