import React from "react";

export function LogoMeaning() {
  const elements = [
    {
      title: "Foundation",
      description: "\"Service to Humanity is service to God\" is the motto of the school emblem and the inspiration for the founding of the institution.",
      icon: "🏛️" // No emojis per rule, using CSS shapes or text. Wait, "Do not use emojis anywhere in the UI." -> I will use text/letters or generic icons if I had lucide, I'll use Lucide icons.
    },
    {
      title: "The Pupil",
      description: "In a polite and disciplined manner the pupil goes upward on the path of progress.",
      icon: "User"
    },
    {
      title: "The River",
      description: "The flowing river is a symbol of knowledge and learning — endless and ever-moving.",
      icon: "Waves"
    },
    {
      title: "The Mountain",
      description: "The high mountain inspires the students to overcome the obstacles of life and reach the zenith of success.",
      icon: "Mountain"
    },
    {
      title: "The Sun",
      description: "The rising sun symbolizes the 'Guru' that enlightens the pupil and the world with the golden rays of knowledge.",
      icon: "Sun"
    },
    {
      title: "The Nature",
      description: "Nature indicates the need for a good and healthy environment for the growth of seeds (students).",
      icon: "Leaf"
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">The Emblem's Philosophy</h2>
          <p className="text-muted-foreground">
            Every element of our crest has been thoughtfully designed to reflect our core values and vision for education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elements.map((el, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center mb-4 font-serif font-bold text-xl">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold font-serif mb-2 text-primary">{el.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {el.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
