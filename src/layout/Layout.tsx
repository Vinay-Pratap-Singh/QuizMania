import { ReactNode, FC } from "react";
import Navbar from "../components/Navbar";

// defining the type of prop here
type Props = { children: ReactNode };

const App: FC<Props> = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

export default App;
