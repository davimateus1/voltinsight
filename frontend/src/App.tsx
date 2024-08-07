import { UploadSection } from "@/components/sections/upload";
import { DashboardSection } from "@/components/sections/dashboard";

const App = () => {
  return (
    <div className="w-full h-svh flex bg-sky-950 p-6 justify-center">
      <div className="w-full h-full flex max-w-screen-2xl">
        <UploadSection />
        <DashboardSection />
      </div>
    </div>
  );
};

export default App;
