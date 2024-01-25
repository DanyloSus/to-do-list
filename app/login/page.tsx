//import from libraries
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

//internal imports
import FormLogin from "./form";
import Form from "@/elements/Form/Form";
import { authOptions } from "@/lib/next-auth/authOptions";

const LoginPage = async () => {
  //get session
  const session = await getServerSession(authOptions);

  if (session) redirect("/to-do"); // if user is signed, then redirect them to to-do list page but deleting in history /login

  return (
    <Form heading="Login">
      <FormLogin />
    </Form>
  );
};

export default LoginPage;
