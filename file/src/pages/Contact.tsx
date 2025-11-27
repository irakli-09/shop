import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

export const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-gray-500 font-light mb-12 leading-relaxed">
            Have a question about a model or need support? We're here to help. Fill out the form or reach us directly via email.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400 mb-1">Email</h3>
              <a href="mailto:hello@3dproject.com" className="text-xl hover:text-gray-600 transition-colors">
                hello@3dproject.com
              </a>
            </div>
            
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400 mb-1">Social</h3>
              <div className="flex gap-6">
                <a href="#" className="text-lg hover:text-gray-600 transition-colors">Instagram</a>
                <a href="#" className="text-lg hover:text-gray-600 transition-colors">Twitter</a>
                <a href="#" className="text-lg hover:text-gray-600 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 md:p-10">
          <form className="space-y-6">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
            <Textarea label="Message" placeholder="How can we help?" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
