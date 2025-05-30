import "./App.css";
import { BrowserRouter } from "react-router-dom";
import LayOut from "./components/LayOut";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <LayOut />
      </BrowserRouter>
    </div>
  );
};

export default App;
