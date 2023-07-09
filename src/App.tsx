import { Body } from "./components/body/Body";
import { Footer } from "./components/folder/Footer";
import { Header } from "./components/header/Header";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
