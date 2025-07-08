import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Testimonials from './Testimonials';
import BookingForm from './BookingForm';
import Footer from './Footer';

const BotPage = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <Hero />
    <Services />
    <About />
    <Testimonials />
    <BookingForm />
    <Footer />
  </div>
);

export default BotPage;
