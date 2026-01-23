<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue"
import { useHead } from "#imports"

/* -------------------------------------------------------------------------- */
/*                          🌐 SYSTÈME DE TRADUCTION                          */
/* -------------------------------------------------------------------------- */

type Locale = 'fr' | 'en' | 'ja'

const currentLocale = ref<Locale>('fr')
const langMenuOpen = ref(false)

// Stockage de la langue dans localStorage
onMounted(() => {
  const savedLocale = localStorage.getItem('portfolio-lang') as Locale
  if (savedLocale && ['fr', 'en', 'ja'].includes(savedLocale)) {
    currentLocale.value = savedLocale
  }
})

const changeLocale = (locale: Locale) => {
  currentLocale.value = locale
  localStorage.setItem('portfolio-lang', locale)
  langMenuOpen.value = false
}

// Dictionnaire de traductions
const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      profile: "Mon Profil",
      works: "Mes Travaux",
      contact: "Me Contacter"
    },
    // Section Accueil
    home: {
      title: "Jorge Monteiro",
      description: "Étudiant en 3e année du BUT Métiers du Multimédia et de l'Internet spécialisé en Développement Web et Dispositifs Interactifs, je suis à la recherche d'une alternance à partir de septembre 2025. N'hésitez pas à naviguer sur mon Portfolio pour découvrir qui je suis et quels sont mes projets."
    },
    // Section Profil
    profile: {
      title: "Mon Profil",
      subtitle1: "Une histoire de virages",
      text1: "Mon parcours a toujours suivi mes passions et chaque étape fut un tournant. Du dessin au lycée Maximilien Vox — où je visais le métier de graphiste — au cinéma en terminale, j'ai exploré plusieurs univers qui m'ont finalement conduit à l'IUT de Bobigny et à la découverte du développement web, qui fut un déclic dès la première seconde où j'ai transformé des lignes de code en une interface. Ce mélange création + web a décidé pour moi : je souhaite devenir développeur web.",
      subtitle2: "Aujourd'hui et demain",
      text2: "Aujourd'hui, je conçois des projets qui me ressemblent, mêlant esthétisme, ergonomie et réflexion. Ce portfolio en est le reflet : un espace où l'utile et l'agréable s'expriment et ne font qu'un. Alors, bonne visite !",
      cv: "Accéder à mon CV"
    },
    // Section Travaux
    works: {
      title: "Mes Travaux"
    },
    // Section Contact
    contact: {
      title: "Contactez-moi !",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      messagePlaceholder: "Votre message",
      submit: "Envoyer",
      success: "Votre message a bien été envoyé.",
      error: "Impossible d'envoyer le message."
    },
    // Footer
    footer: {
      description: "Développeur Web passionné par le numérique, un numérique agréable où l'on s'y sent bien.",
      navigation: "Navigation",
      social: "Retrouvez-moi",
      rights: "Tous droits réservés."
    }
  },
  en: {
    nav: {
      home: "Home",
      profile: "My Profile",
      works: "My Work",
      contact: "Contact Me"
    },
    home: {
      title: "Jorge Monteiro",
      description: "3rd year student in the BUT Multimedia and Internet Professions program, specialized in Web Development and Interactive Devices. I am looking for an apprenticeship starting September 2025. Feel free to browse my Portfolio to discover who I am and what my projects are."
    },
    profile: {
      title: "My Profile",
      subtitle1: "A story of turning points",
      text1: "My journey has always followed my passions, and each step was a turning point. From drawing at Maximilien Vox high school — where I aimed to become a graphic designer — to cinema in my final year, I explored several universes that eventually led me to IUT de Bobigny and the discovery of web development, which was a revelation from the first second I transformed lines of code into an interface. This blend of creation + web decided for me: I want to become a web developer.",
      subtitle2: "Today and tomorrow",
      text2: "Today, I design projects that resemble me, combining aesthetics, ergonomics, and reflection. This portfolio is a reflection of that: a space where utility and pleasure come together. So, enjoy your visit!",
      cv: "View my CV"
    },
    works: {
      title: "My Work"
    },
    contact: {
      title: "Contact Me!",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      submit: "Send",
      success: "Your message has been sent successfully.",
      error: "Unable to send the message."
    },
    footer: {
      description: "Web Developer passionate about digital, a pleasant digital where you feel good.",
      navigation: "Navigation",
      social: "Find me",
      rights: "All rights reserved."
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      profile: "プロフィール",
      works: "作品",
      contact: "お問い合わせ"
    },
    home: {
      title: "ジョルジュ・モンテイロ",
      description: "マルチメディアとインターネット職業学士課程3年生、ウェブ開発とインタラクティブデバイスを専攻しています。2025年9月からのインターンシップを探しています。私のポートフォリオをご覧いただき、私のプロジェクトをご確認ください。"
    },
    profile: {
      title: "プロフィール",
      subtitle1: "転機の物語",
      text1: "私の道のりは常に情熱に従い、各段階が転機となりました。マクシミリアン・ヴォックス高校でのデッサンからグラフィックデザイナーを目指し、最終学年では映画を学び、様々な世界を探求しました。そして最終的にボビニーのIUTでウェブ開発に出会い、コードを初めてインターフェースに変換した瞬間に啓示を受けました。この創造とウェブの融合が私の道を決めました：ウェブ開発者になりたいのです。",
      subtitle2: "今日と明日",
      text2: "今日、私は美学、人間工学、思考を組み合わせた、自分らしいプロジェクトを設計しています。このポートフォリオはその反映です：有用性と快適さが一つになる空間です。では、良い訪問を！",
      cv: "履歴書を見る"
    },
    works: {
      title: "作品"
    },
    contact: {
      title: "お問い合わせ",
      namePlaceholder: "お名前",
      emailPlaceholder: "メールアドレス",
      messagePlaceholder: "メッセージ",
      submit: "送信",
      success: "メッセージが正常に送信されました。",
      error: "メッセージの送信に失敗しました。"
    },
    footer: {
      description: "デジタルに情熱を注ぐウェブ開発者、心地よいデジタル空間。",
      navigation: "ナビゲーション",
      social: "SNS",
      rights: "全著作権所有。"
    }
  }
}

const t = computed(() => translations[currentLocale.value])

/* -------------------------------------------------------------------------- */
/*                             🔥 META + JSON-LD                              */
/* -------------------------------------------------------------------------- */

type Project = {
  id: number
  title: string
  summary: { fr: string; en: string; ja: string }
  long?: { fr: string; en: string; ja: string }
  cover?: string
  stack?: string[]
  links?: { label: { fr: string; en: string; ja: string }; href: string }[]
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: "Pokédle",
    summary: {
      fr: "Un Wordle façon Pokémon réalisé en PHP.",
      en: "A Pokémon-style Wordle made in PHP.",
      ja: "PHPで作成されたポケモン風Wordle。"
    },
    long: {
      fr: "Ce projet universitaire m'a permis de réaliser un jeu de mon choix avec une consigne principale à respecter : Tout en PHP ! Ce travail allie mes compétences techniques et mon goût pour les expériences interactives avec ma passion pour les pokémons; le but : créer un jeu captivant et intuitif à l'atmosphère plaisante. Le jeu fonctionne comme un Wordle, où chaque joueur doit deviner un Pokémon à partir de ses caractéristiques.",
      en: "This university project allowed me to create a game of my choice with one main constraint: All in PHP! This work combines my technical skills and taste for interactive experiences with my passion for Pokémon; the goal: to create a captivating and intuitive game with a pleasant atmosphere. The game works like Wordle, where each player must guess a Pokémon from its characteristics.",
      ja: "この大学プロジェクトでは、主要な制約が一つありました：すべてPHPで作成すること！この作品は、私の技術的スキルとインタラクティブ体験への興味、そしてポケモンへの情熱を組み合わせたものです。目標は、魅力的で直感的な、心地よい雰囲気のゲームを作ることでした。ゲームはWordleのように動作し、各プレイヤーは特徴からポケモンを推測します。"
    },
    stack: ["PHP", "Architecture MVC", "MySQL", "HTML/CSS", "JavaScript"],
    cover: "/img/Pokedle.png",
    links: [{
      label: { fr: "Découvrir le Jeu", en: "Discover the Game", ja: "ゲームを見る" },
      href: "https://portfoliojorgemonteiro.fr/pokedle4g/index.php"
    }]
  },
  {
    id: 2,
    title: "Cheers Location",
    summary: {
      fr: "Refonte d'un site e-commerce en Medusa 2 et Nuxt 3.",
      en: "E-commerce site redesign with Medusa 2 and Nuxt 3.",
      ja: "Medusa 2とNuxt 3でのEコマースサイトのリニューアル。"
    },
    long: {
      fr: "Dans le cadre de mon stage de deuxième année, j'ai été amené à travailler sur la refonte du site de Cheers Location, location de mobilier pour vos évènements. (N'hésitez pas à y faire un tour !) J'ai d'abord réalisé un rebrand de la marque, suivi des maquettes du site que j'ai ensuite codé avec deux framework : Medusa et Nuxt. Deux mois n'ont pas suffit pour rebrander la marque et terminer le site, néanmoins vous pouvez y trouver une première version ci-dessous.",
      en: "As part of my second-year internship, I worked on redesigning the Cheers Location website, furniture rental for your events. (Feel free to check it out!) I first rebranded the brand, followed by site mockups that I then coded with two frameworks: Medusa and Nuxt. Two months were not enough to rebrand and complete the site, but you can find a first version below.",
      ja: "2年目のインターンシップの一環として、イベント用家具レンタルのCheers Locationのウェブサイトのリニューアルに取り組みました。まずブランドのリブランディングを行い、その後MedusaとNuxtの2つのフレームワークでサイトのモックアップをコーディングしました。2ヶ月ではリブランディングとサイトの完成には不十分でしたが、以下に最初のバージョンをご覧いただけます。"
    },
    stack: ["Nuxt 3", "Medusa 2", "TailwindCSS", "TypeScript", "Vue", "PostgreSQL", "Figma"],
    cover: "/img/Cheers-Location.png",
    links: [{
      label: { fr: "Première Version", en: "First Version", ja: "最初のバージョン" },
      href: "/Cheers-Location"
    }]
  },
  {
    id: 3,
    title: "VDD",
    summary: {
      fr: "Un projet qui mixe OpenData, consommation et visualisation.",
      en: "A project mixing OpenData, consumption and visualization.",
      ja: "OpenData、消費、視覚化を組み合わせたプロジェクト。"
    },
    long: {
      fr: "Ce projet de visualisation de données est le premier où je manipule de l'OpenData, grâce au programme de l'association Latitudes qui vise à former les étudiants sur la data tout en répondant aux défis sociaux et environnementaux. Avec ce projet, j'ai appris à me servir d'un fichier CSV, en récupérer les données pertinentes via JavaScript et les transformer en graphique grâce à des Bibliothèques comme d3.js.",
      en: "This data visualization project is the first where I work with OpenData, thanks to the Latitudes association program which aims to train students in data while addressing social and environmental challenges. With this project, I learned to use a CSV file, retrieve relevant data via JavaScript, and transform it into graphs using libraries like d3.js.",
      ja: "このデータ視覚化プロジェクトは、社会的および環境的課題に対応しながら学生にデータについて教えることを目的としたLatitudes協会のプログラムのおかげで、OpenDataを扱った最初のプロジェクトです。このプロジェクトで、CSVファイルの使用、JavaScriptによる関連データの取得、d3.jsなどのライブラリを使用したグラフへの変換を学びました。"
    },
    stack: ["Fichier CSV", "JavaScript", "d3.js", "HTML/CSS"],
    cover: "/img/VDD.png",
    links: [{
      label: { fr: "Le Projet", en: "The Project", ja: "プロジェクト" },
      href: "https://portfoliojorgemonteiro.fr/VDD/"
    }]
  },
  {
    id: 4,
    title: "Wavz",
    summary: {
      fr: "Maquette d'une plateforme de location, sons et lumières.",
      en: "Mockup of a sound and lighting rental platform.",
      ja: "音響・照明レンタルプラットフォームのモックアップ。"
    },
    long: {
      fr: "Ce projet vient d'une idée d'un de mes amis, un petit projet d'entrepreunariat que l'on essaye de monter en place, alors j'ai réalisé cette maquette pour que l'on puisse avoir une idée de l'application et du développement de celle-ci. Travail sur un parcours utilisateur simple et efficace avec des animations fuident qui rendent la navigation attirante.",
      en: "This project came from a friend's idea, a small entrepreneurial project we're trying to set up, so I created this mockup so we could have an idea of the application and its development. Work on a simple and effective user journey with fluid animations that make navigation attractive.",
      ja: "このプロジェクトは友人のアイデアから生まれた小さな起業プロジェクトで、アプリケーションとその開発のアイデアを得るためにこのモックアップを作成しました。ナビゲーションを魅力的にする滑らかなアニメーションを備えた、シンプルで効果的なユーザージャーニーの作業。"
    },
    stack: ["UX/UI", "Test Utilisateurs", "Figma", "Prototypage"],
    cover: "/img/Wavz.png",
    links: [{
      label: { fr: "Voir le prototype", en: "View Prototype", ja: "プロトタイプを見る" },
      href: "https://www.figma.com/proto/WhBowACKbKeKCsUQQ4Ae7m/Wavz---Location-de-mat%C3%A9riel-Audiovisuel?node-id=4-2&starting-point-node-id=4%3A2"
    }]
  },
  {
    id: 5,
    title: "PasseTonBillet",
    summary: {
      fr: "Création d'une nouvelle fonctionnalité : Le Billet Mystère.",
      en: "Creating a new feature: The Mystery Ticket.",
      ja: "新機能の作成：ミステリーチケット。"
    },
    long: {
      fr: "En collaboration avec d'autres étudiants, nous avons repensé l'expérience utilisateur de la plateforme PasseTonBillet en ajoutant une nouvelle fonctionnalité : Le Billet Mystère. Le but de ce travail était d'implémenter une fonctionnalité dans un environnement déjà existant tout en gardant une bonne hiérarchie visuelle et la cohérence graphique. Ce travail m'a permis d'approfondir mes compétences en UX/UI et accessibilité.",
      en: "In collaboration with other students, we redesigned the user experience of the PasseTonBillet platform by adding a new feature: The Mystery Ticket. The goal of this work was to implement a feature in an existing environment while maintaining good visual hierarchy and graphic consistency. This work allowed me to deepen my UX/UI and accessibility skills.",
      ja: "他の学生と協力して、PasseTonBilletプラットフォームのユーザー体験を再設計し、新機能「ミステリーチケット」を追加しました。この作業の目標は、優れた視覚的階層とグラフィックの一貫性を維持しながら、既存の環境に機能を実装することでした。この作業により、UX/UIとアクセシビリティのスキルを深めることができました。"
    },
    stack: ["UX/UI", "Design System", "Figma", "Prototypage", "Accessibilité"],
    cover: "/img/Passetonbillet.png",
    links: [{
      label: { fr: "Voir le fichier Figma", en: "View Figma File", ja: "Figmaファイルを見る" },
      href: "https://www.figma.com/design/L4Ka1jcM3DUJgCDmtWaAog/PassetonBillet-?node-id=0-1&t=jM04bQxf0ZrsO2eM-1"
    }]
  },
  {
    id: 6,
    title: "Affiche Festival",
    summary: {
      fr: 'Une commande du Festival "Les Vers Solidaires" en 2024.',
      en: 'A commission for the "Les Vers Solidaires" Festival in 2024.',
      ja: '2024年の「Les Vers Solidaires」フェスティバルの依頼。'
    },
    long: {
      fr: "Ce projet graphique a été l'occasion d'expérimenter autour de la composition d'une affiche, du travail de la typographie, des couleurs, du mouvement et des contrastes. L'objectif : créer une affiche moderne tout en respectant le cahier des charges du festival",
      en: "This graphic project was an opportunity to experiment with poster composition, typography, colors, movement, and contrasts. The objective: to create a modern poster while respecting the festival's specifications",
      ja: "このグラフィックプロジェクトは、ポスターの構成、タイポグラフィ、色、動き、コントラストを実験する機会でした。目標：フェスティバルの仕様を尊重しながら、モダンなポスターを作成すること"
    },
    stack: ["Graphisme", "Illustrator"],
    cover: "/img/affiche.png",
    links: [{
      label: { fr: "Voir l'affiche", en: "View Poster", ja: "ポスターを見る" },
      href: "/img/Affiche-Les-Vers-Solidaires-Jorge-Monteiro.pdf"
    }]
  }
])

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Projets de Jorge Monteiro",
  "description": "Liste des projets de développement web et design réalisés par Jorge Monteiro",
  "itemListElement": projects.value.map((p, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "CreativeWork",
      "@id": `https://leportfoliodejorge.com#project-${p.id}`,
      "name": p.title,
      "description": p.long?.fr || p.summary.fr,
      "image": p.cover ? `https://leportfoliodejorge.com${p.cover}` : undefined,
      "keywords": p.stack?.join(", "),
      "url": p.links?.[0]?.href,
      "creator": {
        "@type": "Person",
        "@id": "https://leportfoliodejorge.com#me"
      },
      "dateCreated": "2024",
      "inLanguage": "fr-FR"
    }
  }))
}

useHead({
  title: "Jorge Monteiro – Développeur & Designer",
  meta: [
    {
      name: "description",
      content:
        "Portfolio de Jorge Monteiro – Développeur web et designer. Découvrez mes projets en Nuxt, PHP, UX/UI, Figma, Tailwind, Medusa et plus.",
    },
    { property: "og:title", content: "Portfolio – Jorge Monteiro" },
    {
      property: "og:description",
      content:
        "Développeur web & Webdesigner. Consultez mes projets en Nuxt, PHP, UX/UI et plus.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://leportfoliodejorge.com" },
    { property: "og:image", content: "https://leportfoliodejorge.com/img/preview.png" },
    { property: "og:locale", content: "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Portfolio – Jorge Monteiro" },
    {
      name: "twitter:description",
      content:
        "Développeur web & designer. Consultez mes projets en Nuxt, PHP, UX/UI et plus.",
    },
    { name: "twitter:image", content: "https://leportfoliodejorge.com/img/preview.png" },
  ],

  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://leportfoliodejorge.com#me",
        "name": "Jorge Monteiro",
        "givenName": "Jorge",
        "familyName": "Monteiro",
        "jobTitle": "Développeur Web & Webdesigner",
        "description": "Étudiant en 3e année du BUT Métiers du Multimédia et de l'Internet, spécialisé en Développement Web et Dispositifs Interactifs. À la recherche d'une alternance à partir de septembre 2025.",
        "url": "https://leportfoliodejorge.com",
        "image": "https://leportfoliodejorge.com/img/preview.png",
        "email": "it.jorgemonteiro@gmail.com",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "IUT de Bobigny - Université Sorbonne Paris Nord",
          "url": "https://www.iut-bobigny.univ-paris13.fr/"
        },
        "knowsAbout": [
          "Nuxt 3", "Vue.js", "TypeScript", "Tailwind CSS", "JavaScript",
          "Node.js", "PostgreSQL", "MySQL", "MongoDB", "Figma", "UX/UI",
          "Suite Adobe", "React", "Git", "PHP", "Medusa 2", "Laravel",
          "Next.js", "Wordpress", "WebFlow"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/jorge-monteiro-11a57a305/",
          "https://github.com/jorge-monteiro-dev"
        ],
        "seeks": {
          "@type": "JobPosting",
          "title": "Alternance Développeur Web",
          "description": "Recherche une alternance en développement web à partir de septembre 2025",
          "employmentType": "INTERN",
          "jobStartDate": "2025-09"
        }
      }) as any,
      tagPriority: "critical"
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://leportfoliodejorge.com#website",
        "url": "https://leportfoliodejorge.com",
        "name": "Portfolio – Jorge Monteiro",
        "description": "Portfolio professionnel de Jorge Monteiro, développeur web et webdesigner",
        "inLanguage": "fr-FR",
        "author": {
          "@type": "Person",
          "@id": "https://leportfoliodejorge.com#me"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://leportfoliodejorge.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }) as any,
      tagPriority: "critical"
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://leportfoliodejorge.com#webpage",
        "url": "https://leportfoliodejorge.com",
        "name": "Portfolio de Jorge Monteiro - Développeur Web & Webdesigner",
        "description": "Découvrez mes projets en développement web, UX/UI design et mes compétences en Nuxt, PHP, Figma et plus.",
        "inLanguage": "fr-FR",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://leportfoliodejorge.com#website"
        },
        "about": {
          "@type": "Person",
          "@id": "https://leportfoliodejorge.com#me"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://leportfoliodejorge.com/img/preview.png",
          "width": 1200,
          "height": 630
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://leportfoliodejorge.com#home"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Mon Profil",
              "item": "https://leportfoliodejorge.com#profile"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Mes Travaux",
              "item": "https://leportfoliodejorge.com#works"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact",
              "item": "https://leportfoliodejorge.com#contact"
            }
          ]
        }
      }) as any,
      tagPriority: "critical"
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(projectsJsonLd) as any,
      tagPriority: "high"
    }
  ],
})

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
      error.value = data.error || t.value.contact.error
    }
  } catch (e) {
    error.value = t.value.contact.error
  }
}

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const skills = [
  "Nuxt 3","Vue.js","TypeScript","Tailwind CSS","JavaScript",
  "Node.js","PostgreSQL","MySQL","MongoDB","Figma","UX/UI","Suite Adobe","React","Git","PHP", "Medusa 2", "Laravel", "Next", "Jimdo", "Wordpress", "WebFlow",
]

const sections = computed(() => [
{ id: "home", label: t.value.nav.home },
{ id: "profile", label: t.value.nav.profile },
{ id: "works", label: t.value.nav.works },
{ id: "contact", label: t.value.nav.contact },
])

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

const showModal = ref(false)
const selectedProject = ref<Project | null>(null)
const modalRef = ref<HTMLElement | null>(null)
function openProject(p: Project) {
selectedProject.value = p
showModal.value = true
document.documentElement.style.overflow = "hidden"
nextTick(() => {
modalRef.value?.focus()
})
}
function closeModal() {
showModal.value = false
selectedProject.value = null
document.documentElement.style.overflow = ""
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

const langNames = {
fr: 'Français',
en: 'English',
ja: '日本語'
}

</script>

<template>
  <div class="font-sans bg-[#ECF7FF] text-[#344995] min-h-screen">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-md shadow-sm z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
    <!-- Logo/Titre (optionnel, à gauche sur desktop) -->
    <div class="hidden md:block"></div>

    <!-- Desktop menu (centré) -->
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

    <!-- Sélecteur de langue + Burger mobile (à droite) -->
    <div class="flex items-center gap-3">
      <!-- Sélecteur de langue -->
      <div class="relative">
        <button
          @click="langMenuOpen = !langMenuOpen"
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#ECF7FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#344995]"
          :aria-label="`Langue actuelle: ${langNames[currentLocale]}`"
          aria-haspopup="true"
          :aria-expanded="langMenuOpen"
        >
          <span class="text-xl"></span>
          <span class="hidden sm:inline font-poppins text-sm">{{ langNames[currentLocale] }}</span>
          <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': langMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Dropdown langues -->
        <transition name="lang-fade">
          <div
            v-show="langMenuOpen"
            class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 border border-[#344995]/10"
          >
            <button
              v-for="locale in ['fr', 'en', 'ja'] as Locale[]"
              :key="locale"
              @click="changeLocale(locale)"
              class="w-full px-4 py-2 text-left hover:bg-[#ECF7FF] transition-colors flex items-center gap-2 font-poppins text-sm"
              :class="{ 'bg-[#ECF7FF] text-[#A43838]': currentLocale === locale }"
            >
              <span class="text-lg"></span>
              <span>{{ langNames[locale] }}</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Mobile burger -->
      <button
        class="relative md:hidden w-10 h-10 grid place-items-center p-2 rounded-lg hover:bg-[#ECF7FF] focus:outline-none focus:ring-2 focus:ring-[#344995]"
        :aria-expanded="navOpen"
        aria-controls="mobile-nav"
        @click="toggleNav"
      >
        <span class="sr-only">Ouvrir le menu</span>
        <div class="relative w-6 h-4">
          <span
            class="absolute block h-0.5 w-6 bg-[#344995] transition-all duration-300 ease-in-out"
            :class="navOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 translate-y-0 rotate-0'"
          ></span>
          <span
            class="absolute block h-0.5 w-6 bg-[#344995] transition-all duration-300 ease-in-out"
            :class="navOpen ? 'top-1/2 -translate-y-1/2 opacity-0' : 'top-1/2 -translate-y-1/2 opacity-100'"
          ></span>
          <span
            class="absolute block h-0.5 w-6 bg-[#344995] transition-all duration-300 ease-in-out"
            :class="navOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 translate-y-0 rotate-0'"
          ></span>
        </div>
      </button>
    </div>
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
  id="home" class="relative min-h-[80vh] lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-4 sm:px-6 lg:px-24 pt-24 lg:pt-0 scroll-mt-28"
>
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
  <div class="flex flex-col items-start relative z-10 max-w-2xl text-center lg:text-left">
    <h1 class="title mb-6 relative inline-block underline-line animate-underline">
      {{ t.home.title }}
    </h1>

    <p class="text-base font-poppins bg-white/60 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md reveal">
      {{ t.home.description }}
    </p>
  </div>
</section>

<!-- Mon profil -->
<section id="profile" class="py-20 sm:py-24 px-4 sm:px-6 lg:px-24 bg-[#FFFFFF] scroll-mt-28">
  <div class="max-w-7xl mx-auto">
    <h1 class="title profile-title mb-6 relative inline-block underline-line animate-underline">
      {{ t.profile.title }}
    </h1>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
      <div class="reveal">
        <div class="bg-white/60 backdrop-blur-md p-8 sm:p-5 rounded-xl shadow-md font-poppins text-[15px] leading-relaxed space-y-3">
          <h3 class="kicker text-[#344995]">{{ t.profile.subtitle1 }}</h3>
          <p>{{ t.profile.text1 }}</p>

          <h3 class="kicker text-[#344995]">{{ t.profile.subtitle2 }}</h3>
          <p>{{ t.profile.text2 }}</p>
        </div>
      </div>

      <div class="reveal flex flex-col h-full">
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

        <div class="flex flex-wrap gap-3 mt-6">
  
    <a href="/CV-Alternance-Jorge-Monteiro-Developpement.pdf"
    target="_blank"
    rel="noopener"
    class="px-5 py-2.5 rounded-xl bg-[#A43838] text-white hover:translate-y-[-2px] transition-transform"
  >
    {{ t.profile.cv }}
  </a>

  
    <a href="https://www.linkedin.com/in/jorge-monteiro-11a57a305/"
    target="_blank"
    rel="noopener"
    class="px-5 py-2.5 rounded-xl bg-[#A43838] text-white hover:translate-y-[-2px] transition-transform"
  >
    LinkedIn
  </a>
</div>

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
      {{ t.works.title }}
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
        <img
          v-if="p.cover"
          :src="p.cover"
          :alt="`Image du projet ${p.title}`"
          class="w-full h-40 sm:h-32 object-cover rounded-lg mb-4"
          loading="lazy"
        />

        <h3 class="subsubtitle mt-2 mb-2 leading-tight">
          {{ p.title }}
        </h3>

        <p class="text-sm font-poppins text-[#344995]">
          {{ p.summary[currentLocale] }}
        </p>
      </button>
    </div>
  </div>
</section>

<!-- Modale Projet -->
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
            <h2 class="font-questrial text-2xl sm:text-3xl text-[#344995]">
              {{ selectedProject.title }}
            </h2>
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
            <p v-if="selectedProject.long">
              {{ selectedProject.long[currentLocale] }}
            </p>

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
              
                <a v-for="lnk in selectedProject.links"
                :key="lnk.href"
                class="px-4 py-2 rounded-xl bg-[#A43838] text-white hover:translate-y-[-2px] transition-transform"
                :href="lnk.href"
                target="_blank"
                rel="noopener"
              >
                {{ lnk.label[currentLocale] }}
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
      {{ t.contact.title }}
    </h1>
    <form @submit.prevent="submitForm" class="w-full max-w-md bg-[#ECF7FF]/60 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg reveal">
      <input v-model="name" type="text" :placeholder="t.contact.namePlaceholder" class="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#344995]" required />
      <input v-model="email" type="email" :placeholder="t.contact.emailPlaceholder" class="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#344995]" required />
      <textarea v-model="message" :placeholder="t.contact.messagePlaceholder" class="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#344995]" required></textarea>
      <button type="submit" class="w-full sm:w-auto bg-[#A43838] text-white px-6 py-3 rounded-xl hover:translate-y-[-2px] transition-transform">
        {{ t.contact.submit }}
      </button>

      <p v-if="success" class="mt-3 text-[#344995] font-semibold">{{ t.contact.success }}</p>
      <p v-if="error" class="mt-3 text-[#A43838] font-semibold">{{ error }}</p>
    </form>
  </div>
</section>

<!-- Footer -->
<footer class="bg-[#344995] text-white py-10 px-4 sm:px-6 lg:px-24 mt-10">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
    <div>
      <h2 class="font-questrial text-2xl mb-3">Jorge Monteiro</h2>
      <p class="font-poppins text-sm leading-relaxed opacity-90">
        {{ t.footer.description }}
      </p>
    </div>

    <nav class="flex flex-col space-y-2">
      <h3 class="font-questrial text-lg mb-2">{{ t.footer.navigation }}</h3>
      <button
        v-for="s in sections"
        :key="s.id + '-f'"
        class="text-sm font-poppins hover:text-[#A43838] transition-colors text-left"
        @click="scrollTo(s.id)"
      >
        {{ s.label }}
      </button>
    </nav>

    <div>
      <h3 class="font-questrial text-lg mb-2">{{ t.footer.social }}</h3>
      <div class="flex space-x-4">

        <a href="https://www.linkedin.com/in/jorge-monteiro-11a57a305/"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          class="hover:text-[#A43838] transition-colors"
        >
          <i class="fab fa-linkedin text-2xl"></i>
        </a>
        
          <a href="mailto:it.jorgemonteiro@gmail.com"
          aria-label="Email"
          class="hover:text-[#A43838] transition-colors"
        >
          <i class="fas fa-envelope text-2xl"></i>
        </a>
      </div>
    </div>
  </div>

  <div class="mt-10 pt-6 border-t border-white/20 text-center text-sm font-poppins opacity-80">
    © {{ new Date().getFullYear() }} - Jorge Monteiro. {{ t.footer.rights }}
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

/* Transition du menu langue */
.lang-fade-enter-active, .lang-fade-leave-active { 
  transition: opacity 150ms ease, transform 150ms ease; 
}
.lang-fade-enter-from, .lang-fade-leave-to { 
  opacity: 0; 
  transform: translateY(-10px); 
}

#home, #works, #profile, #contact { scroll-margin-top: 88px; }
@media (min-width: 768px) {
  #home, #works, #profile, #contact { scroll-margin-top: 96px; }
}
</style>
