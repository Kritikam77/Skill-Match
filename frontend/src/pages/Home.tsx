import HowWeWork from "./../components/HowWeWork";
import LandingPage from "./../components/LandingPage";
import Providers from "./../components/Providers";
import ServiceList from "./../components/ServicesList";
import Footer from "./../components/Footer";


const Home = () => {
  return (
    <div>
      <LandingPage />
      <ServiceList />
      <HowWeWork />
      <Providers />
      <Footer />
    </div>
  );
};

export default Home;
