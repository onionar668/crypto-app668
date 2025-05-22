import  { CryptoContextProvider } from "./context/crypto-context";
import AppLayout from "./pages/Layout/AppLayout";


export default function App() {
 
  return (
    <CryptoContextProvider>
    <AppLayout/>
    </CryptoContextProvider>
  );
}
