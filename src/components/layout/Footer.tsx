import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import logo from "@/assets/images/icons/logo-footer.png";

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
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Wedding Efficiency"
                className="h-16"
              />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Wedding Efficiency vous accompagne dans l'organisation de vos
              mariages et événements avec élégance, précision et sérénité.
            </p>

            <div className="flex items-center gap-4 text-foreground/75">
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter size={16} />
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Liens rapides
              </h4>

              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Accueil
                  </Link>
                </li>

                <li>
                  <Link
                    to="/apropos"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    À propos
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Contact
              </h4>

              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+261349188043"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    034 91 880 43
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+261330737309"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    033 07 373 09
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:efficiencyevent@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    efficiencyevent@gmail.com
                  </a>
                </li>

                <li>
                  <span className="text-sm text-muted-foreground">
                    Efficiency Organization Event
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground/75">
            © 2026 Wedding Efficiency. Tous droits réservés.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy-policy"
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              Politique de confidentialité
            </Link>

            <Link
              to="/terms"
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              Conditions
            </Link>

            <Link
              to="/cookies"
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;