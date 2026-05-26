import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import styles from "./privacy.module.css";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr ? "Politique de confidentialité — KiddyKode" : "Privacy Policy — KiddyKode",
    description: isFr
      ? "Découvrez comment KiddyKode protège la vie privée de ses élèves et de leurs parents, conformément aux règles du RGPD-K et de la COPPA."
      : "Learn how KiddyKode protects the privacy of students and parents, in accordance with GDPR-K and COPPA frameworks.",
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  // Localized navigation items
  const sections = isFr
    ? [
        { id: "safety-first", num: "01", title: "Sécurité des enfants" },
        { id: "collection", num: "02", title: "Données collectées" },
        { id: "usage", num: "03", title: "Utilisation des données" },
        { id: "security", num: "04", title: "Sécurité & Stockage" },
        { id: "third-parties", num: "05", title: "Services tiers" },
        { id: "rights", num: "06", title: "Droits des parents" },
        { id: "cookies", num: "07", title: "Cookies & Analyses" },
        { id: "changes", num: "08", title: "Modifications" },
        { id: "contact-us", num: "09", title: "Nous contacter" },
      ]
    : [
        { id: "safety-first", num: "01", title: "Child Safety First" },
        { id: "collection", num: "02", title: "Information We Collect" },
        { id: "usage", num: "03", title: "How We Use Data" },
        { id: "security", num: "04", title: "Security & Storage" },
        { id: "third-parties", num: "05", title: "Third-Party Services" },
        { id: "rights", num: "06", title: "Parent Rights & Control" },
        { id: "cookies", num: "07", title: "Cookies & Analytics" },
        { id: "changes", num: "08", title: "Policy Updates" },
        { id: "contact-us", num: "09", title: "Contact Us" },
      ];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: isFr ? "Accueil" : "Home", href: "/" },
          { label: isFr ? "Confidentialité" : "Privacy Policy", href: "/privacy" },
        ]}
        eyebrow={isFr ? "CONFIDENTIALITÉ" : "PRIVACY"}
        title={isFr ? "Politique de confidentialité." : "Privacy Policy."}
        lede={
          isFr
            ? "Nous prenons la protection de vos données personnelles et de celles de votre enfant très au sérieux. Découvrez comment nous gérons la confidentialité chez KiddyKode."
            : "We take the protection of you and your child's personal data very seriously. Here is an overview of how we handle privacy at KiddyKode."
        }
        metaItems={[{ label: isFr ? "Dernière mise à jour" : "Last Updated", value: "May 2026" }]}
      />

      <div className="wrap">
        <div className={styles.container}>
          {/* Sidebar Section Index */}
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>{isFr ? "Sommaire" : "Sections"}</h3>
            <ul className={styles.indexList}>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={styles.indexLink}>
                    <span className={styles.indexNum}>{section.num}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Legal Content */}
          <main className={styles.content}>
            {/* Highlight callout box for kids/parents */}
            <div className={styles.highlightCard}>
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                {isFr ? "Notre engagement de sécurité" : "Our Safeguarding & Privacy Commitment"}
              </h3>
              <p>
                {isFr
                  ? "KiddyKode respecte les principes directeurs de la protection de la vie privée des enfants (notamment COPPA et RGPD-K). Nous ne vendons jamais les données de vos enfants et ne diffusons aucune publicité ciblée ou comportementale sur notre plateforme."
                  : "KiddyKode adheres strictly to child online privacy frameworks (including COPPA and GDPR-K). We never sell student data, and we do not display target ads or behavioral marketing on our platforms."}
              </p>
            </div>

            {isFr ? (
              /* French Privacy Policy */
              <>
                <section id="safety-first" className={styles.section}>
                  <span className={styles.sectionNum}>01 / securite</span>
                  <h2>1. La sécurité des enfants avant tout</h2>
                  <p>
                    KiddyKode a été fondé sur le principe de créer un espace de création numérique sûr et instructif pour les enfants. La protection des informations relatives aux enfants de moins de 18 ans est au cœur de nos processus opérationnels.
                  </p>
                  <p>
                    Nos équipes ne demandent jamais aux enfants de fournir des informations de contact personnelles directes telles que leur propre adresse e-mail ou leur numéro de téléphone pour participer à nos cours en ligne ou utiliser notre plateforme Studio.
                  </p>
                </section>

                <section id="collection" className={styles.section}>
                  <span className={styles.sectionNum}>02 / collecte</span>
                  <h2>2. Informations que nous collectons</h2>
                  <p>
                    Nous collectons uniquement les informations nécessaires pour inscrire les élèves à nos programmes, gérer leurs comptes d'apprentissage et communiquer avec les parents :
                  </p>
                  <ul>
                    <li><strong>Informations sur les parents / tuteurs :</strong> Nom, adresse e-mail, numéro de téléphone (utilisé pour les notifications WhatsApp et les rappels de paiement), et informations de facturation le cas échéant.</li>
                    <li><strong>Informations sur l'élève :</strong> Prénom ou pseudonyme, tranche d'âge, projets enregistrés dans le Studio KiddyKode et historique de progression. Nous recommandons de ne pas utiliser le nom de famille de l'enfant lors de la configuration de son profil Studio.</li>
                    <li><strong>Informations d'utilisation :</strong> Adresse IP, type d'appareil, historique des logs d'utilisation du Studio (essentiel pour diagnostiquer les bogues système et évaluer la progression pédagogique).</li>
                  </ul>
                </section>

                <section id="usage" className={styles.section}>
                  <span className={styles.sectionNum}>03 / utilisation</span>
                  <h2>3. Comment nous utilisons les données</h2>
                  <p>
                    Les données collectées sont utilisées exclusivement aux fins suivantes :
                  </p>
                  <ul>
                    <li>Assurer la prestation de nos cours (KiddyKode Live, clubs scolaires et Creator Camps).</li>
                    <li>Permettre aux élèves de stocker et d'exécuter leurs projets dans le Studio KiddyKode.</li>
                    <li>Envoyer aux parents des informations de service importantes, y compris des alertes de classe à venir et des relances de paiement via notre moteur de messagerie WhatsApp automatique.</li>
                    <li>Analyser l'efficacité de nos programmes pédagogiques au moyen de statistiques d'apprentissage anonymisées.</li>
                  </ul>
                </section>

                <section id="security" className={styles.section}>
                  <span className={styles.sectionNum}>04 / stockage</span>
                  <h2>4. Sécurité et stockage des données</h2>
                  <p>
                    Les données de KiddyKode sont hébergées de manière sécurisée auprès de serveurs cloud de confiance (tels que Supabase). Nous utilisons des mesures techniques de pointe (chiffrement SSL en transit, politiques de sécurité de niveau ligne RLS sur nos bases de données, contrôle d'accès rigoureux pour le personnel d'administration) pour protéger les données contre tout accès non autorisé, altération ou perte.
                  </p>
                  <p>
                    Nous conservons les données relatives aux comptes d'apprentissage aussi longtemps que le compte reste actif, ou jusqu'à ce qu'un parent nous demande expressément sa suppression.
                  </p>
                </section>

                <section id="third-parties" className={styles.section}>
                  <span className={styles.sectionNum}>05 / tiers</span>
                  <h2>5. Intégration de services tiers</h2>
                  <p>
                    Pour fournir nos fonctionnalités web et de messagerie, nous collaborons avec certains partenaires techniques de confiance :
                  </p>
                  <ul>
                    <li><strong>Supabase :</strong> Hébergement de la base de données et gestion sécurisée de l'authentification.</li>
                    <li><strong>Nodemailer / Serveurs SMTP :</strong> Distribution des courriels administratifs et d'inscriptions.</li>
                    <li><strong>open-wa (sur Render) :</strong> Plateforme d'automatisation des flux WhatsApp pour l'envoi d'alertes de classe ou de rappels de paiement.</li>
                  </ul>
                  <p>
                    Ces prestataires n'ont accès à vos informations que pour effectuer les tâches que nous leur confions et sont tenus de ne pas les divulguer ni de les utiliser à d'autres fins.
                  </p>
                </section>

                <section id="rights" className={styles.section}>
                  <span className={styles.sectionNum}>06 / droits</span>
                  <h2>6. Droits des parents et contrôle</h2>
                  <p>
                    En tant que parent ou tuteur légal, vous disposez d'un contrôle total sur les informations de votre enfant. Vous pouvez à tout moment exercer les droits suivants :
                  </p>
                  <ul>
                    <li>Consulter les données personnelles que nous détenons sur vous et votre enfant.</li>
                    <li>Demander des corrections ou des mises à jour de ces informations.</li>
                    <li>Exiger la suppression définitive du compte Studio de votre enfant ou des dossiers d'inscription à nos cours.</li>
                    <li>Refuser de recevoir des communications automatiques (y compris des notifications WhatsApp et des courriels marketing).</li>
                  </ul>
                  <p>
                    Pour exercer ces droits, veuillez envoyer votre demande écrite à <a href="mailto:safe@kiddykode.org" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>safe@kiddykode.org</a>. Nous traiterons votre demande dans un délai de 48 heures.
                  </p>
                </section>

                <section id="cookies" className={styles.section}>
                  <span className={styles.sectionNum}>07 / cookies</span>
                  <h2>7. Cookies et technologies de suivi</h2>
                  <p>
                    Le portail KiddyKode utilise des cookies essentiels au fonctionnement technique de notre plateforme (maintien de la session active de l'utilisateur, préférences linguistiques de locale EN/FR).
                  </p>
                  <p>
                    Nous n'utilisons aucun cookie publicitaire tiers ou traceur de ciblage marketing. Vous pouvez configurer votre navigateur pour rejeter les cookies, mais cela pourrait nuire à votre expérience utilisateur, en particulier sur l'application Studio.
                  </p>
                </section>

                <section id="changes" className={styles.section}>
                  <span className={styles.sectionNum}>08 / modifications</span>
                  <h2>8. Modifications de cette politique</h2>
                  <p>
                    Nous pouvons modifier cette politique de confidentialité de temps à autre afin de refléter l'évolution de nos services ou de respecter de nouvelles exigences réglementaires. En cas de modification importante affectant le traitement des données des enfants, nous en informerons les parents par courriel ou par notification WhatsApp.
                  </p>
                </section>

                <section id="contact-us" className={styles.section}>
                  <span className={styles.sectionNum}>09 / contact</span>
                  <h2>9. Nous contacter</h2>
                  <p>
                    Si vous avez des questions, des commentaires ou des préoccupations concernant notre politique de confidentialité ou le traitement des données de votre enfant, veuillez contacter notre responsable de la protection des données :
                  </p>
                  <p style={{ fontWeight: 500 }}>
                    KiddyKode Safeguarding and Privacy Desk<br />
                    E-mail : <a href="mailto:safe@kiddykode.org" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>safe@kiddykode.org</a>
                  </p>
                </section>
              </>
            ) : (
              /* English Privacy Policy */
              <>
                <section id="safety-first" className={styles.section}>
                  <span className={styles.sectionNum}>01 / safety first</span>
                  <h2>1. Child Safety First</h2>
                  <p>
                    KiddyKode was founded on the principle of providing a safe, educational, and inspiring place for children to learn and build. The protection of children's privacy under the age of 18 is central to our design, technology, and operations.
                  </p>
                  <p>
                    We never ask children to submit their own direct personal contact information, such as an email address or mobile phone number, to participate in KiddyKode classes or sign up for KiddyKode Studio.
                  </p>
                </section>

                <section id="collection" className={styles.section}>
                  <span className={styles.sectionNum}>02 / collection</span>
                  <h2>2. Information We Collect</h2>
                  <p>
                    We collect only the minimum necessary information to register learners, manage student progression, and communicate with parents or guardians:
                  </p>
                  <ul>
                    <li><strong>Parent / Guardian Information:</strong> Full name, email address, phone number (used for WhatsApp class reminders and billing status), and payment processing details where applicable.</li>
                    <li><strong>Student Information:</strong> First name or nickname, age range, projects created and saved in KiddyKode Studio, and coding progress logs. We advise against using a child's full surname when naming their Studio profile.</li>
                    <li><strong>Usage Data:</strong> IP address, device details, and log interactions with the KiddyKode Studio interface. This is essential to diagnose programming bugs and track user experience metrics.</li>
                  </ul>
                </section>

                <section id="usage" className={styles.section}>
                  <span className={styles.sectionNum}>03 / usage</span>
                  <h2>3. How We Use Collected Data</h2>
                  <p>
                    We use the information we collect to operate, maintain, and support our education programs:
                  </p>
                  <ul>
                    <li>Deliver KiddyKode classes, cohort scheduling, and camp events.</li>
                    <li>Support project hosting, testing, and previewing inside KiddyKode Studio.</li>
                    <li>Dispatch service alerts to parents (e.g., notification of upcoming class times or payment confirmations) via email and automated WhatsApp alerts.</li>
                    <li>Anonymously evaluate teaching effectiveness and learner progression statistics.</li>
                  </ul>
                </section>

                <section id="security" className={styles.section}>
                  <span className={styles.sectionNum}>04 / security</span>
                  <h2>4. Data Storage and Security</h2>
                  <p>
                    KiddyKode databases are securely managed and hosted with professional cloud providers (e.g., Supabase). We apply industrial-grade security controls, including SSL encryption in transit, strict Row-Level Security (RLS) tables, and limited, credential-checked access for authorized administrative personnel.
                  </p>
                  <p>
                    We retain student and parent records for as long as accounts remain active, or until a parent requests deletion.
                  </p>
                </section>

                <section id="third-parties" className={styles.section}>
                  <span className={styles.sectionNum}>05 / third-parties</span>
                  <h2>5. Third-Party Services</h2>
                  <p>
                    We share specific operational tasks with third-party service providers who help us deliver our portal features:
                  </p>
                  <ul>
                    <li><strong>Supabase:</strong> Secure cloud storage, data indexing, and user authentication infrastructure.</li>
                    <li><strong>Nodemailer / SMTP servers:</strong> Handling email dispatches and signups.</li>
                    <li><strong>open-wa (hosted on Render):</strong> Executing scheduled class alerts and automatic WhatsApp chat reminders.</li>
                  </ul>
                  <p>
                    These third parties are contractually bound to access and process data strictly under our instruction and are prohibited from utilizing personal data for separate marketing tasks.
                  </p>
                </section>

                <section id="rights" className={styles.section}>
                  <span className={styles.sectionNum}>06 / rights</span>
                  <h2>6. Parental Rights & Controls</h2>
                  <p>
                    As a parent or guardian, you have full control over the personal information of your child. You may at any time request to:
                  </p>
                  <ul>
                    <li>Review the specific personal records we have on file for you and your child.</li>
                    <li>Modify, correct, or update personal registration details.</li>
                    <li>Completely delete your child's Studio account and all enrollment logs.</li>
                    <li>Opt-out of automated notifications (including email updates and WhatsApp notifications).</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please email us directly at <a href="mailto:safe@kiddykode.org" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>safe@kiddykode.org</a>. We will process your request within 48 hours.
                  </p>
                </section>

                <section id="cookies" className={styles.section}>
                  <span className={styles.sectionNum}>07 / cookies</span>
                  <h2>7. Cookies and Technical Tracking</h2>
                  <p>
                    We use cookies to maintain basic session status (keeping users logged into KiddyKode Studio) and storing user preferences (such as EN/FR locale selection).
                  </p>
                  <p>
                    We do not deploy third-party advertising cookies or tracking scripts. You can adjust your browser settings to decline cookies, but please note that doing so will limit the core functions of the KiddyKode Studio editor.
                  </p>
                </section>

                <section id="changes" className={styles.section}>
                  <span className={styles.sectionNum}>08 / changes</span>
                  <h2>8. Policy Updates</h2>
                  <p>
                    We may update this Privacy Policy from time to time to comply with changes in legal requirements or program operations. If we make material modifications that affect child privacy or data handling, we will notify parents directly via email or our automated WhatsApp communication desk.
                  </p>
                </section>

                <section id="contact-us" className={styles.section}>
                  <span className={styles.sectionNum}>09 / contact</span>
                  <h2>9. Contact Us</h2>
                  <p>
                    If you have any questions, concerns, or requests regarding child privacy, data safety, or our safeguarding practices, please contact us:
                  </p>
                  <p style={{ fontWeight: 500 }}>
                    KiddyKode Safeguarding and Privacy Desk<br />
                    Email: <a href="mailto:safe@kiddykode.org" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>safe@kiddykode.org</a>
                  </p>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
