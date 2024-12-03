import { DealsSection } from "./deals/DealsSection";

export const Dashboard = () => {
  return (
    <div className="max-h-[46rem] md:max-h-[54rem] bg-[#ffffff] rounded-l-[12px] border border-[#DEDEE8] w-full flex flex-col gap-[36px] md:mt-[30px]">
      <DealsSection />
    </div>
  );
};
