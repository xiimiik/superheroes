import SuperheroList from "./components/SuperheroList";
import PaginationTemplate from "./components/PaginationTemplate";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "./components/Loader";

function App() {
  const { superheroes, totalLength } = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <div className='d-flex flex-column container-xl align-content-between h-100'>
      <SuperheroList superheroes={superheroes} />
      <PaginationTemplate total={totalLength} />
    </div>
  );
}

export default App;
