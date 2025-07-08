import { Rocket, BarChart3, Users, Zap, Globe, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Rocket,
      title: 'Growth Strategy',
      description: 'Comprehensive growth planning and execution to accelerate your SaaS business with proven methodologies.',
      features: ['Market Analysis', 'Competitive Intelligence', 'Growth Roadmap', 'KPI Optimization']
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights with advanced analytics and business intelligence solutions.',
      features: ['Custom Dashboards', 'Performance Metrics', 'Predictive Analytics', 'Real-time Reporting']
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Build lasting relationships with your customers through strategic onboarding and retention programs.',
      features: ['Onboarding Automation', 'Retention Strategies', 'Success Metrics', 'Feedback Systems']
    },
    {
      icon: Globe,
      title: 'Market Expansion',
      description: 'Scale your SaaS globally with market entry strategies and localization expertise.',
      features: ['Market Research', 'Localization', 'Partner Networks', 'Compliance Support']
    },
    {
      icon: Zap,
      title: 'Product Optimization',
      description: 'Enhance your product-market fit with user research and optimization strategies.',
      features: ['User Research', 'A/B Testing', 'Feature Prioritization', 'UX Optimization']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Ensure your SaaS meets industry standards with comprehensive security and compliance solutions.',
      features: ['Security Audits', 'Compliance Framework', 'Data Protection', 'Risk Assessment']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive SaaS Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From strategy to execution, we provide end-to-end services to help your SaaS business 
            thrive in today's competitive landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;