import { VT323 } from "next/font/google";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323", // optional but recommended
});

const ModhusLogo = () => {
  return (
    <div className="flex items-center rounded-full"
    style={{backgroundColor: `rgb(245, 242, 242)`}}>
    <div className={`text-4xl font-bold ${vt323.className} px-2`}>
      Modhus
    </div>
    </div>
  )
}

export default ModhusLogo;