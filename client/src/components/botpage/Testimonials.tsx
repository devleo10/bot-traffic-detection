import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechFlow Solutions',
      company: 'TechFlow',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'SaaSFlow transformed our business completely. Their strategic approach helped us increase our MRR by 300% in just 8 months. The team is incredibly knowledgeable and responsive.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Founder, DataSync Pro',
      company: 'DataSync',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'Working with SaaSFlow was a game-changer. Their data-driven insights and growth strategies helped us scale from 1K to 50K users in under a year. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'COO, CloudVault',
      company: 'CloudVault',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'The expertise and dedication of the SaaSFlow team is unmatched. They helped us optimize our customer acquisition funnel and reduce churn by 60%. Outstanding results!',
      rating: 5
    },
    {
      name: 'David Park',
      role: 'CTO, InnovateLabs',
      company: 'InnovateLabs',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'SaaSFlow provided us with the strategic direction we needed to compete in a crowded market. Their market analysis and competitive intelligence were spot on.',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'VP Marketing, ScaleUp',
      company: 'ScaleUp',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'The growth strategies implemented by SaaSFlow helped us achieve our revenue goals 6 months ahead of schedule. Their approach is both innovative and practical.',
      rating: 5
    },
    {
      name: 'Robert Kim',
      role: 'CEO, NextGen Analytics',
      company: 'NextGen',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'SaaSFlow understands the SaaS landscape like no other. Their guidance helped us navigate complex market challenges and emerge stronger than ever.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about 
            working with SaaSFlow.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 relative group"
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-blue-500" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join hundreds of successful SaaS companies who have transformed their 
            business with our proven strategies and expert guidance.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;