'use client'

import { useState } from "react";
import { PageHero } from "../../../components/PageHero";
import { SectionHead } from "../../../components/SectionHead";
import { CtaStrip } from "../../../components/CtaStrip";
import { ImagePlaceholder } from "../../../components/ImagePlaceholder";
import styles from "./portfolio.module.css";
import { Link } from '@/i18n/navigation';

import projectsData from "./projects.json";

interface Project {
  id: number;
  title: string;
  description: string;
  format: string;
  cohort: string;
  learner: string;
  age: number;
  tags: string[];
  tone: "warm" | "cool" | "clay" | "sage" | "ink";
}

const projects = projectsData as Project[];

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
