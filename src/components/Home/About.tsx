import SlideBarLandingPage from "./SlideBarLandingPage.tsx";

function About() {
  return (
    <div className=" bg-white" id="about">
      <div className="pt-36 px-40">
        <div className="mb-12 text-headline2 font-noto-serif-display text-green-800">
          Neatly Hotel
        </div>
        <div className="ml-36 text-body1 text-gray-700 flex flex-col justify-end ">
          <span>
            Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
            with an outdoor pool, kids' club, sports facilities and a fitness
            centre. There is also a spa, an indoor pool and saunas.
          </span>
          <br></br>
          <span>
            All units at the hotel are equipped with a seating area, a
            flat-screen TV with satellite channels, a dining area and a private
            bathroom with free toiletries, a bathtub and a hairdryer. Every room
            in Neatly Hotel features a furnished balcony. Some rooms are
            equipped with a coffee machine.
          </span>
          <br></br>
          <span>
            Free WiFi and entertainment facilities are available at property and
            also rentals are provided to explore the area.
          </span>
        </div>
      </div>
      <div className="pt-36 pb-20">
        <SlideBarLandingPage />
      </div>
    </div>
  );
}

export default About;
