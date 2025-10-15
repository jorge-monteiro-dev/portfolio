<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

const name = ref("")
const email = ref("")
const message = ref("")
const success = ref(false)
const error = ref("")

async function submitForm() {
  success.value = false
  error.value = ""

  try {
    const res = await fetch("/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })

    const data = await res.json()

    if (data.success) {
      success.value = true
      name.value = ""
      email.value = ""
      message.value = ""
    } else {
      error.value = data.error || "Impossible d’envoyer le message."
    }
  } catch (e) {
    error.value = "Une erreur est survenue."
  }
}

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const skills = [
  "Nuxt 3","Vue.js","TypeScript","Tailwind CSS","JavaScript",
  "Node.js","PostgreSQL","MySQL","MongoDB","Figma","UX/UI","Suite Adobe","React","Git","PHP", "Medusa 2", "Laravel", "Next", "Jimdo", "Wordpress", "WebFlow",
]

const sections = [
  { id: "home", label: "Accueil" },
  { id: "profile", label: "Mon Profil" },
  { id: "works", label: "Mes Travaux" },
  { id: "contact", label: "Me Contacter" },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  navOpen.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up")
      })
    },
    { threshold: 0.2 }
  )
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
})


// 1) Données projets

type Project = {
  id: number
  title: string
  summary: string
  long?: string
  cover?: string
  stack?: string[]
  links?: { label: string; href: string }[]
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: "Pokédle",
    summary: "Un Wordle façon Pokémon réalisé en PHP.",
    long:
      "Ce projet universitaire m'a permis de réaliser un jeu de mon choix avec une consigne principale à respecter : Tout en PHP ! Ce travail allie mes compétences techniques et mon goût pour les expériences interactives avec ma passion pour les pokémons; le but : créer un jeu captivant et intuitif à l'atmosphère plaisante. Le jeu fonctionne comme un Wordle, où chaque joueur doit deviner un Pokémon à partir de ses caractéristiques.",
    stack: ["PHP", "Architecture MVC", "MySQL", "HTML/CSS", "JavaScript"],
    cover: "/img/Pokedle.png",
    links: [{ label: "Découvrir le Jeu", href: "https://portfoliojorgemonteiro.fr/pokedle4g/index.php" }]
  },
  {
    id: 2,
    title: "Cheers Location",
    summary: "Refonte d'un site e-commerce en Medusa 2 et Nuxt 3.",
    long:
      "Dans le cadre de mon stage de deuxième année, j'ai été amené à travailler sur la refonte du site de Cheers Location, location de mobilier pour vos évènements. (N'hésitez pas à y faire un tour !) J'ai d'abord réalisé un rebrand de la marque, suivi des maquettes du site que j'ai ensuite codé avec deux framework : Medusa et Nuxt. Deux mois n'ont pas suffit pour rebrander la marque et terminer le site, néanmoins vous pouvez y trouver une première version ci-dessous.",
    stack: ["Nuxt 3", "Medusa 2", "TailwindCSS", "TypeScript", "Vue", "PostgreSQL", "Figma"],
    cover: "/img/Cheers-Location.png",
    links: [{ label: "Première Version", href: "/Cheers-Location" }]
  },
  {
    id: 3,
    title: "VDD",
    summary: "Un projet qui mixe OpenData, consommation et visualisation. ",
    long:
      "Ce projet de visualisation de données est le premier où je manipule de l'OpenData, grâce au programme de l'association Latitudes qui vise à former les étudiants sur la data tout en répondant aux défis sociaux et environnementaux. Avec ce projet, j'ai appris à me servir d'un fichier CSV, en récupérer les données pertinentes via JavaScript et les transformer en graphique grâce à des Bibliothèques comme d3.js.",
    stack: ["Fichier CSV", "JavaScript", "d3.js", "HTML/CSS"],
    cover: "/img/VDD.png",
    links: [{ label: "Le Projet", href: "https://portfoliojorgemonteiro.fr/VDD/" }]
  },
  {
    id: 4,
    title: "Wavz",
    summary: "Maquette d'une plateforme de location, sons et lumières.",
    long:
      "Ce projet vient d'une idée d'un de mes amis, un petit projet d'entrepreunariat que l'on essaye de monter en place, alors j'ai réalisé cette maquette pour que l'on puisse avoir une idée de l'application et du développement de celle-ci. Travail sur un parcours utilisateur simple et efficace avec des animations fuident qui rendent la navigation attirante.",
    stack: ["UX/UI", "Test Utilisateurs", "Figma", "Prototypage"],
    cover: "/img/Wavz.png",
    links: [{ label: "Voir le prototype", href: "https://www.figma.com/proto/WhBowACKbKeKCsUQQ4Ae7m/Wavz---Location-de-mat%C3%A9riel-Audiovisuel?node-id=4-2&starting-point-node-id=4%3A2" }]
  },
  {
    id: 5,
    title: "PasseTonBillet",
    summary: "Création d'une nouvelle fonctionnalité : Le Billet Mystère.",
    long:
      "En collaboration avec d’autres étudiants, nous avons repensé l’expérience utilisateur de la plateforme PasseTonBillet en ajoutant une nouvelle fonctionnalité : Le Billet Mystère. Le but de ce travail était d'implémenter une fonctionnalité dans un environnement déjà existant tout en gardant une bonne hiérarchie visuelle et la cohérence graphique. Ce travail m’a permis d’approfondir mes compétences en UX/UI et accessibilité.",
    stack: ["UX/UI", "Design System", "Figma", "Prototypage", "Accessibilité"],
    cover: "/img/Passetonbillet.png",
    links: [{ label: "Voir le fichier Figma", href: "https://www.figma.com/design/L4Ka1jcM3DUJgCDmtWaAog/PassetonBillet-?node-id=0-1&t=jM04bQxf0ZrsO2eM-1" }]
  },
  {
    id: 6,
    title: "Affiche Festival",
    summary: 'Une commande du Festival "Les Vers Solidaires" en 2024 .',
    long:
      "Ce projet graphique a été l’occasion d’expérimenter autour de la composition d'une affiche, du travail de la typographie, des couleurs, du mouvement et des contrastes. L’objectif : créer une affiche moderne tout en respectant le cahier des charges du festival",
    stack: ["Graphisme", "Illustrator"],
    cover: "/img/affiche.png",
    links: [{ label: "Voir l’affiche", href: "/img/Affiche-Les-Vers-Solidaires-Jorge-Monteiro.pdf" }]
  }
])


// 2) État & logique de la modale

const showModal = ref(false)
const selectedProject = ref<Project | null>(null)
const modalRef = ref<HTMLElement | null>(null)

function openProject(p: Project) {
  selectedProject.value = p
  showModal.value = true
  // Empêche le scroll en arrière-plan
  document.documentElement.style.overflow = "hidden"
  nextTick(() => {
    // focus le conteneur pour Échap (accessibilité)
    modalRef.value?.focus()
  })
}

function closeModal() {
  showModal.value = false
  selectedProject.value = null
  document.documentElement.style.overflow = "" // restaure
}

function onKeydown(e: KeyboardEvent) {
  if (!showModal.value) return
  if (e.key === "Escape") closeModal()
}

onMounted(() => window.addEventListener("keydown", onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
  document.documentElement.style.overflow = ""
})
</script>

<template>
  <div class="font-sans bg-[#ECF7FF] text-[#344995] min-h-screen">
    <!-- Navigation -->
<nav class="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-md shadow-sm z-50">
  <!-- 👇 mobile: burger à droite | desktop: contenu centré -->
  <div class="max-w-7xl mx-auto flex items-center justify-end md:justify-center px-4 sm:px-6 lg:px-8 py-3">

    <!-- Desktop menu -->
    <div class="hidden md:flex items-center p-2 gap-8">
      <button
        v-for="s in sections"
        :key="s.id"
        class="hover:text-[#A43838] transition-colors font-poppins"
        @click="scrollTo(s.id)"
      >
        {{ s.label }}
      </button>
    </div>

    <!-- Mobile burger -->
    <button
      class="relative md:hidden w-10 h-10 grid place-items-center p-2 rounded-lg hover:bg-[#ECF7FF] focus:outline-none focus:ring-2 focus:ring-[#344995]"
      :aria-expanded="navOpen"
      aria-controls="mobile-nav"
      @click="toggleNav"
    >
      <span class="sr-only">Ouvrir le menu</span>
      <!-- Conteneur des 3 barres -->
      <div class="relative w-6 h-4">
        <!-- barre 1 -->
        <span
          class="absolute block h-0.5 w-6 bg-[#344995] transition-all duration-300 ease-in-out"
          :class="navOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 translate-y-0 rotate-0'"
        ></span>
        <!-- barre 2 -->
        <span
          class="absolute block h-0.5 w-6 bg-[#344995] transition-all duration-300 ease-in-out"
          :class="navOpen ? 'top-1/2 -translate-y-1/2 opacity-0' : 'top-1/2 -translate-y-1/2 opacity-100'"
        ></span>
        <!-- barre 3 -->
        <span
          class="absolute block h-0.5 w-6 bg-[#344995] transition-all duration-300 ease-in-out"
          :class="navOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 translate-y-0 rotate-0'"
        ></span>
      </div>
    </button>
  </div>

  <!-- Mobile dropdown -->
  <div
    id="mobile-nav"
    v-show="navOpen"
    class="md:hidden border-t border-[#344995]/10 bg-white/80 backdrop-blur-md"
  >
    <div class="px-4 py-2 flex flex-col">
      <button
        v-for="s in sections"
        :key="s.id + '-m'"
        class="py-3 text-left font-poppins hover:text-[#A43838]"
        @click="scrollTo(s.id)"
      >
        {{ s.label }}
      </button>
    </div>
  </div>
</nav>


    <!-- Accueil -->
    <section
      id="home"
      class="relative min-h-[80vh] lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-4 sm:px-6 lg:px-24 pt-24 lg:pt-0 scroll-mt-28"
    >
      <!-- Fond code qui défile (droite) -->
      <div
        class="hidden lg:block absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none overflow-hidden"
      >
        <div class="code-bg animate-scroll">
          <pre>
function helloWorld() {
  console.log("Bienvenue sur mon Portfolio !");
}

const skills = ["PHP", "JavaScript", "Tailwind", "Vue", "UX/UI"];
for (const skill of skills) {
  console.log("#", skill);
}
          </pre>
          <pre>
class Developer {
  constructor(name) {
    this.name = "Jorge";
  }
  passion() {
    return "Créer des expériences agréables";
  }
}
          </pre>
          <pre>
let projets = ["Pokédle", "Cheers Location", "VDD"];
projets.map(p => console.log("Projet:", p));
          </pre>
          <pre>
function helloWorld() {
  console.log("Bienvenue sur mon Portfolio !");
}

const skills = ["PHP", "JavaScript", "Tailwind", "Vue", "UX/UI"];
for (const skill of skills) {
  console.log("#", skill);
}
          </pre>
          <pre>
class Developer {
  constructor(name) {
    this.name = "Jorge";
  }
  passion() {
    return "Créer des expériences agréables";
  }
}
          </pre>
        </div>
      </div>

      <!-- Contenu gauche -->
      <div class="flex flex-col items-start relative z-10 max-w-2xl text-center lg:text-left">
        <h1 class="title mb-6 relative inline-block underline-line animate-underline">
          Le Portfolio de Jorge
        </h1>
        <p class="text-base font-poppins bg-white/60 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md reveal">
          Étudiant en 2e année du BUT Métiers du Multimédia et de l’Internet spécialisé en Développement Web et Dispositifs Interactifs, je suis à la recherche d’une alternance pour la 3e année de mon cursus, à partir de septembre 2025. N'hésitez pas à naviguer sur mon Portfolio pour découvrir qui je suis et quels sont mes projets.
        </p>
      </div>
    </section>

        <!-- Mon profil -->
    <section id="profile" class="py-20 sm:py-24 px-4 sm:px-6 lg:px-24 bg-[#FFFFFF] scroll-mt-28">
      <div class="max-w-7xl mx-auto">
        <h1 class="title profile-title mb-6 relative inline-block underline-line animate-underline">
          Mon Profil
        </h1>

        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          <!-- Colonne gauche : Texte -->
          <div class="reveal">
            <div class="bg-white/60 backdrop-blur-md p-8 sm:p-5 rounded-xl shadow-md font-poppins text-[15px] leading-relaxed space-y-3">
              <h3 class="kicker text-[#344995]">Une histoire de virages</h3>
              <p>
                Mon parcours a toujours suivi mes passions et chaque étape fut un tournant.
                Du dessin au lycée Maximilien Vox — où je visais le métier de graphiste — au cinéma en terminale,
                j’ai exploré plusieurs univers qui m'ont finalement conduit à l’IUT de Bobigny et à la découverte du développement web, qui fut un déclic dès la première seconde où j’ai transformé des lignes de code en une interface.
                Ce mélange création + web a décidé pour moi : je souhaite devenir développeur web.
              </p>

              <h3 class="kicker text-[#344995]">Aujourd’hui et demain</h3>
              <p>
                Aujourd’hui, je conçois des projets qui me ressemblent, mêlant esthétisme, ergonomie et réflexion.
                Ce portfolio en est le reflet : un espace où l'utile et l'agréable s’expriment et ne font qu'un.
                Alors, bonne visite !
              </p>
            </div>
          </div>

          <!-- Colonne droite : Carousel + Boutons + Lignes -->
          <div class="reveal flex flex-col h-full">
            <!-- Carousel compétences (double-marquee) -->
            <div class="skills-wrap bg-white/60 backdrop-blur-md rounded-xl shadow-md p-4 sm:p-5">
              <div class="marquee">
                <ul class="marquee-track">
                  <li v-for="s in skills" :key="'a-'+s" class="skill-pill">{{ s }}</li>
                </ul>
                <ul class="marquee-track" aria-hidden="true">
                  <li v-for="s in skills" :key="'a2-'+s" class="skill-pill">{{ s }}</li>
                </ul>
              </div>
              <div class="marquee marquee--reverse mt-3">
                <ul class="marquee-track">
                  <li v-for="s in skills" :key="'b-'+s" class="skill-pill">{{ s }}</li>
                </ul>
                <ul class="marquee-track" aria-hidden="true">
                  <li v-for="s in skills" :key="'b2-'+s" class="skill-pill">{{ s }}</li>
                </ul>
              </div>
            </div>

            <!-- Boutons -->
            <div class="flex flex-wrap gap-3 mt-6">
              <a
                href="/CV-JorgeMonteiro-Alternance-Dev.pdf"
                target="_blank"
                rel="noopener"
                class="px-5 py-2.5 rounded-xl bg-[#A43838] text-white hover:translate-y-[-2px] transition-transform"
              >
                Accéder à mon CV
              </a>
              <a
                href="https://www.linkedin.com/in/jorge-monteiro-11a57a305/"
                target="_blank"
                rel="noopener"
                class="px-5 py-2.5 rounded-xl bg-[#A43838] text-white hover:translate-y-[-2px] transition-transform"
              >
                LinkedIn
              </a>
            </div>

            <!-- Lignes animées -->
            <div class="relative mt-10 h-32 sm:h-48 w-full overflow-hidden">
              <div class="absolute bottom-2 right-16 w-40 sm:w-56 h-1.5 bg-[#344995]/30 animate-line-move"></div>
              <div class="absolute bottom-10 right-12 w-40 sm:w-56 h-1.5 bg-[#344995]/30 animate-line-move delay-200"></div>
              <div class="absolute bottom-20 right-8 w-40 sm:w-56 h-1.5 bg-[#344995]/30 animate-line-move delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Travaux -->
    <section id="works" class="py-20 sm:py-24 px-4 sm:px-6 lg:px-24 scroll-mt-28">
      <div class="max-w-7xl mx-auto">
        <h1 class="subtitle mb-6 relative text-[#344995] inline-block underline-line-right animate-underline">
          Mes Travaux
        </h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg reveal">
          <button
            v-for="p in projects"
            :key="p.id"
            type="button"
            class="card-work bg-[#ECF7FF]/60 backdrop-blur-md rounded-xl shadow relative overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#344995] min-h-[240px] sm:min-h-[300px] p-4 sm:p-6 flex flex-col"
            @click="openProject(p)"
            aria-haspopup="dialog"
            :aria-label="`Ouvrir le projet ${p.title}`"
          >
            <!-- Image preview -->
            <img
              v-if="p.cover"
              :src="p.cover"
              :alt="`Image du projet ${p.title}`"
              class="w-full h-40 sm:h-32 object-cover rounded-lg mb-4"
              loading="lazy"
            />

            <h3 class="subsubtitle mt-2 mb-2 leading-tight">{{ p.title }}</h3>
            <p class="text-sm font-poppins text-[#344995]">
              {{ p.summary }}
            </p>
          </button>
        </div>
      </div>
    </section>

    <!-- ======= MODALE PROJET ======= -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
          @click.self="closeModal"
          aria-hidden="false"
        >
          <transition name="scale">
            <div
              v-if="selectedProject"
              ref="modalRef"
              role="dialog"
              aria-modal="true"
              :aria-label="`Détails du projet ${selectedProject.title}`"
              tabindex="-1"
              class="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 outline-none"
            >
              <div class="flex items-start justify-between gap-4">
                <h2 class="font-questrial text-2xl sm:text-3xl text-[#344995]">{{ selectedProject.title }}</h2>
                <button
                  type="button"
                  class="p-2 rounded-xl hover:bg-[#ECF7FF] focus:outline-none focus:ring-2 focus:ring-[#344995]"
                  @click="closeModal"
                  aria-label="Fermer la fenêtre"
                >
                  ✕
                </button>
              </div>

              <div class="mt-4 font-poppins text-[#344995] space-y-4">
                <p v-if="selectedProject.long">{{ selectedProject.long }}</p>

                <div v-if="selectedProject.stack?.length" class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.stack"
                    :key="tech"
                    class="px-2.5 py-1 rounded-full border border-[#344995]/30 text-sm"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div v-if="selectedProject.links?.length" class="flex flex-wrap gap-3 pt-2">
                  <a
                    v-for="lnk in selectedProject.links"
                    :key="lnk.href"
                    class="px-4 py-2 rounded-xl bg-[#A43838] text-white hover:translate-y-[-2px] transition-transform"
                    :href="lnk.href"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ lnk.label }}
                  </a>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </Teleport>

    <!-- Contact -->
    <section id="contact" class="py-20 sm:py-24 px-4 sm:px-6 lg:px-24 bg-[#FFFFFF] scroll-mt-28">
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        <h1 class="subtitle mb-6 relative text-[#344995] inline-block underline-line-right animate-underline text-center">
          Contactez-moi !
        </h1>
        <form @submit.prevent="submitForm" class="w-full max-w-md bg-[#ECF7FF]/60 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg reveal">
          <input v-model="name" type="text" placeholder="Votre nom" class="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#344995]" required />
          <input v-model="email" type="email" placeholder="Votre email" class="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#344995]" required />
          <textarea v-model="message" placeholder="Votre message" class="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#344995]" required></textarea>
          <button type="submit" class="w-full sm:w-auto bg-[#A43838] text-white px-6 py-3 rounded-xl hover:translate-y-[-2px] transition-transform">
            Envoyer
          </button>

          <p v-if="success" class="mt-3 text-[#344995] font-semibold">Votre message a bien été envoyé.</p>
          <p v-if="error" class="mt-3 text-[#A43838] font-semibold">{{ error }}</p>
        </form>
      </div>
    </section>

    <footer class="bg-[#344995] text-white py-10 px-4 sm:px-6 lg:px-24 mt-10">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        <!-- Colonne 1 -->
        <div>
          <h2 class="font-questrial text-2xl mb-3">Jorge Monteiro</h2>
          <p class="font-poppins text-sm leading-relaxed opacity-90">
            Développeur Web passionné par le numérique, un numérique agréable où l'on s'y sent bien.
          </p>
        </div>

        <!-- Colonne 2 -->
        <nav class="flex flex-col space-y-2">
          <h3 class="font-questrial text-lg mb-2">Navigation</h3>
          <button
            v-for="s in sections"
            :key="s.id + '-f'"
            class="text-sm font-poppins hover:text-[#A43838] transition-colors text-left"
            @click="scrollTo(s.id)"
          >
            {{ s.label }}
          </button>
        </nav>

        <!-- Colonne 3 -->
        <div>
          <h3 class="font-questrial text-lg mb-2">Retrouvez-moi</h3>
          <div class="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/jorge-monteiro-11a57a305/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              class="hover:text-[#A43838] transition-colors"
            >
              <i class="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="mailto:it.jorgemonteiro@gmail.com"
              aria-label="Email"
              class="hover:text-[#A43838] transition-colors"
            >
              <i class="fas fa-envelope text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Bas -->
      <div class="mt-10 pt-6 border-t border-white/20 text-center text-sm font-poppins opacity-80">
        © {{ new Date().getFullYear() }} - Jorge Monteiro. Tous droits réservés.
      </div>
    </footer>
  </div>
</template>

<style>
/* Polices */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&family=Questrial&display=swap");

.font-poppins { font-family: "Poppins", sans-serif; }

.title {
  font-family: "Questrial", sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  color: #a43838;
}
.subtitle {
  font-family: "Questrial", sans-serif;
  font-size: clamp(1.75rem, 5.2vw, 4rem);
  color: #344995;
}

.subsubtitle {
  font-family: "Questrial", sans-serif;
  font-size: clamp(1.125rem, 3.2vw, 2rem);
  color: #344995;
}

/* Révélations au scroll */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 1s ease, transform 1s ease; }
.animate-fade-in-up { opacity: 1 !important; transform: translateY(0) !important; }

/* Soulignés animés */
.underline-line::after,
.underline-line-right::after {
  content: "";
  position: absolute;
  bottom: -8px;
  height: 5px;
  background-color: currentColor;
  animation: underlineAnim 4s infinite;
}
.underline-line::after { left: 0; }
.underline-line-right::after { right: 0; }

/* Cards travaux */
.card-work { transition: box-shadow 0.4s ease, transform 0.4s ease; }
.card-work:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(52, 73, 149, 0.2); }

/* Effet brillance */
.card-work::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -75%;
  width: 50%;
  height: 200%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  transform: rotate(25deg);
}
.card-work:hover::after { animation: shine 1s forwards; }

.card-work img { transition: transform 0.4s ease; }
.card-work:hover img { transform: scale(1.03); }

/* Fond code qui défile (section accueil) */
.code-bg {
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5rem;
  color: #344995;
  white-space: pre;
}
.animate-scroll { display: flex; flex-direction: column; animation: scrollCode 25s linear infinite; }
@keyframes scrollCode { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }

/* Carousel compétences */
.skills-wrap { overflow: hidden; }
.marquee {
  display: flex; gap: 1.5rem; overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
}
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-track { display: flex; gap: 0.6rem; min-width: max-content; animation: scrollLeft 18s linear infinite; }
.marquee--reverse .marquee-track { animation: scrollRight 22s linear infinite; }

.skill-pill {
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid #344995;
  color: #344995;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  white-space: nowrap;
}

@keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes scrollRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }

/* Lignes animées */
@keyframes lineMove {
  0% { transform: translateX(0); opacity: 0.2; }
  50% { transform: translateX(100px); opacity: 1; }
  100% { transform: translateX(0); opacity: 0.2; }
}
.animate-line-move { animation: lineMove 6s ease-in-out infinite; will-change: transform, opacity; }

/* Autres anims */
@keyframes shine { 100% { left: 125%; } }
@keyframes underlineAnim {
  0% { width: 0; opacity: 0; }
  20% { width: 120%; opacity: 1; }
  50% { width: 120%; opacity: 1; }
  70% { width: 0; opacity: 0; }
  100% { width: 0; opacity: 0; }
}

/* Titre section profil responsive */
.profile-title { font-size: clamp(2rem, 4vw, 3rem); }

/* Intertitre */
.kicker { font-family: "Questrial", sans-serif; font-size: 0.95rem; letter-spacing: 0.02em; margin-bottom: 0.25rem; }

/* Transitions modale */
.fade-enter-active, .fade-leave-active { transition: opacity 200ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: transform 180ms ease, opacity 180ms ease; }
.scale-enter-from, .scale-leave-to { transform: scale(0.98); opacity: 0; }

.font-questrial { font-family: "Questrial", sans-serif; }

#home, #works, #profile, #contact { scroll-margin-top: 88px; }
@media (min-width: 768px) {
  #home, #works, #profile, #contact { scroll-margin-top: 96px; }
}
</style>
