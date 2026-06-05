import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from '@/assets/images/icons/logo-footer.png'
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border-t border-border font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left: Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              {/* Logo icon */}
                <img src={logo} alt="Efficiency Logo" className="h-16" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Wedding Efficiency vous accompagne dans l'organisation de vos
              mariages et événements avec élégance, précision et sérénité.
            </p>

            <div className="flex items-center gap-4 text-foreground/75">
              <a href="#" className="hover:text-primary transition-colors"><FaXTwitter size={16} /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaInstagram size={16} /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaLinkedinIn size={16} /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaGithub size={16} /></a>
            </div>
          </div>

          {/* Right: Nav columns */}
          <div className="flex gap-16">
            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Liens rapides</h4>
              <ul className="space-y-3">
                {["Home", "à propos", "Services", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-3">
                {["034 91 880 43", "033 07 373 09", "efficiencyevent@gmail.com","Efficiency orgaztion Event",].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground/75">© 2026 Wedding Efficiency. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            {["Politique de confidentialité", "Conditions", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
