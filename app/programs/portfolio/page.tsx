'use client'

import { useState } from "react";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { CtaStrip } from "../../components/CtaStrip";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import styles from "./portfolio.module.css";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "My First Calculator",
    description: "A Python CLI calculator that handles basic math operations including addition, subtraction, multiplication, and division.",
    format: "KiddyKode Live",
    cohort: "COHORT 01",
    learner: "Amara",
    age: 10,
    tags: ["Python", "Variables", "Math"],
    tone: "warm" as const,
  },
  {
    id: 2,
    title: "Animal Quiz Game",
    description: "An interactive terminal quiz about African wildlife, testing users on animal facts with score tracking.",
    format: "Studio",
    cohort: "SELF-PACED",
    learner: "Kofi",
    age: 12,
    tags: ["Python", "Conditions", "Loops"],
    tone: "cool" as const,
  },
  {
    id: 3,
    title: "Story Generator",
    description: "A fun script that generates random short stories by combining different user inputs and pre-defined story elements.",
    format: "Bootcamp",
    cohort: "SUMMER 2025",
    learner: "Naledi",
    age: 9,
    tags: ["Python", "Strings", "Input"],
    tone: "clay" as const,
  },
  {
    id: 4,
    title: "Temperature Converter",
    description: "A utility program that seamlessly converts temperatures between Celsius and Fahrenheit scales.",
    format: "KiddyKode Live",
    cohort: "COHORT 02",
    learner: "Dami",
    age: 11,
    tags: ["Python", "Functions", "Math"],
    tone: "sage" as const,
  },
  {
    id: 5,
    title: "Times Table Trainer",
    description: "A math practice game that challenges users with random multiplication questions and tracks their accuracy.",
    format: "School Clubs",
    cohort: "TERM 1",
    learner: "Zuri",
    age: 10,
    tags: ["Python", "Loops", "Random"],
    tone: "ink" as const,
  },
  {
    id: 6,
    title: "Password Generator",
    description: "Creates secure, random passwords based on user-defined length and character requirements.",
    format: "KiddyKode Live",
    cohort: "COHORT 02",
    learner: "Thandiwe",
    age: 13,
    tags: ["Python", "Modules", "Logic"],
    tone: "warm" as const,
  }
];

const filters = ["All", "KiddyKode Live", "Studio", "Bootcamp", "School Clubs"];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.format === activeFilter);

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Learning Formats", href: "/programs" },
          { label: "Portfolio", href: "/programs/portfolio" },
        ]}
        eyebrow="Learner Portfolio"
        title="Built by learners. Powered by curiosity."
        lede="Every KiddyKode session ends with a project. This is their gallery. Here, we showcase the tools, games, and ideas brought to life by children across our programs."
        metaItems={[
          { label: "Total Projects", value: "24+" },
          { label: "Age Range", value: "8–16" },
        ]}
      />

      <section className={styles.gallery} data-screen-label="Project Gallery">
        <div className="wrap">
          <SectionHead 
            eyebrow="01 / The Gallery"
            title="Explore what our learners are building."
          />
          
          <div className={styles.filters}>
            {filters.map(filter => (
              <button 
                key={filter}
                className={activeFilter === filter ? styles.active : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filteredProjects.map(project => (
              <div key={project.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <ImagePlaceholder tone={project.tone} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span>{project.format}</span>
                    <span className={styles.dot}></span>
                    <span>{project.cohort}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <div className={styles.author}>
                    {project.learner} <span>— Age {project.age}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.spotlight}>
        <div className="wrap">
          <div className="section-head mb-12">
            <span className="eyebrow text-[var(--color-accent-soft)]">02 / Voices</span>
          </div>
          <div className={styles.quoteGrid}>
            <div className={styles.quote}>
              <p>“I thought coding was just typing fast, but it’s actually like building a puzzle where you make the pieces yourself.”</p>
              <div className={styles.cite}>Amara, 10 · KiddyKode Live</div>
            </div>
            <div className={styles.quote}>
              <p>“When my program finally worked after debugging for an hour, it was the best feeling. I want to build a real app next.”</p>
              <div className={styles.cite}>Kofi, 12 · Studio Learner</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.skills}>
        <div className="wrap">
          <SectionHead 
            eyebrow="03 / Outcomes"
            title="What they learn while building."
            lede="These projects are not just code—they are evidence of structured thinking, problem-solving, and creative confidence."
          />
          <div className={styles.skillsGrid}>
            <div className={styles.skill}>
              <span className={styles.num}>01</span>
              <h4>Logical Thinking</h4>
              <p>Learners practice breaking down complex ideas into manageable, step-by-step instructions that a computer can understand.</p>
            </div>
            <div className={styles.skill}>
              <span className={styles.num}>02</span>
              <h4>Debugging</h4>
              <p>Errors are expected. Children learn resilience by testing their code, finding mistakes, and trying new approaches without frustration.</p>
            </div>
            <div className={styles.skill}>
              <span className={styles.num}>03</span>
              <h4>Creativity</h4>
              <p>Code is a blank canvas. Every project allows learners to inject their own stories, rules, and designs into the final product.</p>
            </div>
            <div className={styles.skill}>
              <span className={styles.num}>04</span>
              <h4>Presentation</h4>
              <p>Building is only half the task. Explaining how it works, what was hard, and what they learned builds crucial communication skills.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Next Steps"
        title="Want to see your child's project here?"
        buttons={[
          { label: "View Next Cohort", href: "/programs/next-cohort", variant: "primary" },
          { label: "Partner With Us", href: "/partners", variant: "ghost" },
        ]}
      />
    </>
  );
}
