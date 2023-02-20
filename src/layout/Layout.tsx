import { ReactNode, FC } from "react";
import Sidebar from "../components/Sidebar";

// defining the type of prop here
type Props = { children: ReactNode };

const App: FC<Props> = ({ children }) => (
  <div className="flex">
    <Sidebar/>
    {children}
  </div>
);

export default App;
