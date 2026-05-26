import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import styles from "./terms.module.css";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr ? "Conditions d'utilisation — KiddyKode" : "Terms of Service — KiddyKode",
    description: isFr
      ? "Consultez les conditions d'utilisation de KiddyKode, applicables à nos programmes, clubs scolaires et au KiddyKode Studio."
      : "Read the Terms of Service for KiddyKode, covering our programs, school clubs, and KiddyKode Studio.",
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  // Localized navigation items
  const sections = isFr
    ? [
        { id: "acceptance", num: "01", title: "Acceptation des conditions" },
        { id: "services", num: "02", title: "Description des services" },
        { id: "guardians", num: "03", title: "Responsabilité des parents" },
        { id: "accounts", num: "04", title: "Sécurité des comptes" },
        { id: "ip", num: "05", title: "Propriété intellectuelle" },
        { id: "conduct", num: "06", title: "Code de conduite" },
        { id: "fees", num: "07", title: "Frais et remboursements" },
        { id: "liability", num: "08", title: "Limitation de responsabilité" },
        { id: "governing-law", num: "09", title: "Loi applicable" },
      ]
    : [
        { id: "acceptance", num: "01", title: "Acceptation of Terms" },
        { id: "services", num: "02", title: "Description of Services" },
        { id: "guardians", num: "03", title: "Parental Responsibility" },
        { id: "accounts", num: "04", title: "Account & Child Security" },
        { id: "ip", num: "05", title: "Intellectual Property" },
        { id: "conduct", num: "06", title: "Student Code of Conduct" },
        { id: "fees", num: "07", title: "Fees & Refunds" },
        { id: "liability", num: "08", title: "Limitation of Liability" },
        { id: "governing-law", num: "09", title: "Governing Law" },
      ];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: isFr ? "Accueil" : "Home", href: "/" },
          { label: isFr ? "Conditions d'utilisation" : "Terms of Service", href: "/terms" },
        ]}
        eyebrow={isFr ? "ASPECTS LÉGAUX" : "LEGAL"}
        title={isFr ? "Conditions d'utilisation." : "Terms of Service."}
        lede={
          isFr
            ? "Veuillez lire attentivement ces conditions avant d'utiliser le portail KiddyKode, le Studio KiddyKode ou d'inscrire un enfant à nos programmes."
            : "Please read these terms carefully before using the KiddyKode portal, KiddyKode Studio, or enrolling a child in our programs."
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
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                {isFr ? "Note importante pour les parents" : "Important Note for Parents"}
              </h3>
              <p>
                {isFr
                  ? "KiddyKode est conçu pour les enfants âgés de 8 à 17 ans. Les comptes d'élèves et les inscriptions à nos cours en ligne ou ateliers nécessitent le consentement exprès d'un parent ou d'un tuteur légal. En autorisant votre enfant à utiliser nos services, vous acceptez d'être lié par ces conditions."
                  : "KiddyKode is designed for children aged 8 to 17. Student accounts and program registrations require the express consent of a parent or legal guardian. By allowing your child to use our services, you agree to be bound by these terms."}
              </p>
            </div>

            {isFr ? (
              /* French Legal Sections */
              <>
                <section id="acceptance" className={styles.section}>
                  <span className={styles.sectionNum}>01 / acceptation</span>
                  <h2>1. Acceptation des conditions</h2>
                  <p>
                    En accédant ou en utilisant les services de KiddyKode (y compris notre site web, les formulaires d'inscription, le Studio KiddyKode et nos cours), vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                  </p>
                  <p>
                    Ces conditions s'appliquent à tous les visiteurs, utilisateurs, parents, tuteurs et élèves qui accèdent ou utilisent nos services.
                  </p>
                </section>

                <section id="services" className={styles.section}>
                  <span className={styles.sectionNum}>02 / description</span>
                  <h2>2. Description des services</h2>
                  <p>
                    KiddyKode fournit des services d'éducation au codage et à la création numérique pour les enfants et adolescents. Nos services comprennent :
                  </p>
                  <ul>
                    <li><strong>Clubs scolaires KiddyKode :</strong> Sessions de codage structurées menées au sein des écoles partenaires.</li>
                    <li><strong>KiddyKode Live :</strong> Sessions d'apprentissage en ligne basées sur des cohortes et animées par nos facilitateurs.</li>
                    <li><strong>Studio KiddyKode :</strong> Une plateforme d'apprentissage en ligne autonome où les élèves construisent et testent leurs propres applications et jeux.</li>
                    <li><strong>Bootcamps de vacances :</strong> Programmes d'apprentissage intensifs à court terme pendant les vacances scolaires.</li>
                  </ul>
                </section>

                <section id="guardians" className={styles.section}>
                  <span className={styles.sectionNum}>03 / tuteurs</span>
                  <h2>3. Consentement et responsabilité des parents</h2>
                  <p>
                    Les utilisateurs de moins de 18 ans doivent avoir l'autorisation expresse d'un parent ou d'un tuteur légal pour créer un compte ou s'inscrire à des programmes.
                  </p>
                  <p>
                    En tant que parent ou tuteur, vous assumez l'entière responsabilité de la supervision de l'activité en ligne de votre enfant sur le portail et le Studio KiddyKode. Vous acceptez d'assurer la sécurité des informations personnelles de votre enfant et de veiller à ce qu'il utilise le service de manière appropriée.
                  </p>
                </section>

                <section id="accounts" className={styles.section}>
                  <span className={styles.sectionNum}>04 / comptes</span>
                  <h2>4. Sécurité des comptes et des données</h2>
                  <p>
                    Pour accéder à certaines parties de notre site ou de notre Studio, un compte doit être créé. Vous vous engagez à :
                  </p>
                  <ul>
                    <li>Fournir des informations exactes, complètes et à jour.</li>
                    <li>Maintenir la confidentialité des identifiants et des mots de passe.</li>
                    <li>Ne pas utiliser de données d'identification nominatives trop précises comme nom d'utilisateur pour l'enfant (nous recommandons l'usage de pseudonymes ou de prénoms seuls).</li>
                    <li>Nous informer immédiatement de toute faille de sécurité ou utilisation non autorisée de votre compte à l'adresse <a href="mailto:safe@kiddykode.org" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>safe@kiddykode.org</a>.</li>
                  </ul>
                </section>

                <section id="ip" className={styles.section}>
                  <span className={styles.sectionNum}>05 / propriete</span>
                  <h2>5. Propriété intellectuelle et licence des projets</h2>
                  <p>
                    <strong>Matériel KiddyKode :</strong> Tous les éléments présents sur notre portail et notre Studio (le code source de la plateforme, les logos, les illustrations, le matériel pédagogique, les vidéos et les curriculums) sont la propriété exclusive de KiddyKode et de ses concédants de licence.
                  </p>
                  <p>
                    <strong>Créations des élèves :</strong> Les élèves conservent la pleine propriété intellectuelle des codes et projets qu'ils créent dans le Studio KiddyKode. Cependant, pour permettre le bon fonctionnement de la plateforme et célébrer les réussites de nos élèves, vous accordez à KiddyKode une licence mondiale, non exclusive et gratuite pour afficher, héberger, exécuter et partager les projets créés par votre enfant dans le cadre de galeries de projets, de démonstrations pédagogiques ou de rapports d'impact.
                  </p>
                </section>

                <section id="conduct" className={styles.section}>
                  <span className={styles.sectionNum}>06 / conduite</span>
                  <h2>6. Code de conduite des élèves</h2>
                  <p>
                    Nous voulons que KiddyKode soit un environnement sûr, créatif et respectueux. Tout utilisateur (élève ou parent) s'engage à respecter les règles suivantes :
                  </p>
                  <ul>
                    <li>Ne pas publier, partager ou envoyer de contenu harcelant, injurieux, inapproprié ou offensant.</li>
                    <li>Respecter les autres membres de la communauté, les mentors et les camarades de classe.</li>
                    <li>Ne pas tenter de contourner la sécurité de la plateforme, d'injecter des scripts malveillants ou de perturber le Studio.</li>
                    <li>Utiliser les outils pour créer et collaborer, et non pour tricher ou plagier de manière trompeuse.</li>
                  </ul>
                  <p>
                    KiddyKode se réserve le droit de suspendre ou de supprimer tout compte qui ne respecterait pas ce code de conduite.
                  </p>
                </section>

                <section id="fees" className={styles.section}>
                  <span className={styles.sectionNum}>07 / frais</span>
                  <h2>7. Frais de scolarité, paiements et remboursements</h2>
                  <p>
                    Certains de nos cours (comme KiddyKode Live ou les Bootcamps de vacances) nécessitent le paiement de frais d'inscription ou de scolarité.
                  </p>
                  <p>
                    <strong>Modalités :</strong> Les paiements s'effectuent par les moyens autorisés lors de l'inscription (virement, carte ou paiement mobile). Les rappels de facturation et notifications de retard peuvent être envoyés par e-mail ou via WhatsApp.
                  </p>
                  <p>
                    <strong>Politique de remboursement :</strong> Les annulations demandées plus de 7 jours avant le début d'une cohorte ou d'un camp donnent droit à un remboursement complet. Passé ce délai, aucun remboursement ne sera effectué, mais un crédit d'apprentissage pourra être accordé pour une session ultérieure à la discrétion de KiddyKode.
                  </p>
                </section>

                <section id="liability" className={styles.section}>
                  <span className={styles.sectionNum}>08 / responsabilite</span>
                  <h2>8. Exclusion de garanties et limitation de responsabilité</h2>
                  <p>
                    Les services KiddyKode sont fournis « en l'état » et « selon disponibilité », sans garantie d'aucune sorte. Bien que nous fassions de notre mieux pour assurer un service ininterrompu et sécurisé, nous ne garantissons pas que la plateforme sera exempte d'erreurs ou accessible à tout moment.
                  </p>
                  <p>
                    Dans la mesure maximale permise par la loi applicable, KiddyKode ne pourra être tenu responsable des dommages indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'incapacité d'utiliser nos services.
                  </p>
                </section>

                <section id="governing-law" className={styles.section}>
                  <span className={styles.sectionNum}>09 / loi</span>
                  <h2>9. Loi applicable et résolution des litiges</h2>
                  <p>
                    Les présentes conditions sont régies et interprétées conformément aux lois en vigueur au Cameroun (pays de fondation) ainsi qu'aux législations nationales applicables dans les pays d'exploitation des chapitres locaux (Nigeria, Kenya, Afrique du Sud).
                  </p>
                  <p>
                    Tout différend découlant de l'exécution ou de l'interprétation de ces conditions fera l'objet d'une tentative de résolution amiable avant toute action judiciaire.
                  </p>
                </section>
              </>
            ) : (
              /* English Legal Sections */
              <>
                <section id="acceptance" className={styles.section}>
                  <span className={styles.sectionNum}>01 / acceptance</span>
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using KiddyKode's services (including our website, registration portals, KiddyKode Studio, and classes), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                  <p>
                    These terms apply to all visitors, users, parents, guardians, and students who access or use the service.
                  </p>
                </section>

                <section id="services" className={styles.section}>
                  <span className={styles.sectionNum}>02 / services</span>
                  <h2>2. Description of Services</h2>
                  <p>
                    KiddyKode provides coding and digital creation education services for children and teenagers. Our services include:
                  </p>
                  <ul>
                    <li><strong>School Clubs:</strong> Weekly coding sessions delivered directly in partner schools.</li>
                    <li><strong>KiddyKode Live:</strong> Online cohort-based lessons guided by live facilitators.</li>
                    <li><strong>KiddyKode Studio:</strong> A self-paced online platform where students construct, preview, and test their own applications and coding projects.</li>
                    <li><strong>Holiday Bootcamps:</strong> Concentrated short-term coding intensives held during school holidays.</li>
                  </ul>
                </section>

                <section id="guardians" className={styles.section}>
                  <span className={styles.sectionNum}>03 / guardians</span>
                  <h2>3. Consent and Parental Responsibility</h2>
                  <p>
                    Users under the age of 18 must obtain the permission of a parent or legal guardian to register for programs or set up account access.
                  </p>
                  <p>
                    As a parent or guardian, you assume full responsibility for supervising your child's online activity on the KiddyKode portal and Studio. You agree to ensure your child's personal data is entered safely and that they use the platform in an appropriate manner.
                  </p>
                </section>

                <section id="accounts" className={styles.section}>
                  <span className={styles.sectionNum}>04 / accounts</span>
                  <h2>4. Account Registration and Security</h2>
                  <p>
                    To access certain features of KiddyKode Studio or register for classes, an account must be created. You agree to:
                  </p>
                  <ul>
                    <li>Provide accurate, current, and complete information during registration.</li>
                    <li>Maintain the confidentiality of account credentials and passwords.</li>
                    <li>Ensure child accounts do not use full names as usernames (non-identifying nicknames are highly recommended).</li>
                    <li>Notify us immediately of any unauthorized account use or safety breaches at <a href="mailto:safe@kiddykode.org" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>safe@kiddykode.org</a>.</li>
                  </ul>
                </section>

                <section id="ip" className={styles.section}>
                  <span className={styles.sectionNum}>05 / intellectual property</span>
                  <h2>5. Intellectual Property & Project License</h2>
                  <p>
                    <strong>KiddyKode Materials:</strong> All elements on the KiddyKode site and Studio, including source code, design systems, lesson plans, educational material, graphics, video lectures, and brand assets, are the exclusive property of KiddyKode and its licensors.
                  </p>
                  <p>
                    <strong>Student Code & Creations:</strong> Students retain full ownership of the intellectual property of the programs, files, and applications they write inside KiddyKode Studio. However, to keep the platform working and celebrate student success, you grant KiddyKode a worldwide, non-exclusive, royalty-free license to host, display, run, and share projects created by your child for educational demonstrations, project showcases, or impact reporting.
                  </p>
                </section>

                <section id="conduct" className={styles.section}>
                  <span className={styles.sectionNum}>06 / conduct</span>
                  <h2>6. Student Code of Conduct</h2>
                  <p>
                    We want KiddyKode to be a safe, creative, and supportive space. Users (both parents and students) agree not to:
                  </p>
                  <ul>
                    <li>Publish, share, or submit content that is abusive, harassing, inappropriate, or offensive.</li>
                    <li>Harass or abuse other students, mentors, or staff members.</li>
                    <li>Attempt to disrupt the portal security, reverse engineer the platform, or inject malicious code into the Studio.</li>
                    <li>Use coding tools to cheat, plagiarize, or engage in deceptive academic behavior.</li>
                  </ul>
                  <p>
                    KiddyKode reserves the right to suspend or terminate accounts that violate this code of conduct.
                  </p>
                </section>

                <section id="fees" className={styles.section}>
                  <span className={styles.sectionNum}>07 / fees</span>
                  <h2>7. Tuition Fees, Billing, and Refunds</h2>
                  <p>
                    Certain programs (such as Creator Camps and Live online classes) require enrollment fees.
                  </p>
                  <p>
                    <strong>Billing:</strong> Fees must be paid via our official checkout channels before classes start. Automated payment alerts or reminders may be sent to parents' registered emails or phone numbers via SMS/WhatsApp.
                  </p>
                  <p>
                    <strong>Refund Policy:</strong> Cancellation requests submitted more than 7 days prior to the start of a cohort are eligible for a full refund. After that time, payments are non-refundable, but we may offer credit toward a future program at KiddyKode's sole discretion.
                  </p>
                </section>

                <section id="liability" className={styles.section}>
                  <span className={styles.sectionNum}>08 / liability</span>
                  <h2>8. Disclaimer of Warranties & Limitation of Liability</h2>
                  <p>
                    KiddyKode services are provided on an "as is" and "as available" basis without warranties of any kind. While we do our best to ensure a secure and reliable learning environment, we cannot guarantee the platform will be 100% uninterrupted, error-free, or free of data loss.
                  </p>
                  <p>
                    To the maximum extent permitted by law, KiddyKode will not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.
                  </p>
                </section>

                <section id="governing-law" className={styles.section}>
                  <span className={styles.sectionNum}>09 / governing law</span>
                  <h2>9. Governing Law & Dispute Resolution</h2>
                  <p>
                    These Terms of Service are governed by the laws of Cameroon (where the project was founded), alongside the national consumer protection and educational laws of the countries where local chapters operate (Nigeria, Kenya, South Africa).
                  </p>
                  <p>
                    Any dispute arising out of these terms will first be addressed through informal, amicable resolution efforts before resorting to formal legal avenues.
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
