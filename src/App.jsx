import { useState } from "react";

import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  //console.log(currencyInfo);
  const Options = Object.keys(currencyInfo);
  //console.log(Options);

  const handle = (val) => {
    setAmount(val);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/40 shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-4">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={Options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                border-2 border-white rounded-md bg-blue-600
                 text-white px-2 py-0.5 text-lg "
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={Options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  onAmountChange={(convertedAmount) =>
                    setAmount(convertedAmount)
                  }
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-48 bg-blue-600 text-white px-4 py-3 rounded-lg font-bold"
                >
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
