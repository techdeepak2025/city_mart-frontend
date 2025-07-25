import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";
import { ROLES } from "../../../constants/roles";

import { LoginButton } from "../../../ui/button";
import { MobileInput, PasswordInput } from "../../../ui/input";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const mobile = useWatch({ control, name: "mobile" });
  const password = useWatch({ control, name: "password" });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);

      toast.success("Login successful");

      switch (user.role) {
        case ROLES.ADMIN:
          navigate("/admin", { replace: true });
          break;
        case ROLES.STORE_MANAGER:
          navigate("/store", { replace: true });
          break;
        case ROLES.INVENTORY_STAFF:
          navigate("/inventory", { replace: true });
          break;
        case ROLES.PRICE_MANAGER:
          navigate("/price", { replace: true });
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('bg3.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-md space-y-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <MobileInput
            label="Mobile Number"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChange={(e) => setValue("mobile", e.target.value)}
            error={errors.mobile?.message}
            required
            showIcon
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setValue("password", e.target.value)}
            error={errors.password?.message}
            required
            showIcon
          />

          <div className="pt-2">
            <LoginButton
              width="100%"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              label="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
