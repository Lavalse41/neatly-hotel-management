import Navbar from "../components/Navbar.tsx";
import Header from "../components/Home/Header.tsx";
import About from "../components/Home/About.tsx";
import Service from "../components/Home/Service.tsx";
import Rooms from "../components/Home/Rooms.tsx";
import Review from "../components/Home/Review.tsx";
import Footer from "../components/Footer.tsx";
import Search from "../components/Search.tsx";
import UserInputType from "../interfaces/UserInputType.ts";

interface HomeProps {
  onSearchResult: (result: UserInputType) => void;
  setUserInput: (result: UserInputType) => void;
}

function Home({ onSearchResult, setUserInput }: HomeProps) {
  return (
    <div>
      <Navbar />
      <Header>
        <div className="mt-40 text-center font-noto-serif-display text-headline1 text-white">
          A Best Place for Your<br></br>
          Neatly Experience
        </div>
        <div className="py-14 px-14 top-[500px] rounded absolute bg-white">
          <Search
            onSearchResult={onSearchResult}
            setUserInput={setUserInput}
            seachResultBtn={""}
          />
        </div>
      </Header>
      <About />
      <Service />
      <Rooms />
      <Review />
      <Footer />
    </div>
  );
}

export default Home;
