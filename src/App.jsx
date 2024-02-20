import Container from "./components/Container";
import { TotalWaterProvider } from "./context/Context";

const N = 4;

const App = () => {
  return (
    <TotalWaterProvider>
      <div className="flex flex-col gap-12 justify-center items-center select-none pt-10 ">
        <h1
          className=" pt-4 text-4xl font-bold animate-bounce"
          style={{ color: "#74ccf4" }}
        >
          Water Bucket Challenge
        </h1>
        <div className="flex justify-center">
          {[...Array(N)].map((_, index) => (
            <Container key={index} id={index} N={N} />
          ))}
        </div>
      </div>
    </TotalWaterProvider>
  );
};

export default App;
