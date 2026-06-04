import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from '@/assets/images/icons/logo-footer.png'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left: Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              {/* Logo icon */}
                <img src={logo} alt="Efficiency Logo" className="h-16" />
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Wedding Efficiency vous accompagne dans l'organisation de vos
              mariages et événements avec élégance, précision et sérénité.
            </p>

            <div className="flex items-center gap-4 text-gray-700">
              <a href="#" className="hover:text-black transition-colors"><FaXTwitter size={16} /></a>
              <a href="#" className="hover:text-black transition-colors"><FaInstagram size={16} /></a>
              <a href="#" className="hover:text-black transition-colors"><FaLinkedinIn size={16} /></a>
              <a href="#" className="hover:text-black transition-colors"><FaGithub size={16} /></a>
            </div>
          </div>

          {/* Right: Nav columns */}
          <div className="flex gap-16">
            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Liens rapides</h4>
              <ul className="space-y-3">
                {["Home", "à propos", "Services", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3">
                {["034 91 880 43", "033 07 373 09", "efficiencyevent@gmail.com","Efficiency orgaztion Event",].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">© 2026 Wedding Efficiency. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            {["Politique de confidentialité", "Conditions", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-900 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
