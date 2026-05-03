import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Compass, Mountain } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import collabImg from "@/assets/students-collab.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aksum Academy" },
      {
        name: "description",
        content:
          "Aksum Academy was built in Addis Ababa to give every Ethiopian student access to world-class learning, rooted in our heritage.",
      },
      { property: "og:title", content: "About — Aksum Academy" },
      {
        property: "og:description",
        content: "Built in Addis Ababa to bring world-class learning to every Ethiopian student.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Mountain, title: "Rooted in heritage", desc: "Inspired by Aksum, the cradle of Ethiopian scholarship and craft." },
  { icon: Heart, title: "Made with love", desc: "Lessons built carefully, in Amharic and English, for how our students actually learn." },
  { icon: Compass, title: "Future-facing", desc: "Equipping the next generation of Ethiopian engineers, doctors, scientists and leaders." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-16 lg:pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
            Our story
          </div>
          <h1 className="mt-4 font-display text-5xl lg:text-7xl font-medium leading-[1.05] text-balance text-foreground">
            We believe Ethiopia's brightest minds deserve <span className="italic" style={{ color: "var(--emerald)" }}>the world's best teaching.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            Aksum Academy was born in 2023 in Addis Ababa, from a simple frustration: too many
            brilliant Ethiopian students were being held back by limited access to quality
            instruction. We set out to change that — by building a learning home that feels
            premium, intimate, and unmistakably ours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-elegant aspect-[16/8]"
          >
            <img src={collabImg} alt="Ethiopian students learning together" loading="lazy" width={1280} height={1024} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground max-w-2xl text-balance">
            What we stand for.
          </h2>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl border border-border bg-card p-8"
                >
                  <div className="h-12 w-12 rounded-2xl bg-gradient-emerald flex items-center justify-center">
                    <Icon size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="rounded-3xl bg-secondary/60 border border-border p-10 lg:p-14">
            <div className="font-display text-2xl lg:text-3xl text-foreground leading-snug text-balance">
              "We dream of an Ethiopia where a student in Mekelle, Hawassa, or a small village in
              Wolayta has the same quality of teaching as a student in the best school in Addis."
            </div>
            <div className="mt-6 text-sm text-muted-foreground">— The Aksum Academy team</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
