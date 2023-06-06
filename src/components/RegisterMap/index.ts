import dynamic from "next/dynamic";

const RegisterMap = dynamic(() => import("./RegisterMap"), { ssr: false });

export default RegisterMap;
